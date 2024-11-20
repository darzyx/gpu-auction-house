import { TOrder } from "@/types";
import TradeParent from "./trade-parent";

async function getOrders() {
    const res = await fetch(
        `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/orders`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export default async function Page() {
    const ordersData: TOrder[] = await getOrders();
    return <TradeParent initialOrders={ordersData} />;
}
