import Navigation from "@/components/navigation";
import Exchange from "@/components/trade/exchange";
import Orders from "@/components/trade/orders";
import ordersColumns, { TOrder } from "@/components/trade/orders/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices";
import { Separator } from "@/components/ui/separator";
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Home() {
    let ordersData: TOrder[] = [];
    try {
        const result = await sql`
            SELECT * FROM orders 
            ORDER BY order_date DESC;
        `;
        ordersData = result.rows.map((order) => ({
            id: order.id,
            orderDate: order.order_date,
            side: order.side as "Buy" | "Sell",
            type: order.type as "Market" | "Limit",
            startDate: order.start_date,
            endDate: order.end_date,
            gpus: order.gpus,
            pricePerGpu: order.price_per_gpu,
            totalPrice: order.total_price,
            status: order.status as "Pending" | "Filled" | "Canceled",
        }));
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        ordersData = [];
    }

    return (
        <main className="w-full h-full max-w-7xl p-0 lg:p-8">
            Hi, this is an unfinished home page. You&apos;re looking for the <Link href="/trade">/trade</Link> page.
        </main>
    );
}
