import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

let isConnected = false;
if (!isConnected) {
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  redisClient
    .connect()
    .then(() => {
      isConnected = true;
      console.log("Redis client connected");
    })
    .catch((err) => {
      console.error("Redis Client Connection Error:", err);
    });
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not provided." },
        { status: 401 }
      );
    }

    const redisKey = `user:${userId}`;
    const cachedData = (await redisClient.hGetAll(redisKey)) as Record<
      string,
      string
    >;

    if (!cachedData || Object.keys(cachedData).length === 0) {
      return NextResponse.json(
        { error: "User details not found in Redis." },
        { status: 404 }
      );
    }

    const userDetails: { name: string; email: string; img: string } = {
      name: cachedData.name || "User",
      email: cachedData.email || "user@email.com",
      img: cachedData.img || "https://via.placeholder.com/32",
    };

    await redisClient.hSet(redisKey, userDetails);
    await redisClient.expire(redisKey, 3600);

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details from Redis:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details from Redis." },
      { status: 500 }
    );
  }
}
