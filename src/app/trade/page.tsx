"use client";

import Exchange from "@/components/trade/exchange";
import OrdersSection from "@/components/trade/orders-section";
import Portfolio from "@/components/trade/portfolio";
import Prices from "@/components/trade/prices-chart";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/db/schema";

export default function Page({ initOrders }: { initOrders: TOrder[] }) {
    return (
        <main className="w-full grid grid-rows-[auto_auto_1fr]">
            <div className="w-full grid grid-cols-1 md:grid-cols-[375px_auto_1fr]">
                <div>
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Portfolio />
                    </div>
                    <Separator />
                    <div className="p-4 sm:p-6 lg:p-4">
                        <Exchange />
                    </div>
                </div>
                <Separator orientation="vertical" />
                <div className="p-4 sm:p-6 lg:p-4">
                    <Prices />
                </div>
            </div>
            <Separator />
            <div className="relative">
                <div className="pb-10 md:pb-4 p-4 sm:p-6 lg:p-4 w-full absolute md:inset-0 md:overflow-auto">
                    <OrdersSection />
                </div>
            </div>
        </main>
    );
}
