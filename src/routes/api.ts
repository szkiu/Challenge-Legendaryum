import { Router } from 'express';
import { CoinController } from '../controllers/coinController';

const router = Router();

router.get('/coin/:room/:coinId', CoinController.getCoinById);

router.get('/coins/:room', CoinController.getCoinsForRoom);

router.get('/coins/:room/count', CoinController.getTotalCoins);

export default router;