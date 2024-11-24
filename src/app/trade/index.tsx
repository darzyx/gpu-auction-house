"use client";

import { useState } from "react";

import Exchange from "@/components/trade/exchange";
import OrdersTable from "@/components/trade/orders-table";
import ordersColumns from "@/components/trade/orders-table/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/db/schema";

export default function Trade({ initOrders }: { initOrders: TOrder[] }) {
    const [orders, setOrders] = useState<TOrder[]>(initOrders);

    const handleOrderAdded = (newOrder: TOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
    };

    const handleOrderCanceled = (id: string) => {
        setOrders((prev) =>
            prev.map((order) => ({
                ...order,
                status: order.id === id ? "canceled" : order.status,
            }))
        );
    };

    return (
        <main className="grid grid-rows-[auto_auto_1fr] h-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-[375px_auto_1fr] lg:grid-cols-[400px_auto_1fr]">
                <div>
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Portfolio />
                    </div>
                    <Separator />
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Exchange onOrderAdded={handleOrderAdded} />
                    </div>
                </div>
                <Separator className="md:hidden" />
                <Separator orientation="vertical" className="hidden md:block" />
                <div className="p-4 sm:p-6 lg:p-4">
                    <Prices />
                </div>
            </div>
            <Separator />
            <div className="relative">
                <div className="pb-10 md:pb-4 p-4 sm:p-6 lg:p-4 w-full absolute md:inset-0 md:overflow-auto">
                    <OrdersTable
                        orders={orders}
                        columns={ordersColumns}
                        onOrderCanceled={handleOrderCanceled}
                    />
                </div>
            </div>
        </main>
    );
}
