import * as dotenv from 'dotenv';
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/config/database/schema.ts",
    out: "./src/config/database/migrations",
    dialect: "turso",
    dbCredentials: {
        url: process.env.TURSO_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!
    },
} satisfies Config;