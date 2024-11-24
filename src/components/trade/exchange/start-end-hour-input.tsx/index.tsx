import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/trade/exchange/start-end-hour-input.tsx/custom-select";
import { Label } from "@/components/ui/label";
import { TOrderFormData } from "@/types";
import { formatCurrency, formatTime, getDatePriceInfo } from "../utils";

export function StartEndHourInput({
    formData,
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    const { date_range, method, gpu_count, start_end_hour, side } = formData;
    const gpuCountInt = parseInt(gpu_count || "0");

    const getPriceColor = (priceType: "highest" | "lowest" | "normal" | "unavailable") => {
        if (priceType === "normal" || priceType === "unavailable") {
            return "text-muted-foreground";
        } else if (side === "buy") {
            // For buys: low is good (green), high is bad (red)
            return priceType === "lowest" ? "text-green-600" : "text-red-600";
        } else {
            // For sells: high is good (green), low is bad (red)
            return priceType === "highest" ? "text-green-600" : "text-red-600";
        }
    };

    const showLabel = method === "market" && (!date_range?.from || !gpuCountInt);

    return (
        <div className="space-y-1">
            <Label htmlFor="start-time" className="text-xs">
                START/END TIME
            </Label>
            <Select
                value={start_end_hour}
                onValueChange={(newStartEndHour) => {
                    const newFormData: TOrderFormData = {
                        ...formData,
                        start_end_hour: newStartEndHour,
                    };
                    setFormData(newFormData);
                }}
            >
                <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select">
                        {start_end_hour ? formatTime(start_end_hour) : "Select"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {showLabel && (
                            <SelectLabel>
                                {!date_range?.from && !gpuCountInt
                                    ? "Add GPU count and dates to see prices."
                                    : !date_range?.from
                                    ? "Add date range to see prices."
                                    : "Add GPU count to see prices."}
                            </SelectLabel>
                        )}
                        {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            const { price, priceType } = getDatePriceInfo(formData, hour);
                            const showPrice: boolean = method === "market" && !!date_range?.from && !!gpuCountInt;
                            const isUnavailable: boolean = priceType === "unavailable" && method === "market";

                            return (
                                <SelectItem
                                    key={i}
                                    value={hour}
                                    className="w-full [&>*]:w-full"
                                    disabled={isUnavailable}
                                >
                                    <div className="w-full flex justify-between items-center gap-8">
                                        <span>{formatTime(i.toString())}</span>
                                        {showPrice && (
                                            <span className={getPriceColor(priceType) + " " + "font-berkeley-mono"}>
                                                {isUnavailable ? "unavailable" : `${formatCurrency(price)}/GPU/day`}
                                            </span>
                                        )}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
