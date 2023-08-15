import { Request, Response } from "express";
import { CoinService } from "../services/coinService";

export class CoinController {
  static async getCoinById(req: Request, res: Response) {
    try {
      const room = req.params.room;
      const coinId = req.params.coinId;

      const coin = await CoinService.fetchCoinById(room, coinId);

      if (coin) {
        res.json(coin);
      } else {
        res.status(404).send({ error: "Coin not found." });
      }
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve coin." });
    }
  }

  static async getCoinsForRoom(req: Request, res: Response) {
    const room = req.params.room;

    try {
      const coins = await CoinService.fetchCoins(room);
      res.json(coins);
    } catch (error) {
      res.status(500).send({ error: "Failed to get coins." });
    }
  }

  static async getTotalCoins(req: Request, res: Response) {
    const room = req.params.room;

    try {
      const coins = await CoinService.countCoinsInRoom(room);
      res.json({ count: coins });
    } catch (error) {
      res.status(500).send({ error: "Failed to get total coins." });
    }
  }
}
