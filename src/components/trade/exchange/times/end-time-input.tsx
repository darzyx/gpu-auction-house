import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/trade/exchange/times/custom-select";
import { Label } from "@/components/ui/label";
import { BEST_PRICE_HOURS, getBestPrice, getHigherPrice } from "../price-helpers";
import { OrderFormData } from "../types";
import { formatCurrency, formatTime } from "../utils";

type EndTimeInputProps = {
    formData: OrderFormData;
    onChange: (value: string) => void;
};

export function EndTimeInput({ formData: { days, quantity, start_time, end_time }, onChange }: EndTimeInputProps) {
    const selectedDate = days?.to;
    const disabled = !selectedDate || !start_time;

    const isSameDay = Boolean(selectedDate && days?.from && selectedDate.toDateString() === days.from.toDateString());

    const getPriceForHour = (hour: number): { price: number; isBest: boolean } => {
        if (!days?.to || !quantity) return { price: 0, isBest: false };

        const fromDate = new Date(days.from || days.to);
        fromDate.setHours(parseInt(start_time || "0"));
        const toDate = new Date(days.to);
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
                            const { price, isBest } = getPriceForHour(i);
                            const isDisabled = Boolean(
                                isSameDay && start_time && parseInt(hour) <= parseInt(start_time)
                            );

                            return (
                                <SelectItem key={i} value={hour} disabled={isDisabled}>
                                    <div className="w-[250px] flex justify-between items-center">
                                        <span>{formatTime(i)}</span>
                                        <span className={isBest ? "text-green-600" : "text-muted-foreground"}>
                                            {formatCurrency(price)}
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
