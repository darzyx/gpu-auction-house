"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { getBestPrice, getPricesWithDateRange, getPricesWithStartDate } from "../price-helpers";
import { OrderFormData, OrderType } from "../types";
import { formatCurrency } from "../utils";
import { Calendar } from "./calendar";

export default function DaysInput({
    formData: { days: date, quantity },
    orderType,
    setDate,
    className,
}: {
    formData: OrderFormData;
    orderType: OrderType;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
}) {
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
        if (!date) {
            setDayAmounts({});
            return;
        }

        if (date.from && !date.to) {
            // Only start date selected
            setDayAmounts(getPricesWithStartDate(date.from, quantity));
        } else if (date.from && date.to) {
            // Both dates selected
            setDayAmounts(getPricesWithDateRange(date, quantity));
        }
    }, [date?.from, date?.to, quantity]);

    const getSelectedRangePrice = () => {
        if (!date?.from || !date?.to) return 0;
        return getBestPrice(date.from, date.to, quantity);
    };

    return (
        <div className="space-y-1">
            <Label htmlFor="days" className="text-xs">
                DAYS
            </Label>
            <div className={cn("w-full grid gap-2", className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
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
                            selected={date}
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
                                ) : date?.from && date?.to ? (
                                    <span className="flex flex-col justify-center items-end">
                                        <span className="flex justify-start items-center gap-1">
                                            <span className="text-xs text-muted-foreground">from</span>
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
            </div>
        </div>
    );
}
