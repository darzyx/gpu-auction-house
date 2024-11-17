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
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-1">
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
            <Input
                id={id}
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
