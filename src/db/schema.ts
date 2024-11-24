import {
    decimal,
    integer,
    pgEnum,
    pgTable,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const orderSideEnum = pgEnum("order_side", ["buy", "sell"]);
export const orderMethodEnum = pgEnum("order_method", ["market", "limit"]);
export const orderStatusEnum = pgEnum("order_status", [
    "filled",
    "pending",
    "canceled",
]);

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    side: orderSideEnum("side").notNull(),
    method: orderMethodEnum("method").notNull(),
    status: orderStatusEnum("status").notNull(),
    gpu_count: integer("gpu_count").notNull(),
    price_per_gpu: decimal("price_per_gpu", {
        precision: 10,
        scale: 2,
    }).notNull(),
    total_price: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
    start_date: timestamp("start_date", { mode: "date" }).notNull(),
    end_date: timestamp("end_date", { mode: "date" }).notNull(),
    start_end_hour: integer("start_end_hour").notNull(),
    created_at: timestamp("created_at", { mode: "date" })
        .defaultNow()
        .notNull(),
    updated_at: timestamp("updated_at", { mode: "date" })
        .defaultNow()
        .notNull(),
});

export type TOrder = typeof orders.$inferSelect;
export type TNewOrder = typeof orders.$inferInsert;

export const orderSchema = z
    .object({
        side: z.enum(orderSideEnum.enumValues),
        method: z.enum(orderMethodEnum.enumValues),
        status: z.enum(orderStatusEnum.enumValues),
        gpu_count: z.number().positive(),
        price_per_gpu: z.number().positive(),
        total_price: z.number().positive(),
        start_date: z.string().datetime(),
        end_date: z.string().datetime(),
        start_end_hour: z.number().min(0).max(23),
    })
    .refine((data) => new Date(data.start_date) <= new Date(data.end_date), {
        message: "Start date must be before or equal to end date",
    })
    .transform((data) => ({
        ...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        price_per_gpu: data.price_per_gpu.toString(),
        total_price: data.total_price.toString(),
    }));
