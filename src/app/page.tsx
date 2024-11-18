import Navigation from "@/components/navigation";
import Exchange from "@/components/trade/exchange";
import Orders from "@/components/trade/orders";
import ordersColumns, { TOrder } from "@/components/trade/orders/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices";
import { Separator } from "@/components/ui/separator";
import { sql } from "@vercel/postgres";

export default async function Home() {
    let ordersData: TOrder[] = [];
    try {
        // Debug logging
        console.log("Database URL:", process.env.POSTGRES_URL?.substring(0, 20) + "...");

        // First verify table exists
        const tableCheck = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'orders'
            );
        `;
        console.log("Table exists:", tableCheck.rows[0].exists);

        // Get orders with explicit error handling
        const result = await sql`
            SELECT * FROM orders 
            ORDER BY order_date DESC;
        `;
        console.log("Raw orders fetched:", result.rows);

        ordersData = result.rows.map((order) => ({
            id: order.id,
            orderDate: order.order_date,
            side: order.side,
            type: order.type,
            startDate: order.start_date,
            endDate: order.end_date,
            gpus: order.gpus,
            pricePerGpu: order.price_per_gpu,
            totalPrice: order.total_price,
            status: order.status,
        }));
        console.log("Transformed orders:", ordersData);
    } catch (error) {
        console.error("Detailed fetch error:", error);
        ordersData = [];
    }

    // Add explicit console log before render
    console.log("About to render with orders:", ordersData?.length);

    return (
        <div className="w-full h-full max-w-7xl p-0 lg:p-8 grid grid-rows-[auto_auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_auto_1fr]">
            <div className="lg:h-full p-4">
                <Navigation />
            </div>
            <Separator orientation="vertical" className="hidden lg:block" />
            <Separator orientation="horizontal" className="lg:hidden" />
            <div className="grid grid-rows-[auto_auto_1fr] h-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-[325px_auto_1fr] lg:grid-cols-[375px_auto_1fr]">
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
        </div>
    );
}
