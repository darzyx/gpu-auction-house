"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, transformDBOrderToFrontend } from "@/lib/utils";
import { TOrderDB, TOrderFrontend } from "@/types";
import ConfirmOrder from "./confirm-order";
import DaysInput from "./days-input";
import OrderTypeInput from "./order-type-input";
import PriceInput from "./price-input";
import PricePerGPUPerDayInfo from "./price-per-gpu-per-day-info";
import QuantityInput from "./quantity-input";
import { StartTimeInput } from "./start-time-input";
import TotalInfo from "./total-info";
import TradeTypeInput from "./trade-type-input";
import { OrderFormData, OrderType, TradeType } from "./types";
import { calculateTotal, formatCurrency, getPriceForHour, initFormData, validateFormData } from "./utils";

type ExchangeProps = {
    onAddOrder: (order: TOrderFrontend) => void;
};

export default function Exchange({ onAddOrder }: ExchangeProps) {
    const [tradeType, setTradeType] = useState<TradeType>("buy");
    const isBuy = tradeType === "buy";

    const [orderType, setOrderType] = useState<OrderType>("market");

    const [formData, setFormData] = useState<OrderFormData>(initFormData);

    const handleDateChange = (days: DateRange | undefined) => {
        setFormData((prev) => ({ ...prev, days }));
    };

    const total = useMemo(() => calculateTotal(formData, orderType), [formData, orderType]);

    const isValid = validateFormData(formData, orderType, isBuy);

    const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);
    const handleSubmit = () => {
        setIsConfirmOrderModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!formData.start_time || !formData.days?.from || !formData.days?.to || !formData.quantity) {
            toast.error("Please fill in all fields.");
            return;
        }

        let response;
        try {
            const total = calculateTotal(formData, orderType);
            const startHour = parseInt(formData.start_time);

            if (isNaN(startHour) || startHour < 0 || startHour >= 24) {
                return;
            }

            const quantity = parseInt(formData.quantity);
            if (isNaN(quantity) || quantity <= 0) {
                return;
            }

            let pricePerGpu: number;
            if (orderType === "market") {
                pricePerGpu = +getPriceForHour(startHour, formData.days.from, formData.days.to, formData.quantity);
            } else {
                if (!formData.price) return;
                const price = parseFloat(formData.price);
                if (isNaN(price) || price <= 0) return;
                pricePerGpu = price;
            }

            if (!Number.isFinite(pricePerGpu) || pricePerGpu <= 0) {
                return;
            }

            const orderForDB: Omit<TOrderDB, "id" | "order_date"> = {
                side: isBuy ? "buy" : "sell",
                type: orderType === "market" ? "market" : "limit",
                status: orderType === "market" ? "filled" : "pending",
                gpus: quantity,
                price_per_gpu: pricePerGpu,
                total_price: +total,
                start_date: formData.days.from.toISOString().split("T")[0],
                start_time: startHour,
                end_date: formData.days.to.toISOString().split("T")[0],
            };

            response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderForDB),
            });

            let responseData: TOrderDB;
            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                toast.error("An error occurred while placing the order. Please try again later.");
                return;
            } else {
                responseData = await response.json();
            }

            const newOrderForFrontend: TOrderFrontend = transformDBOrderToFrontend(responseData);

            toast.success("Order placed");
            onAddOrder(newOrderForFrontend);
            setIsConfirmOrderModalOpen(false);
            setFormData(initFormData);
        } catch (error) {
            toast.error("An error occurred while placing the order. Please try again later.");
            console.error("Frontend Error:", error);
            setIsConfirmOrderModalOpen(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-georgia leading-none">Exchange</h2>
            <TradeTypeInput tradeType={tradeType} setTradeType={setTradeType} isBuy={isBuy} />
            <OrderTypeInput orderType={orderType} setOrderType={setOrderType} />
            <div className={orderType === "limit" ? "grid grid-cols-2 gap-4" : ""}>
                <QuantityInput
                    id={isBuy ? "quantity" : "sell-quantity"}
                    value={formData.quantity}
                    onChange={(value) => setFormData((prev) => ({ ...prev, quantity: value }))}
                    isBuy={isBuy}
                />
                {orderType === "limit" && (
                    <PriceInput
                        isBuy={isBuy}
                        value={formData.price}
                        onChange={(value) => setFormData((prev) => ({ ...prev, price: value }))}
                    />
                )}
            </div>
            <div className="h-1" />
            <div className="grid grid-cols-[1fr_125px] items-end gap-4">
                <DaysInput formData={formData} orderType={orderType} setDate={handleDateChange} isBuy={isBuy} />
                <StartTimeInput
                    formData={formData}
                    onChange={(value) => setFormData((prev) => ({ ...prev, start_time: value }))}
                    orderType={orderType}
                    isBuy={isBuy}
                />
            </div>
            <div className="h-1" />
            <Separator />
            {orderType === "market" && <PricePerGPUPerDayInfo formData={formData} />}
            <TotalInfo total={total} />
            <Button
                disabled={!isValid}
                className={cn("w-full", isBuy ? "bg-green-600 hover:bg-green-600" : "bg-red-600 hover:bg-red-600")}
                onClick={handleSubmit}
            >
                Place {orderType === "market" ? "Market" : "Limit"} {isBuy ? "Buy" : "Sell"} Order
            </Button>
            <ConfirmOrder
                isOpen={isConfirmOrderModalOpen}
                onClose={() => setIsConfirmOrderModalOpen(false)}
                onConfirm={handleConfirm}
                orderData={{
                    tradeType: isBuy ? "buy" : "sell",
                    orderType,
                    quantity: formData.quantity,
                    price: formData.price,
                    days: formData.days,
                    total: formatCurrency(total),
                    start_time: formData.start_time,
                }}
            />
        </div>
    );
}
