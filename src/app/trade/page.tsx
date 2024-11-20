import Navigation from "@/components/navigation";
import Exchange from "@/components/trade/exchange";
import Orders from "@/components/trade/orders";
import ordersColumns, { TOrder } from "@/components/trade/orders/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices";
import { Separator } from "@/components/ui/separator";
import { sql } from "@vercel/postgres";

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

    return (
        <main className="w-full max-w-7xl h-full p-0 lg:p-8 grid grid-rows-[auto_auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_auto_1fr]">
            <div className="lg:h-full p-4">
                <Navigation />
            </div>
            <Separator orientation="vertical" className="hidden lg:block" />
            <Separator orientation="horizontal" className="lg:hidden" />
            <div className="grid grid-rows-[auto_auto_1fr] h-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-[375px_auto_1fr] lg:grid-cols-[400px_auto_1fr]">
                    <div>
                        <div className="p-4">
                            <Portfolio />
                        </div>
                        <Separator />
                        <div className="p-4">
                            <Exchange />
                        </div>
                    </div>
                    <Separator className="md:hidden" />
                    <Separator orientation="vertical" className="hidden md:block" />
                    <div className="p-4">
                        <Prices />
                    </div>
                </div>
                <Separator />
                <div className="relative">
                    <div className="pb-10 md:pb-4 p-4 w-full absolute md:inset-0 md:overflow-auto">
                        <Orders data={ordersData} columns={ordersColumns} />
                    </div>
                </div>
            </div>
        </main>
    );
}
