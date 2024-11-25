"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Exchange from "@/components/trade/exchange";
import OrdersTable from "@/components/trade/orders-table";
import ordersColumns from "@/components/trade/orders-table/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices-chart";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/db/schema";
import { useMediaQuery } from "@/hooks/use-media-query";
import TradesTable from "../metrics/trades-table";

export default function Trade({ initOrders }: { initOrders: TOrder[] }) {
    const is2Xl = useMediaQuery("(min-width: 1536px)");

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
        <main className="w-full grid grid-rows-[auto_auto_1fr]">
            <div className="w-full grid grid-cols-1 md:grid-cols-[375px_auto_1fr] 2xl:grid-cols-[375px_auto_2fr_auto_325px]">
                <div>
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Portfolio />
                    </div>
                    <Separator />
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Exchange onOrderAdded={handleOrderAdded} />
                    </div>
                </div>
                <Separator orientation="vertical" />
                <div className="p-4 sm:p-6 lg:p-4">
                    <Prices />
                </div>
                {is2Xl && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="hidden lg:block"
                        />
                        <div className="p-4 sm:p-6 lg:p-4 hidden lg:block">
                            <TradesTable />
                        </div>
                    </>
                )}
            </div>
            <Separator />
            <div className="relative">
                <div className="pb-10 md:pb-4 p-4 sm:p-6 lg:p-4 w-full absolute md:inset-0 md:overflow-auto">
                    <OrdersTable
                        orders={orders}
                        columns={ordersColumns}
                        onOrderCanceled={handleOrderCanceled}
                    />
                    {orders.length > 0 && (
                        <div className="w-full flex justify-center items-center">
                            <Link
                                href="/orders"
                                className="group flex items-center gap-1 text-sm text-muted-foreground font-medium hover:underline underline-offset-2 cursor-pointer"
                            >
                                See all orders
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
