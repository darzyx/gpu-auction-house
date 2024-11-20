export const dynamic = "force-dynamic";

import { TOrder } from "@/types";
import TradeParent from "./trade-parent";

async function getOrders() {
    const res = await fetch(process.env.VERCEL_URL + "/api/orders", { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export default async function Page() {
    const ordersData: TOrder[] = await getOrders();
    return <TradeParent initialOrders={ordersData} />;
}
