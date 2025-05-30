import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "pg" or "mysql"
		usePlural: true,
	}),
	user: {
		modelName: "users",
	},
	session: {
		modelName: "sessions",
	},
	account: {
		modelName: "accounts",
	},
	verification: {
		modelName: "verifications",
	},
});
