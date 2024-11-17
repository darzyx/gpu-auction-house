import AvailableToTrade from "@/components/available-to-trade";
import Orders from "@/components/orders";
import ordersColumns from "@/components/orders/columns";
import ordersData from "@/components/orders/data";
import Prices from "@/components/prices";
import Sidebar from "@/components/sidebar";
import Trade from "@/components/trade";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="w-full h-screen max-w-7xl p-8 grid grid-cols-[auto_auto_1fr]">
            <div className="h-full p-4">
                <Sidebar />
            </div>
            <Separator orientation="vertical" />
            <div className="grid grid-rows-[auto_auto_1fr] h-full">
                <div className="w-full grid grid-cols-[400px_auto_3fr]">
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
                <div className="relative h-full">
                    <div className="p-4 absolute inset-0 overflow-auto">
                        <Orders data={ordersData} columns={ordersColumns} />
                    </div>
                </div>
            </div>
        </div>
    );
}
