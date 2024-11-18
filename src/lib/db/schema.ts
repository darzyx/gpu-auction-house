import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: integer("id").primaryKey(),
    orderDate: text("order_date").notNull(),
    side: text("side").$type<"Buy" | "Sell">().notNull(),
    type: text("type").$type<"Market" | "Limit">().notNull(),
    startDate: text("start_date").notNull(),
    endDate: text("end_date").notNull(),
    gpus: integer("gpus").notNull(),
    pricePerGpu: text("price_per_gpu").notNull(), // TODO: Change to float
    totalPrice: text("total_price").notNull(), // TODO: Change to float
    status: text("status").$type<"Pending" | "Filled" | "Canceled">().notNull(),
});

export type Order = typeof orders.$inferSelect;
