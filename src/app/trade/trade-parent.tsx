"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/navigation";
import Exchange from "@/components/trade/exchange";
import Orders from "@/components/trade/orders";
import ordersColumns, { TOrder } from "@/components/trade/orders/columns";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices";

export default function TradeParent({ initialOrders }: { initialOrders: TOrder[] }) {
    const [orders, setOrders] = useState<TOrder[]>(initialOrders);

    const handleNewOrder = (orderData: TOrder) => {
        setOrders((prev) => [orderData, ...prev]);
    };

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
                            <Exchange onOrderSubmitted={handleNewOrder} />
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
                        <Orders data={orders} columns={ordersColumns} />
                    </div>
                </div>
            </div>
        </main>
    );
}