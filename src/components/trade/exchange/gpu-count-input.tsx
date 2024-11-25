"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOrderFormData } from "@/types";
import { AVAILABLE_GPUS, calculateTotal, USER_GPUS } from "./utils";

export default function GPUCountInput({
    formData,
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    const { gpu_count, side } = formData;
    const maxGPUs = side === "buy" ? AVAILABLE_GPUS : USER_GPUS;

    return (
        <div className="relative space-y-1">
            <Label htmlFor="gpu-count" className="text-xs">
                AMOUNT (GPUs)
            </Label>
            <Input
                id="gpu-count"
                type="number"
                min={0}
                max={maxGPUs}
                placeholder="0"
                value={gpu_count ?? ""}
                onChange={(e) => {
                    const newGPUCount = Math.min(
                        parseInt(e.target.value || "0"),
                        maxGPUs
                    );
                    const newFormData: TOrderFormData = { ...formData };
                    newFormData.gpu_count = newGPUCount.toString();
                    if (newFormData.method === "market") {
                        newFormData.date_range = undefined;
                        newFormData.start_end_hour = "";
                    }
                    newFormData.total_price = calculateTotal(newFormData);
                    setFormData(newFormData);
                }}
                onKeyDown={(e) => {
                    if (e.key === "-") e.preventDefault();
                }}
            />
            <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                <span className="text-muted-foreground text-xs">
                    Max {maxGPUs} available
                </span>
            </div>
        </div>
    );
}
