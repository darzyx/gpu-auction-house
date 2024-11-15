import OrderHistory from "@/components/order-history";
import PriceHistory from "@/components/price-history";
import TradingForm from "@/components/trading-form";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="w-full max-w-6xl p-8 flex flex-col">
            <div className="w-full grid grid-cols-[2fr_auto_3fr]">
                <div className="p-4 flex flex-col gap-4">
                    <h1>Trade GPUs</h1>
                    <TradingForm />
                </div>
                <div>
                    <Separator orientation="vertical" />
                </div>
                <div className="p-4">
                    <PriceHistory />
                </div>
            </div>
            <Separator />
            <div className="py-4 px-2">
                <OrderHistory />
            </div>
        </div>
    );
}
