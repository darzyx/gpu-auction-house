import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOrderFormData } from "@/types";

export default function PricePerGpuInput({
    formData: { price_per_gpu, side },
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    const MAX_PRICE = 10000;

    return (
        <div className="space-y-1">
            <Label htmlFor="price-per-gpu" className="text-xs">
                {side === "buy" ? "MAX" : "MIN"} PRICE ($/GPU/day)
            </Label>
            <Input
                id="price-per-gpu"
                type="number"
                step="1"
                min={0}
                max={MAX_PRICE}
                placeholder="0"
                value={price_per_gpu ?? ""}
                onChange={(e) => {
                    const num = parseFloat(e.target.value || "0");
                    setFormData((prev) => ({
                        ...prev,
                        price_per_gpu: Math.min(MAX_PRICE, Math.max(0, num)).toString(),
                    }));
                }}
                onKeyDown={(e) => {
                    if (e.key === "-") e.preventDefault();
                }}
            />
        </div>
    );
}
