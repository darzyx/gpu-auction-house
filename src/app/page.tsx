import PriceHistory from "@/components/price-history";
import TradingForm from "@/components/trading-form";

export default function Home() {
    return (
        <div className="p-4">
            <div className="flex gap-2">
                <div>
                    <PriceHistory />
                </div>
                <div>
                    <TradingForm />
                </div>
            </div>
        </div>
    );
}
