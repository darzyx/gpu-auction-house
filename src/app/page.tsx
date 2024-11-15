import OrderHistory from "@/components/order-history";
import PriceHistory from "@/components/price-history";
import TradingForm from "@/components/trading-form";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="w-full max-w-6xl p-8 flex flex-col">
            <h1>Trade</h1>
            <div className="w-full grid grid-cols-[1fr_auto_2fr]">
                <div>
                    <div className="p-4">You have $245,073 and 512 GPUs</div>
                    <Separator />
                    <div className="p-4">
                        <TradingForm />
                    </div>
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
