"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { orders, TNewOrder } from "@/db/schema";
import { TOrderForSubmit } from "@/types";

export async function getOrders() {
    return db.select().from(orders).orderBy(desc(orders.created_at));
}

export async function cancelOrder(orderId: string) {
    try {
        await db
            .update(orders)
            .set({ status: "canceled" })
            .where(eq(orders.id, orderId));
        revalidatePath("/orders");
        return { success: true };
    } catch (error) {
        console.error("Failed to cancel order:", error);
        throw new Error("Failed to cancel order");
    }
}

export async function postOrder(orderData: TOrderForSubmit) {
    try {
        const newOrder: TNewOrder = {
            side: orderData.side,
            method: orderData.method,
            status: orderData.status,
            gpu_count: orderData.gpu_count,
            price_per_gpu: orderData.price_per_gpu.toString(),
            total_price: orderData.total_price.toString(),
            start_date: new Date(orderData.start_date),
            end_date: new Date(orderData.end_date),
            start_end_hour: orderData.start_end_hour,
        };

        await db.insert(orders).values(newOrder);

        revalidatePath("/orders");
        return { success: true };
    } catch (error) {
        console.error("Failed to create order:", error);
        throw new Error("Failed to create order");
    }
}
