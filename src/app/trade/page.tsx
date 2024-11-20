export const dynamic = "force-dynamic";

import { sql } from "@vercel/postgres";

import { TOrderDB, TOrderFrontend } from "@/types";
import TradeParent from "./trade-parent";

export default async function Page() {
    try {
        const result = await sql`
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

        const ordersData: TOrderFrontend[] = result.rows.map((order) => ({
            id: order.id.toString(),
            orderDate: formatDate(order.order_date),
            side: order.side as "buy" | "sell",
            type: order.type as "market" | "limit",
            startDate: formatShortDate(order.start_date),
            startTime: order.start_time.toString(),
            endDate: formatShortDate(order.end_date),
            gpus: order.gpus.toString(),
            pricePerGpu: order.price_per_gpu.toString(),
            totalPrice: order.total_price.toString(),
            status: order.status as "filled" | "pending" | "canceled",
        }));

        return <TradeParent initialOrders={ordersData} />;
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return <div>Error loading orders</div>;
    }
}

function formatDate(date: Date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate().toString().padStart(2, "0")}/${d.getFullYear().toString().slice(-2)} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
}

function formatShortDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        year: "2-digit",
    }).format(new Date(date));
}
