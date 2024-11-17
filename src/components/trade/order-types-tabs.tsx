import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderType } from "./types";

type OrderTypeTabsProps = {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
};

export default function OrderTypeTabs({ orderType, setOrderType }: OrderTypeTabsProps) {
    return (
        <Tabs value={orderType} onValueChange={(value) => setOrderType(value as OrderType)}>
            <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="market"
                >
                    Market
                </TabsTrigger>
                <TabsTrigger
                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    value="limit"
                >
                    Limit
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
