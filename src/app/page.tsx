import AvailableToTrade from "@/components/available-to-trade";
import Orders from "@/components/orders";
import ordersColumns from "@/components/orders/columns";
import ordersData from "@/components/orders/data";
import Prices from "@/components/prices";
import Trade from "@/components/trade";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="w-full h-full max-w-7xl p-8 grid grid-rows-[auto_auto_1fr]">
            <div className="w-full grid grid-cols-[1fr_auto_2fr]">
                <div>
                    <div className="p-4">
                        <AvailableToTrade />
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
            <div className="py-4 px-2 overflow-y-scroll">
                <Orders data={ordersData} columns={ordersColumns} />
            </div>
        </div>
    );
}
