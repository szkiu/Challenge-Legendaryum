import dotenv from "dotenv";
dotenv.config();
import express from 'express';

import config from './roomsConfig';
import api from './routes/api';
import { setupSocket } from './socket';

import { CoinService } from './services/coinService';
import { Room } from "./models/room";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', api);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

config.rooms.forEach((room: Room) => {
  CoinService.generateCoinsForRoom(room.name, room.coinCount, room.area);
});

setupSocket(server);