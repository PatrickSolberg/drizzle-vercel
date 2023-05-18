import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./src/db/schema.ts",
  connectionString: process.env.POSTGRES_URL,
  out: "./migrations-folder",
};

export default config;
