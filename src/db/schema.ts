import { integer, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const orderSideEnum = pgEnum("side", ["buy", "sell"]);
export const orderMethodEnum = pgEnum("method", ["market", "limit"]);
export const orderStatusEnum = pgEnum("status", ["filled", "pending", "canceled"]);

export const ordersTable = pgTable("new_orders", {
    id: serial("id").primaryKey(),
    side: orderSideEnum().notNull(),
    method: orderMethodEnum().notNull(),
    gpu_count: integer("gpu_count").notNull(),
    price_per_gpu: integer("price_per_gpu").notNull(),
    start_date: timestamp("start_date").notNull(),
    end_date: timestamp("end_date").notNull(),
    start_end_hour: integer("start_hour").notNull(),
    total_price: integer("total_price").notNull(),
    status: orderStatusEnum().notNull(),
    created_date: timestamp("created_date").notNull().defaultNow(),
    updatedDate: timestamp("updated_date")
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertOrder = typeof ordersTable.$inferInsert;
export type SelectOrder = typeof ordersTable.$inferSelect;
