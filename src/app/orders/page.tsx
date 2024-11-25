"use client";

import OrdersSection from "@/components/trade/orders-section";

export default function Page() {
    return (
        <main className="w-full h-full p-4 sm:p-6 lg:p-4">
            <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 right-0 overflow-x-auto">
                    <OrdersSection />
                </div>
            </div>
        </main>
    );
}
