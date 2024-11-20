import { TOrder } from "@/components/trade/orders/columns";
import { sql } from "@vercel/postgres";

import TradeParent from "./trade-parent";

export default async function Page() {
    let ordersData: TOrder[] = [];
    try {
        const result = await sql`
            SELECT 
                id,
                order_date,
                side::text,
                type::text,
                start_date,
                end_date,
                gpus,
                price_per_gpu,
                total_price,
                status::text
            FROM orders_new 
            ORDER BY order_date DESC;
        `;
        ordersData = result.rows.map((order) => {
            const orderDateObj = new Date(order.order_date);
            const orderDate = `${orderDateObj.getMonth() + 1}/${orderDateObj
                .getDate()
                .toString()
                .padStart(2, "0")}/${orderDateObj.getFullYear().toString().slice(-2)} ${orderDateObj
                .getHours()
                .toString()
                .padStart(2, "0")}:${orderDateObj.getMinutes().toString().padStart(2, "0")}:${orderDateObj
                .getSeconds()
                .toString()
                .padStart(2, "0")}`;

            return {
                id: order.id,
                orderDate,
                side: order.side as "Buy" | "Sell",
                type: order.type as "Market" | "Limit",
                startDate: new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    day: "2-digit",
                    year: "2-digit",
                }).format(new Date(order.start_date)),
                endDate: new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    day: "2-digit",
                    year: "2-digit",
                }).format(new Date(order.end_date)),
                gpus: order.gpus,
                pricePerGpu: order.price_per_gpu,
                totalPrice: order.total_price,
                status: order.status as "Pending" | "Filled" | "Canceled",
            };
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        ordersData = [];
    }

    return <TradeParent initialOrders={ordersData} />;
}
