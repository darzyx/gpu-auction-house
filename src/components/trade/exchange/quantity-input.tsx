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
    value: number | undefined;
    onChange: (value: number | undefined) => void;
    isBuy: boolean;
}) {
    return (
        <div className="relative space-y-1">
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
            <Input
                id={id}
                type="number"
                min={0}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => {
                    const num = e.target.valueAsNumber;
                    onChange(isNaN(num) ? undefined : Math.max(0, num));
                }}
                onKeyDown={(e) => {
                    if (e.key === "-") e.preventDefault();
                }}
            />
            <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                <span className="text-muted-foreground text-xs">
                    Max {isBuy ? AVAILABLE_GPUS : USER_GPUS} available
                </span>
            </div>
        </div>
    );
}
