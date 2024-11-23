export const dynamic = "force-dynamic";

import { QueryResult, sql } from "@vercel/postgres";

import { transformDBOrderToFrontend } from "@/lib/utils";
import { TOrderDB, TOrderFrontend } from "@/types";
import Trade from ".";

export default async function Page() {
    try {
        const result: QueryResult<TOrderDB> = await sql`
            SELECT 
                id,
                order_date,
                side::text,
                type::text,
                start_date,
                start_time,
                end_date,
                gpus,
                price_per_gpu,
                total_price,
                status::text
            FROM orders
            ORDER BY order_date DESC;
        `;

        const initialOrders: TOrderFrontend[] = result.rows.map((order) => transformDBOrderToFrontend(order));

        return <Trade initialOrders={initialOrders} />;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return <div>Error loading orders</div>;
    }
}
