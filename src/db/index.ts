import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { orders } from "./schema";

export const db = drizzle(sql);
export { orders };
