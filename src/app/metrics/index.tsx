"use client";

import PricesChart from "@/components/trade/prices-chart";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import AvailabilityChart from "./availability-chart";
import OrderBookList from "./order-book";

export default function Metrics() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <main className="w-full h-full">
            <div className="md:grid md:grid-cols-[2fr_auto_auto]">
                <div className="p-4 sm:p-6 lg:p-4">
                    <PricesChart />
                </div>
                <Separator
                    orientation={isDesktop ? "vertical" : "horizontal"}
                />
                <div className="w-full">
                    <AvailabilityChart />
                    <Separator />
                    <OrderBookList />
                </div>
            </div>
        </main>
    );
}
