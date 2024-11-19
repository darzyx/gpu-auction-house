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
import { OrderFormData, OrderType } from "../types";
import { BEST_PRICE_HOURS, formatCurrency, formatTime, getBestPrice, getHigherPrice } from "../utils";

type StartTimeInputProps = {
    formData: OrderFormData;
    onChange: (value: string) => void;
    orderType: OrderType;
};

export function StartTimeInput({
    formData: { days, quantity, start_time },
    onChange,
    orderType,
}: StartTimeInputProps) {
    const selectedDate = days?.from;

    const getPriceForHour = (hour: number): { price: number; isBest: boolean } => {
        if (!days?.from || !quantity) return { price: 0, isBest: false };

        const fromDate = new Date(days.from);
        fromDate.setHours(hour);
        const toDate = days.to ? new Date(days.to) : new Date(days.from);
        toDate.setHours(hour);

        if (BEST_PRICE_HOURS.includes(hour)) {
            return {
                price: getBestPrice(fromDate, toDate, quantity),
                isBest: true,
            };
        }

        return {
            price: getHigherPrice(fromDate, toDate, quantity),
            isBest: false,
        };
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
                            const { price, isBest } = getPriceForHour(i);
                            const showPrice = orderType === "market" && selectedDate && quantity;

                            return (
                                <SelectItem key={i} value={hour}>
                                    <div className="w-[200px] flex justify-between items-center">
                                        <span>{formatTime(i)}</span>
                                        {showPrice && (
                                            <span className={isBest ? "text-green-600" : "text-muted-foreground"}>
                                                {formatCurrency(price)}
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
