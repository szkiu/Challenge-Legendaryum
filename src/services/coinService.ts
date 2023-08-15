import { Coin } from "../models/coin";
import Redis from "redis";
import { v4 as uuidv4 } from "uuid";
import roomsConfig from "../roomsConfig";
import { config } from "../config";
import { Area } from "../models/room";
import { Room } from "../models/room";

const REDIS_HOST = config.redis.host;
const REDIS_PORT = config.redis.port;

const client = Redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

const notificationClient = Redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

notificationClient.subscribe("__keyevent@0__:expired");

notificationClient.on("message", (channel, message) => {
  if (channel === "__keyevent@0__:expired" && message.startsWith("room:")) {
    const roomName = message.split(":")[1];
    const roomConfig = roomsConfig.rooms.find(
      (room: Room) => room.name === roomName
    );
    if (roomConfig) {
      CoinService.generateCoinsForRoom(
        roomConfig.name,
        roomConfig.coinCount,
        roomConfig.area
      );
    }
  }
});

export class CoinService {
  static generateRandomPosition(max: number, min: number): number {
    return Math.random() * (max - min) + min;
  }
  
  static async removeCoinWithRoom(coinId: string, room: string) {
    client.hdel(`room:${room}`, coinId);
  }

  static async fetchCoinById(
    room: string,
    coinId: string
  ): Promise<Coin | null> {
    return new Promise<Coin | null>((resolve, reject) => {
      client.hget(`room:${room}`, coinId, (err, coinStr) => {
        if (err) {
          reject(err);
        } else if (coinStr) {
          resolve(JSON.parse(coinStr));
        } else {
          resolve(null);
        }
      });
    });
  }

  static async fetchCoins(room: string): Promise<Coin[]> {
    return new Promise<Coin[]>((resolve, reject) => {
      client.hgetall(`room:${room}`, (err, coins) => {
        if (err) {
          reject(err);
        } else if (coins) {
          resolve(Object.values(coins).map((coinStr) => JSON.parse(coinStr)));
        } else {
          resolve([]);
        }
      });
    });
  }

  static async countCoinsInRoom(room: string): Promise<number> {
    const coins = await this.fetchCoins(room);
    return coins.length;
  }

  static async generateCoinsForRoom(room: string, count: number, area: Area) {
    const existingCoinCount = await this.countCoinsInRoom(room);

    if (existingCoinCount >= 50) {
      return [];
    }

    const coinsToAdd = Math.min(count, 50 - existingCoinCount);

    const coins: Coin[] = [];

    for (let i = 0; i < coinsToAdd; i++) {
      const coin: Coin = {
        id: uuidv4(),
        x: this.generateRandomPosition(area.xmax, area.xmin),
        y: this.generateRandomPosition(area.ymax, area.ymin),
        z: this.generateRandomPosition(area.zmax, area.zmin),
        room: room,
      };
      coins.push(coin);

      client.hset(`room:${room}`, coin.id, JSON.stringify(coin));
    }

    client.expire(`room:${room}`, 3600);

    return coins;
  }
}
