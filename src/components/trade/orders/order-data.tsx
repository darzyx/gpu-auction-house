import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getOrders() {
    try {
        const data = await db.select().from(orders).orderBy(desc(orders.orderDate));
        return data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        throw new Error("Failed to fetch orders");
    }
}
