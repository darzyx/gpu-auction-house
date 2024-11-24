"use client";

import { useState } from "react";

import OrdersTable from "@/components/trade/orders-table";
import ordersColumns from "@/components/trade/orders-table/columns";
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
        <main className="w-full h-full p-4 sm:p-6 lg:p-4">
            <div className="relative h-[500px]">
                <div className="absolute inset-0 overflow-x-auto">
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
