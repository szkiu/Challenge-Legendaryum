import dotenv from "dotenv";
dotenv.config();
import express from 'express';

import roomsConfig from './roomsConfig';
import { config } from "./config";
import { setupSocket } from './socket';

import api from './routes/api';

import { CoinService } from './services/coinService';
import { Room } from "./models/room";

const app = express();
const PORT = config.api.port;

app.use(express.json());
app.use('/api', api);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

roomsConfig.rooms.forEach((room: Room) => {
  CoinService.generateCoinsForRoom(room.name, room.coinCount, room.area);
});

setupSocket(server);