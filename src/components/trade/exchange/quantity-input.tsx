"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuantityInput({
    id = "quantity",
    label = "QUANTITY (GPUs)",
    placeholder = "0",
    value,
    onChange,
}: {
    id?: string;
    label?: string;
    placeholder?: string;
    value: number | undefined;
    onChange: (value: number | undefined) => void;
}) {
    return (
        <div className="space-y-1">
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
        </div>
    );
}
