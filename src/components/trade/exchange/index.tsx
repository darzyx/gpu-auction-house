"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOrderFrontend } from "@/types";
import OrderForm from "./order-form";
import { OrderType, TradeType } from "./types";

type ExchangeProps = {
    onOrderSubmitted: (order: TOrderFrontend) => void;
};

export default function Exchange({ onOrderSubmitted }: ExchangeProps) {
    const [tradeType, setTradeType] = useState<TradeType>("buy");
    const [orderType, setOrderType] = useState<OrderType>("market");

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-georgia leading-none">Exchange</h2>
            <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as TradeType)}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">
                        <span className={tradeType === "buy" ? "text-green-600" : ""}>Buy</span>
                    </TabsTrigger>
                    <TabsTrigger value="sell">
                        <span className={tradeType === "sell" ? "text-red-600" : ""}>Sell</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <OrderForm
                        orderType={orderType}
                        setOrderType={setOrderType}
                        isBuy={true}
                        onOrderSubmitted={onOrderSubmitted}
                    />
                </TabsContent>
                <TabsContent value="sell">
                    <OrderForm
                        orderType={orderType}
                        setOrderType={setOrderType}
                        isBuy={false}
                        onOrderSubmitted={onOrderSubmitted}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
