"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postOrder } from "@/db/actions";
import { cn } from "@/lib/utils";
import { TOrderFormData, TOrderForSubmit } from "@/types";
import ConfirmOrder from "./confirm-order";
import DateRangeInput from "./date-range-input";
import GPUCountInput from "./gpu-count-input";
import MethodInput from "./method-input";
import PricePerGpuInput from "./price-per-gpu-input";
import PricePerGPUPerDayInfo from "./price-per-gpu-per-day-info";
import SideInput from "./side-input";
import { StartEndHourInput } from "./start-end-hour-input.tsx";
import TotalInfo from "./total-info";
import { getPriceForHour, initFormData, validateFormData } from "./utils";

export default function Exchange() {
    const [formData, setFormData] = useState<TOrderFormData>(initFormData);
    const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] =
        useState(false);
    const queryClient = useQueryClient();

    const isValid = validateFormData(formData);

    const orderMutation = useMutation({
        mutationFn: (orderData: TOrderForSubmit) => postOrder(orderData),
        onSuccess: () => {
            toast.success("Order placed");
            setIsConfirmOrderModalOpen(false);
            setFormData(initFormData);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error) => {
            toast.error(
                "An error occurred while placing the order. Please try again later."
            );
            if (error instanceof Error) {
                console.error("Order creation error:", error.message);
            }
            setIsConfirmOrderModalOpen(false);
        },
    });

    const handleSubmit = () => {
        setIsConfirmOrderModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!isValid) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const startEndHour = parseInt(formData.start_end_hour || "0");
            if (isNaN(startEndHour) || startEndHour < 0 || startEndHour >= 24) {
                toast.error("Please enter a valid start/end hour.");
                return;
            }

            const gpuCount = parseInt(formData.gpu_count || "0");
            if (isNaN(gpuCount) || gpuCount <= 0) {
                toast.error("Please enter a valid amount (GPUs).");
                return;
            }

            let pricePerGpu: number;
            if (formData.method === "market") {
                pricePerGpu = +getPriceForHour(
                    formData,
                    formData.start_end_hour
                );
            } else {
                if (!formData.price_per_gpu) return;
                const price = parseFloat(formData.price_per_gpu);
                if (isNaN(price) || price <= 0) return;
                pricePerGpu = price;
            }

            if (!Number.isFinite(pricePerGpu) || pricePerGpu <= 0) {
                return;
            }

            if (!formData.date_range?.from || !formData.date_range?.to) {
                toast.error("Please select a date range.");
                return;
            }

            const orderForSubmit: TOrderForSubmit = {
                side: formData.side,
                method: formData.method,
                status: formData.method === "market" ? "filled" : "pending",
                gpu_count: gpuCount,
                price_per_gpu: pricePerGpu,
                total_price: parseFloat(formData.total_price),
                start_date: formData.date_range.from.toISOString(),
                end_date: formData.date_range.to.toISOString(),
                start_end_hour: startEndHour,
            };

            orderMutation.mutate(orderForSubmit);
        } catch (error) {
            toast.error(
                "An error occurred while placing the order. Please try again later."
            );
            console.error("Validation error:", error);
            setIsConfirmOrderModalOpen(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-georgia leading-none">Exchange</h2>
            <SideInput formData={formData} setFormData={setFormData} />
            <MethodInput formData={formData} setFormData={setFormData} />
            <div
                className={
                    formData.method === "limit" ? "grid grid-cols-2 gap-4" : ""
                }
            >
                <GPUCountInput formData={formData} setFormData={setFormData} />
                {formData.method === "limit" && (
                    <PricePerGpuInput
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>
            <div className="h-1" />
            <div className="grid grid-cols-[1fr_125px] items-end gap-4">
                <DateRangeInput formData={formData} setFormData={setFormData} />
                <StartEndHourInput
                    formData={formData}
                    setFormData={setFormData}
                />
            </div>
            <div className="h-1" />
            <Separator />
            {formData.method === "market" && (
                <PricePerGPUPerDayInfo formData={formData} />
            )}
            <TotalInfo formData={formData} />
            <Button
                disabled={!isValid || orderMutation.isPending}
                className={cn(
                    "w-full",
                    formData.side === "buy"
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-red-600 hover:bg-red-600"
                )}
                onClick={handleSubmit}
            >
                {orderMutation.isPending
                    ? "Placing Order..."
                    : `Place ${
                          formData.method === "market" ? "Market" : "Limit"
                      } 
                    ${formData.side === "buy" ? "Buy" : "Sell"} Order`}
            </Button>
            <ConfirmOrder
                formData={formData}
                isOpen={isConfirmOrderModalOpen}
                onClose={() => setIsConfirmOrderModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </div>
    );
}
