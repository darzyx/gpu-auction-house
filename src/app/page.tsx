import OrderHistory from "@/components/order-history";
import PriceHistory from "@/components/price-history";
import TradingForm from "@/components/trading-form";

export default function Home() {
    return (
        <div className="p-4">
            <div className="w-full grid grid-cols-2 gap-4 mb-4">
                <div>
                    <PriceHistory />
                </div>
                <div>
                    <TradingForm />
                </div>
            </div>
            <OrderHistory />
        </div>
    );
}
