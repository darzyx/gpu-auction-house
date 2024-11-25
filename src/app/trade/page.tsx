import { desc } from "drizzle-orm";

import { db } from "@/db";
import { orders, TOrder } from "@/db/schema";
import Trade from ".";

export default async function Page() {
    try {
        const initOrders: TOrder[] = await db
            .select()
            .from(orders)
            .orderBy(desc(orders.created_at));

        return <Trade initOrders={initOrders} />;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return (
            <div className="p-4 text-red-500">
                Error loading orders. Please try again later.
            </div>
        );
    }
}
