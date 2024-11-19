import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceInput({
    isBuy,
    value,
    onChange,
    placeholder = "0",
}: {
    isBuy: boolean;
    value: number | undefined;
    onChange: (value: number | undefined) => void;
    placeholder?: string;
}) {
    return (
        <div className="space-y-1">
            <Label htmlFor={isBuy ? "price" : "sell-price"} className="text-xs">
                {isBuy ? "MAX" : "MIN"} PRICE ($/GPU/day)
            </Label>
            <Input
                id={isBuy ? "price" : "sell-price"}
                type="number"
                step="1"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(+e.target.value)}
            />
        </div>
    );
}
