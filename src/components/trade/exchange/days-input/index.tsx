"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/trade/exchange/days-input/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { OrderFormData, OrderType } from "../types";
import { formatCurrency } from "../utils";
import dayAmountsData from "./data";

export default function DaysInput({
    formData: { days: date, quantity },
    orderType,
    setDate,
    className,
    total,
}: {
    formData: OrderFormData;
    orderType: OrderType;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
    total: number;
}) {
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
                            onSelect={setDate}
                            numberOfMonths={2}
                            fromDate={new Date()}
                            dayAmounts={dayAmountsData}
                            hasPickedQuantity={!!quantity}
                            isMarketOrder={orderType === "market"}
                        />
                        <div className="flex justify-end items-center gap-1">
                            <div className="h-8 p-2 text-xs -mt-2 mb-3 font-berkeley-mono">
                                {orderType === "market" && !quantity
                                    ? "Add GPUs to see total"
                                    : orderType === "market"
                                    ? `${formatCurrency(total)} total`
                                    : ""}
                            </div>
                            <PopoverClose>
                                <div className="h-8 border rounded-md p-2 text-xs -mt-2 mr-3 mb-3 min-w-28 bg-foreground text-white hover:opacity-90">
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
