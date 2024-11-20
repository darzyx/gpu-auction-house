import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceInput({
    isBuy,
    value,
    onChange,
    placeholder = "0",
}: {
    isBuy: boolean;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
}) {
    const MAX_PRICE = 10000;

    return (
        <div className="space-y-1">
            <Label htmlFor={isBuy ? "price" : "sell-price"} className="text-xs">
                {isBuy ? "MAX" : "MIN"} PRICE ($/GPU/day)
            </Label>
            <Input
                id={isBuy ? "price" : "sell-price"}
                type="number"
                step="1"
                min={0}
                max={MAX_PRICE}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => {
                    const num = e.target.value;
                    onChange(num ? Math.min(MAX_PRICE, Math.max(0, +num)).toString() : undefined);
                }}
                onKeyDown={(e) => {
                    if (e.key === "-") e.preventDefault();
                }}
            />
        </div>
    );
}
