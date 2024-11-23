export const dynamic = "force-dynamic";

import { QueryResult, sql } from "@vercel/postgres";

import { TOrder } from "@/types";
import Trade from ".";

export default async function Page() {
    try {
        const result: QueryResult<TOrder> = await sql`
            SELECT 
                id,
                side,
                method,
                status,
                gpu_count,
                price_per_gpu,
                total_price,
                start_date,
                end_date,
                start_end_hour,
                created_date,
                updated_date
            FROM new_orders
            ORDER BY created_date DESC;
        `;
        const initOrders = result.rows;
        return <Trade initOrders={initOrders} />;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return <div>Error loading orders</div>;
    }
}
