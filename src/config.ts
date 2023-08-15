const REDIS_HOST = process.env.REDIS_HOST || "redis";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const ORIGIN_1 = process.env.ORIGIN_1 || "http://127.0.0.1:5500";

export const config = {
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  whitelist: [ORIGIN_1],
};
