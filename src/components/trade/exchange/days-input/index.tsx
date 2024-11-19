"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { OrderFormData, OrderType } from "../types";
import {
    formatCurrency,
    getHighestPrice,
    getLowestPrice,
    getNumerOfDaysSelected,
    getPricesWithDateRange,
    getPricesWithStartDate,
} from "../utils";
import { Calendar } from "./calendar";

type DaysInputProps = {
    formData: OrderFormData;
    orderType: OrderType;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
    isBuy: boolean;
};

export default function DaysInput({
    formData: { days, quantity },
    orderType,
    setDate,
    className,
    isBuy,
}: DaysInputProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [dayAmounts, setDayAmounts] = useState<Record<string, number>>({});

    const handleSelect = (range: DateRange | undefined) => {
        if (!range) {
            setDate(undefined);
            return;
        }

        if (range.from && range.to) {
            const fromDate = new Date(range.from);
            const toDate = new Date(range.to);

            if (fromDate.toDateString() === toDate.toDateString()) {
                setDate({ from: range.from, to: undefined });
                return;
            }
        }

        setDate(range);
    };

    useEffect(() => {
        if (!days) {
            setDayAmounts({});
            return;
        }
        if (days.from && !days.to) {
            setDayAmounts(getPricesWithStartDate(days.from, quantity, isBuy));
        } else if (days.from && days.to) {
            setDayAmounts(getPricesWithDateRange(days, quantity, isBuy));
        }
    }, [days?.from, days?.to, quantity, isBuy]);

    const getSelectedRangePrice = () => {
        if (!days?.from || !days?.to) return 0;
        return isBuy ? getLowestPrice(days.from, days.to, quantity) : getHighestPrice(days.from, days.to, quantity);
    };

    return (
        <div className="space-y-1">
            <Label htmlFor="days" className="text-xs">
                DATE RANGE
            </Label>
            <div className={cn("relative w-full grid gap-2", className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !days && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon />
                            {days?.from ? (
                                days.to ? (
                                    <>
                                        {format(days.from, "M/d/yy")} - {format(days.to, "M/d/yy")}
                                    </>
                                ) : (
                                    format(days.from, "M/d/yy")
                                )
                            ) : (
                                <span>Select dates</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={new Date()}
                            selected={days}
                            onSelect={handleSelect}
                            numberOfMonths={isDesktop ? 2 : 1}
                            fromDate={new Date()}
                            dayAmounts={dayAmounts}
                            hasPickedQuantity={!!quantity}
                            isMarketOrder={orderType === "market"}
                        />
                        <div className="flex justify-end items-center gap-1">
                            <div className="flex items-center h-10 p-2 text-sm md:text-base -mt-2 mb-3">
                                {orderType === "limit" ? (
                                    ""
                                ) : !quantity ? (
                                    <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                                        <span>Add quantity (GPUs)</span>
                                        <span>to see prices</span>
                                    </span>
                                ) : days?.from && days?.to ? (
                                    <span className="flex flex-col justify-center items-end">
                                        <span className="flex justify-start items-center gap-1">
                                            <span className="text-xs text-muted-foreground">
                                                {isBuy ? "from" : "up to"}
                                            </span>
                                            <span className="font-berkeley-mono">
                                                {formatCurrency(getSelectedRangePrice())}
                                            </span>
                                        </span>
                                        <span className="text-xs text-muted-foreground">per GPU per day</span>
                                    </span>
                                ) : (
                                    <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                                        <span>Select start and end</span>
                                        <span>dates to see prices</span>
                                    </span>
                                )}
                            </div>
                            <PopoverClose>
                                <div className="flex justify-center items-center h-10 border rounded-md p-2 text-sm -mt-2 mr-3 mb-3 min-w-28 bg-foreground text-white hover:opacity-90">
                                    Done
                                </div>
                            </PopoverClose>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                    <span className="text-muted-foreground text-xs">
                        You have {days ? getNumerOfDaysSelected(days) : 0} days selected
                    </span>
                </div>
            </div>
        </div>
    );
}
