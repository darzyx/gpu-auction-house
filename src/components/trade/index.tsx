"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

import Confirm from "./confirm";
import DateRangePicker from "./date-range-picker";
import DatesFlexibility from "./dates-flexibility";
import MarketInfo from "./market-info";
import OrderTypeTabs from "./order-types-tabs";
import PriceInput from "./price-input";
import QuantityInput from "./quantity-input";
import TotalInfo from "./total-info";
import { OrderFormData, OrderType, TradeType } from "./types";
import { calculateTotal, CURRENT_MARKET_PRICE, formatCurrency, validateFormData } from "./utils";

const OrderForm = ({
    orderType,
    setOrderType,
    isBuy,
}: {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isBuy: boolean;
}) => {
    const [formData, setFormData] = useState<OrderFormData>({
        quantity: "",
        price: "",
        dateRange: undefined,
        datesFlexibility: "0",
    });
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const isValid = validateFormData(formData, orderType);
    const total = useMemo(() => calculateTotal(formData, orderType), [formData, orderType]);

    const handleSubmit = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirm = () => {
        const orderDetails = {
            ...formData,
            orderType,
            total,
            marketPrice: CURRENT_MARKET_PRICE,
            timestamp: new Date().toISOString(),
        };
        console.log("Order submitted:", orderDetails);
        setIsConfirmationOpen(false);

        setFormData({
            quantity: "",
            price: "",
            dateRange: undefined,
            datesFlexibility: "0",
        });
    };

    return (
        <div className="space-y-4">
            <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
            <MarketInfo />
            <div className={cn(orderType === "limit" ? "grid grid-cols-2 gap-4" : "")}>
                <QuantityInput
                    id={isBuy ? "quantity" : "sell-quantity"}
                    value={formData.quantity}
                    onChange={(value) => setFormData((prev) => ({ ...prev, quantity: value }))}
                />
                {orderType === "limit" && (
                    <PriceInput
                        isBuy={isBuy}
                        value={formData.price}
                        onChange={(value) => setFormData((prev) => ({ ...prev, price: value }))}
                    />
                )}
            </div>
            <DateRangePicker
                date={formData.dateRange}
                setDate={(dateRange) => setFormData((prev) => ({ ...prev, dateRange }))}
            />
            <DatesFlexibility
                id={isBuy ? "dates_flexibility" : "sell-dates_flexibility"}
                value={formData.datesFlexibility}
                onChange={(value) => setFormData((prev) => ({ ...prev, datesFlexibility: value }))}
            />
            <TotalInfo total={total} />
            <Button
                disabled={!isValid}
                className={cn("w-full", isBuy ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600")}
                onClick={handleSubmit}
            >
                Place {orderType === "market" ? "Market" : "Limit"} {isBuy ? "Buy" : "Sell"} Order
            </Button>
            <Confirm
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                orderData={{
                    tradeType: isBuy ? "buy" : "sell",
                    orderType,
                    quantity: formData.quantity,
                    price: formData.price,
                    dateRange: formData.dateRange,
                    datesFlexibility: formData.datesFlexibility,
                    total: formatCurrency(total),
                }}
            />
        </div>
    );
};

export default function Trade() {
    const [tradeType, setTradeType] = useState<TradeType>("buy");
    const [orderType, setOrderType] = useState<OrderType>("market");

    return (
        <div className="space-y-1">
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
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={true} />
                </TabsContent>
                <TabsContent value="sell">
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
