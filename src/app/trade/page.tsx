export const dynamic = "force-dynamic";

import { TOrder } from "@/types";
import TradeParent from "./trade-parent";

async function getOrders() {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/orders`, {
        method: "GET",
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export default async function Page() {
    const ordersData: TOrder[] = await getOrders();
    return <TradeParent initialOrders={ordersData} />;
}
