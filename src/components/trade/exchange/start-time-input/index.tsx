import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/trade/exchange/start-time-input/custom-select";
import { Label } from "@/components/ui/label";
import { OrderFormData, OrderType } from "../types";
import { formatCurrency, formatTime, getPriceInfoForHour } from "../utils";

type StartTimeInputProps = {
    formData: OrderFormData;
    onChange: (value: string) => void;
    orderType: OrderType;
    isBuy: boolean;
};

export function StartTimeInput({
    formData: { days, quantity, start_time },
    onChange,
    orderType,
    isBuy,
}: StartTimeInputProps) {
    const selectedDate = days?.from;

    const getPriceForHour = (hour: number) => {
        return getPriceInfoForHour(hour, days?.from, days?.to, quantity);
    };

    const getPriceColor = (priceType: "highest" | "lowest" | "normal" | "unavailable") => {
        if (priceType === "normal" || priceType === "unavailable") {
            return "text-muted-foreground";
        }

        if (isBuy) {
            // For buys: low is good (green), high is bad (red)
            return priceType === "lowest" ? "text-green-600" : "text-red-600";
        } else {
            // For sells: high is good (green), low is bad (red)
            return priceType === "highest" ? "text-green-600" : "text-red-600";
        }
    };

    const showLabel = orderType === "market" && (!selectedDate || !quantity);

    return (
        <div className="space-y-1">
            <Label htmlFor="start-time" className="text-xs">
                START/END TIME
            </Label>
            <Select value={start_time} onValueChange={onChange}>
                <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select">{start_time ? formatTime(start_time) : "Select"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {showLabel && (
                            <SelectLabel>
                                {!selectedDate && !quantity
                                    ? "Select quantity and dates to see prices."
                                    : !selectedDate
                                    ? "Select date range to see prices."
                                    : "Select quantity to see prices."}
                            </SelectLabel>
                        )}
                        {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            const { price, priceType } = getPriceForHour(i);
                            const showPrice = orderType === "market" && selectedDate && quantity;
                            const isUnavailable = priceType === "unavailable";

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
