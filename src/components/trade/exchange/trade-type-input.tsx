import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradeType } from "./types";

export default function TradeTypeInput({
    tradeType,
    setTradeType,
    isBuy,
}: {
    tradeType: TradeType;
    setTradeType: React.Dispatch<React.SetStateAction<TradeType>>;
    isBuy: boolean;
}) {
    return (
        <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as TradeType)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">
                    <span className={isBuy ? "text-green-600" : ""}>Buy</span>
                </TabsTrigger>
                <TabsTrigger value="sell">
                    <span className={!isBuy && "sell" ? "text-red-600" : ""}>Sell</span>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
