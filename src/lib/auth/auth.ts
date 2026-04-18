import "server-only";

import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { envs } from "@/core/config";

const databasePool = createPool({
  host: envs.DATABASE_HOST,
  port: envs.DATABASE_PORT,
  user: envs.DATABASE_USER,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const auth = betterAuth({
  appName: "AI Sales Agent",
  secret: envs.BETTER_AUTH_SECRET,
  database: databasePool,
  emailAndPassword: {
    enabled: true,
  },
});
