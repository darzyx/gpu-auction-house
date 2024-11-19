import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/trade/exchange/times/custom-select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { OrderFormData, OrderType } from "../types";
import {
    HIGHEST_PRICE_HOURS,
    LOWEST_PRICE_HOURS,
    formatCurrency,
    formatTime,
    getHighestPrice,
    getLowestPrice,
    getMediumPrice,
} from "../utils";

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

    const getPriceForHour = (hour: number): { price: number; priceType: "highest" | "lowest" | "normal" } => {
        if (!days?.from || !quantity) return { price: 0, priceType: "normal" };

        const fromDate = new Date(days.from);
        fromDate.setHours(hour);
        const toDate = days.to ? new Date(days.to) : new Date(days.from);
        toDate.setHours(hour);

        if (HIGHEST_PRICE_HOURS.includes(hour)) {
            return {
                price: getHighestPrice(fromDate, toDate, quantity),
                priceType: "highest",
            };
        }

        if (LOWEST_PRICE_HOURS.includes(hour)) {
            return {
                price: getLowestPrice(fromDate, toDate, quantity),
                priceType: "lowest",
            };
        }

        return {
            price: getMediumPrice(fromDate, toDate, quantity),
            priceType: "normal",
        };
    };

    const getPriceColor = (priceType: "highest" | "lowest" | "normal") => {
        if (priceType === "normal") return "text-muted-foreground";

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
        <div>
            <Label htmlFor="start-time" className="text-xs">
                Start Time
            </Label>
            <Select value={start_time} onValueChange={onChange}>
                <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {showLabel && (
                            <SelectLabel>
                                {!selectedDate && !quantity
                                    ? "Select dates and quantity to see prices."
                                    : !selectedDate
                                    ? "Select date range to see prices."
                                    : "Select quantity to see prices."}
                            </SelectLabel>
                        )}
                        {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            const { price, priceType } = getPriceForHour(i);
                            const showPrice = orderType === "market" && selectedDate && quantity;

                            return (
                                <SelectItem key={i} value={hour}>
                                    <div
                                        className={cn(
                                            orderType === "market" ? "w-[200px]" : "w-auto",
                                            "flex justify-between items-center"
                                        )}
                                    >
                                        <span>{formatTime(i)}</span>
                                        {showPrice && (
                                            <span className={getPriceColor(priceType)}>{formatCurrency(price)}</span>
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
