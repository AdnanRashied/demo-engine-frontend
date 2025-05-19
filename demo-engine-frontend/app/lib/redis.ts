import { createClient } from "redis";

const globalForRedis = globalThis as unknown as {
  redisClient?: ReturnType<typeof createClient>;
};

export const redisClient =
  globalForRedis.redisClient ??
  createClient({
    url: process.env.REDIS_URL,
  });

if (!globalForRedis.redisClient) {
  globalForRedis.redisClient = redisClient;

  redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  redisClient.connect().catch((err) => {
    console.error("Failed to connect Redis client:", err);
  });
}
