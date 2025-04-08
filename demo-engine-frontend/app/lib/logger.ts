const isProd = process.env.NODE_ENV === "production";

export const logger = {
  log: (...args: any[]) => {
    if (!isProd) {
      console.log("[LOG]:", ...args);
    }
  },
  warn: (...args: any[]) => {
    if (!isProd) {
      console.warn("[WARN]:", ...args);
    }
  },
  error: (...args: any[]) => {
    console.error("[ERROR]:", ...args);
  },
};
