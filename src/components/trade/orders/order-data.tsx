import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getOrders() {
    try {
        console.log("Fetching orders...");
        const data = await db.select().from(orders).orderBy(desc(orders.orderDate));
        console.log("Fetched orders:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        throw new Error("Failed to fetch orders");
    }
}
