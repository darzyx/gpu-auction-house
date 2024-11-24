"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOrderFormData } from "@/types";
import { AVAILABLE_GPUS, USER_GPUS } from "./utils";

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
                GPU COUNT
            </Label>
            <Input
                id="gpu-count"
                type="number"
                min={0}
                max={maxGPUs}
                placeholder="0"
                value={gpu_count ?? ""}
                onChange={(e) => {
                    const num = parseInt(e.target.value || "0");
                    const newFormData: TOrderFormData = {
                        ...formData,
                        gpu_count: Math.min(num, maxGPUs).toString(),
                    };
                    setFormData(newFormData);
                }}
                onKeyDown={(e) => {
                    if (e.key === "-") e.preventDefault();
                }}
            />
            <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                <span className="text-muted-foreground text-xs">Max {maxGPUs} available</span>
            </div>
        </div>
    );
}
