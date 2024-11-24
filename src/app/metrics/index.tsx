import PricesChart from "@/components/trade/prices-chart";
import { Separator } from "@/components/ui/separator";
import AvailabilityChart from "./availability-chart";

export default function Prices() {
    return (
        <main className="w-full h-full">
            <div className="grid grid-cols-[2fr_auto_auto]">
                <div className="p-4 sm:p-6 lg:p-4">
                    <PricesChart />
                </div>
                <Separator orientation="vertical" />
                <div className="w-full">
                    <AvailabilityChart />
                    <Separator />
                </div>
            </div>
        </main>
    );
}
