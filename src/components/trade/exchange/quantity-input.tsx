"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AVAILABLE_GPUS, USER_GPUS } from "./utils";

export default function QuantityInput({
    id = "quantity",
    label = "QUANTITY (GPUs)",
    placeholder = "0",
    value,
    onChange,
    isBuy,
}: {
    id?: string;
    label?: string;
    placeholder?: string;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    isBuy: boolean;
}) {
    const maxGPUs = isBuy ? AVAILABLE_GPUS : USER_GPUS;

    return (
        <div className="relative space-y-1">
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
            <Input
                id={id}
                type="number"
                min={0}
                max={maxGPUs}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => {
                    const num = e.target.value;
                    onChange(num ? Math.min(maxGPUs, Math.max(0, +num)).toString() : undefined);
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
