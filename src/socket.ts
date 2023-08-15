import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { Server, Socket } from "socket.io";
import { CoinService } from "./services/coinService";
import { config } from "./config";

let io: Server;

export const setupSocket = (server: HttpServer | HttpsServer) => {
  io = new Server(server, { cors: { origin: config.whitelist } });

  io.on("connection", (socket: Socket) => {
    socket.on("joinRoom", async (room: string) => {
      socket.join(room);

      const coins = await CoinService.fetchCoins(room);
      socket.emit("coins", coins);
    });

    socket.on("coinCollected", async (coinId: string, room: string) => {
      await CoinService.removeCoinWithRoom(coinId, room);
      io.to(Array.from(socket.rooms)).emit("coinRemoved", coinId);
    });
  });
};
