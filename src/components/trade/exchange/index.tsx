"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Confirm from "./confirm";
import DaysInput from "./days-input";
import OrderTypeTabs from "./order-types-tabs";
import PriceInput from "./price-input";
import PricePerGPUPerDayInfo from "./price-per-gpu-per-day-info";
import QuantityInput from "./quantity-input";
import { StartTimeInput } from "./start-time-input";
import TotalInfo from "./total-info";
import { OrderFormData, OrderType, TradeType } from "./types";
import { calculateTotal, formatCurrency, getPriceForHour, initFormData, validateFormData } from "./utils";

const OrderForm = ({
    orderType,
    setOrderType,
    isBuy,
}: {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isBuy: boolean;
}) => {
    const [formData, setFormData] = useState<OrderFormData>(initFormData);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleDateChange = (days: DateRange | undefined) => {
        setFormData((prev) => ({ ...prev, days }));
    };

    const isValid = validateFormData(formData, orderType, isBuy);
    const total = useMemo(() => calculateTotal(formData, orderType), [formData, orderType]);

    const handleSubmit = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirm = async () => {
        if (!formData.start_time || !formData.days?.from || !formData.days?.to || !formData.quantity) {
            toast.error("Please fill in all required fields");
            return;
        }

        let response;
        try {
            const total = calculateTotal(formData, orderType);
            const startHour = parseInt(formData.start_time);

            console.log("Debug - Start Hour:", {
                rawStartTime: formData.start_time,
                parsedStartHour: startHour,
                isNaN: isNaN(startHour),
            });

            // Validate startHour first since that seems to be our issue
            if (isNaN(startHour)) {
                toast.error("Start time must be a valid hour (0-23)");
                return;
            }

            if (startHour < 0 || startHour >= 24) {
                toast.error("Start time must be between 0 and 23");
                return;
            }

            // Validate quantity
            if (!Number.isFinite(formData.quantity) || formData.quantity <= 0) {
                toast.error("Invalid quantity");
                return;
            }

            // Calculate price per GPU
            let pricePerGpu: number;
            if (orderType === "market") {
                pricePerGpu = getPriceForHour(startHour, formData.days.from, formData.days.to, formData.quantity);
            } else {
                if (!formData.price || !Number.isFinite(formData.price) || formData.price <= 0) {
                    toast.error("Invalid price for limit order");
                    return;
                }
                pricePerGpu = formData.price;
            }

            if (!Number.isFinite(pricePerGpu) || pricePerGpu <= 0) {
                toast.error("Invalid price calculation");
                return;
            }

            const orderData = {
                side: isBuy ? "Buy" : "Sell",
                type: orderType === "market" ? "Market" : "Limit",
                gpus: Number(formData.quantity),
                pricePerGpu: Number(pricePerGpu),
                totalPrice: Number(total),
                startDate: formData.days.from.toISOString().split("T")[0],
                endDate: formData.days.to.toISOString().split("T")[0],
                startHour: startHour, // Using the validated startHour
            };

            // Log what we're about to send
            console.log("Debug - Order Data:", orderData);

            response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit order");
            }

            toast.success(`${isBuy ? "Buy" : "Sell"} order submitted successfully`);
            setIsConfirmationOpen(false);
            setFormData(initFormData);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to submit order");
            console.error("Frontend Error Details:", error);
            if (response) {
                const errorResponse = await response.json();
                console.error("API Response:", errorResponse);
            }
        }
    };

    return (
        <div className="space-y-4">
            <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
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
            <Confirm
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
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
};

export default function Exchange() {
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
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={true} />
                </TabsContent>
                <TabsContent value="sell">
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
