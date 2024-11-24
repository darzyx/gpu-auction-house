"use client";

import { useState } from "react";

import Navigation from "@/components/navigation";
import OrdersTable from "@/components/trade/orders-table";
import ordersColumns from "@/components/trade/orders-table/columns";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/db/schema";

export default function Orders({ initOrders }: { initOrders: TOrder[] }) {
    const [orders, setOrders] = useState<TOrder[]>(initOrders);

    const handleOrderCanceled = (id: string) => {
        setOrders((prev) =>
            prev.map((order) => ({
                ...order,
                status: order.id === id ? "canceled" : order.status,
            }))
        );
    };

    return (
        <main className="w-full max-w-7xl h-full p-0 lg:p-8 grid grid-rows-[auto_auto_1fr] lg:grid-rows-1 lg:grid-cols-[auto_auto_1fr]">
            <div className="lg:h-full p-4 sm:p-6 lg:p-4">
                <Navigation />
            </div>
            <Separator orientation="vertical" className="hidden lg:block" />
            <Separator orientation="horizontal" className="lg:hidden" />
            <div className="w-full h-full p-4 sm:p-6 lg:p-4">
                <OrdersTable
                    orders={orders}
                    columns={ordersColumns}
                    onOrderCanceled={handleOrderCanceled}
                />
            </div>
        </main>
    );
}
