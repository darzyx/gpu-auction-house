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

type EndTimeInputProps = {
    formData: OrderFormData;
    onChange: (value: string) => void;
};

export function EndTimeInput({ formData: { days, quantity, start_time, end_time }, onChange }: EndTimeInputProps) {
    const selectedDate = days?.to;
    const disabled = !selectedDate || !start_time;
    const basePrice = CURRENT_MARKET_PRICE;

    const isSameDay = Boolean(selectedDate && days?.from && selectedDate.toDateString() === days.from.toDateString());

    const calculateTotalForTime = (hour: string) => {
        const parsedQuantity = parseFloat(quantity) || 0;
        const parsedDays =
            days?.from && days?.to ? Math.ceil((days.to.getTime() - days.from.getTime()) / (1000 * 60 * 60 * 24)) : 0;
        const timePrice = getDayTimePrice(basePrice, hour);
        return parsedQuantity * timePrice * parsedDays;
    };

    return (
        <div>
            <Label htmlFor="end-time" className="text-xs">
                End Time
            </Label>
            <Select value={end_time} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger id="end-time">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            const totalPrice = calculateTotalForTime(hour);
                            const isDisabled = Boolean(
                                isSameDay && start_time && parseInt(hour) <= parseInt(start_time)
                            );

                            return (
                                <SelectItem key={i} value={hour} disabled={isDisabled}>
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
