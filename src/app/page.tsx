import Orders from "@/components/orders";
import Prices from "@/components/prices";
import Trade from "@/components/trade";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="w-full max-w-6xl p-8 flex flex-col">
            <div className="w-full grid grid-cols-[1fr_auto_2fr]">
                <div>
                    <div className="p-4">
                        <h2 className="text-lg font-georgia px-2">
                            You have $245,073 in your account, and you&apos;re using 512 GPUs.
                        </h2>
                    </div>
                    <Separator />
                    <div className="p-4">
                        <Trade />
                    </div>
                </div>
                <div>
                    <Separator orientation="vertical" />
                </div>
                <div className="p-4">
                    <Prices />
                </div>
            </div>
            <Separator />
            <div className="py-4 px-2">
                <Orders />
            </div>
        </div>
    );
}
