export const dynamic = "force-dynamic";

import { QueryResult, sql } from "@vercel/postgres";

import { formatDate, formatShortDate } from "@/lib/utils";
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

        const initialOrders: TOrderFrontend[] = result.rows.map((order) => ({
            id: order.id,
            orderDate: formatDate(order.order_date),
            side: order.side,
            type: order.type,
            startDate: formatShortDate(order.start_date),
            startTime: order.start_time.toString(),
            endDate: formatShortDate(order.end_date),
            gpus: order.gpus.toString(),
            pricePerGpu: order.price_per_gpu.toString(),
            totalPrice: order.total_price.toString(),
            status: order.status,
        }));

        return <Trade initialOrders={initialOrders} />;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return <div>Error loading orders</div>;
    }
}
