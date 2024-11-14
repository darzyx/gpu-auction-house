import PriceHistoryChart from "@/components/price-history-chart";
import TradingForm from "@/components/trading-form";

export default function Home() {
    return (
        <div className="p-4">
            <div className="flex gap-2">
                <div>
                    <PriceHistoryChart />
                </div>
                <div>
                    <TradingForm />
                </div>
            </div>
        </div>
    );
}
