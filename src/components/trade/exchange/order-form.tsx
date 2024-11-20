"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TOrder } from "@/types";
import Confirm from "./confirm";
import DaysInput from "./days-input";
import OrderTypeTabs from "./order-types-tabs";
import PriceInput from "./price-input";
import PricePerGPUPerDayInfo from "./price-per-gpu-per-day-info";
import QuantityInput from "./quantity-input";
import { StartTimeInput } from "./start-time-input";
import TotalInfo from "./total-info";
import { OrderFormData, OrderType } from "./types";
import { calculateTotal, formatCurrency, getPriceForHour, initFormData, validateFormData } from "./utils";

export default function OrderForm({
    orderType,
    setOrderType,
    isBuy,
    onOrderSubmitted,
}: {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isBuy: boolean;
    onOrderSubmitted: (order: TOrder) => void;
}) {
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

            if (isNaN(startHour)) {
                toast.error("Start time must be a valid hour (0-23)");
                return;
            }

            if (startHour < 0 || startHour >= 24) {
                toast.error("Start time must be between 0 and 23");
                return;
            }

            if (!Number.isFinite(formData.quantity) || formData.quantity <= 0) {
                toast.error("Invalid quantity");
                return;
            }

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
                startHour: startHour,
            };

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

            const responseData = await response.json();

            const orderDateObj = new Date();
            const newOrder: TOrder = {
                id: responseData.id,
                orderDate: `${orderDateObj.getMonth() + 1}/${orderDateObj
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${orderDateObj.getFullYear().toString().slice(-2)} ${orderDateObj
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${orderDateObj.getMinutes().toString().padStart(2, "0")}:${orderDateObj
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`,
                side: isBuy ? "buy" : "sell",
                type: orderType === "market" ? "market" : "limit",
                startDate: new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    day: "2-digit",
                    year: "2-digit",
                }).format(formData.days.from),
                startTime: +formData.start_time,
                endDate: new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    day: "2-digit",
                    year: "2-digit",
                }).format(formData.days.to),
                gpus: +formData.quantity,
                pricePerGpu: +pricePerGpu,
                totalPrice: +total,
                status: orderType === "market" ? "filled" : "pending",
            };

            onOrderSubmitted(newOrder);
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
}
