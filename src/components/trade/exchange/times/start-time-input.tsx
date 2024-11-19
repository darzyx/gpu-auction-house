import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/trade/exchange/times/custom-select";
import { Label } from "@/components/ui/label";
import { OrderFormData } from "../types";
import { CURRENT_MARKET_PRICE, formatCurrency, formatTime, getDayTimePrice } from "../utils";

type StartTimeInputProps = {
    formData: OrderFormData;
    onChange: (value: string) => void;
};

export function StartTimeInput({ formData: { days, quantity, start_time }, onChange }: StartTimeInputProps) {
    const selectedDate = days?.from;
    const disabled = !selectedDate;
    const basePrice = CURRENT_MARKET_PRICE;

    const calculateTotalForTime = (hour: string) => {
        const parsedQuantity = parseFloat(quantity) || 0;
        const parsedDays =
            days?.from && days?.to ? Math.ceil((days.to.getTime() - days.from.getTime()) / (1000 * 60 * 60 * 24)) : 0;
        const timePrice = getDayTimePrice(basePrice, hour);
        return parsedQuantity * timePrice * parsedDays;
    };

    return (
        <div>
            <Label htmlFor="start-time" className="text-xs">
                Start Time
            </Label>
            <Select value={start_time} onValueChange={onChange} disabled={disabled || !selectedDate}>
                <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            const totalPrice = calculateTotalForTime(hour);
                            return (
                                <SelectItem key={i} value={hour}>
                                    <div className="w-[250px] flex justify-between">
                                        <span>{formatTime(i)}</span>
                                        <span
                                            className={
                                                totalPrice < calculateTotalForTime("12")
                                                    ? "text-green-600"
                                                    : "text-muted-foreground"
                                            }
                                        >
                                            {formatCurrency(totalPrice)}
                                        </span>
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
