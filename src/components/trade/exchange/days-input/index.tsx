"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Calendar } from "./calendar";
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
    const isDesktop = useMediaQuery("(min-width: 768px)");

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
                            numberOfMonths={isDesktop ? 2 : 1}
                            fromDate={new Date()}
                            dayAmounts={dayAmountsData}
                            hasPickedQuantity={!!quantity}
                            isMarketOrder={orderType === "market"}
                        />
                        <div className="flex justify-end items-center gap-1">
                            <div className="flex items-center h-10 p-2 text-sm md:text-base -mt-2 mb-3">
                                {orderType === "market" && !quantity ? (
                                    <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                                        <span>Add quantity (GPUs)</span>
                                        <span>to see prices</span>
                                    </span>
                                ) : orderType === "market" ? (
                                    <span className="flex flex-col justify-center items-end">
                                        <span className="flex justify-start items-center gap-1">
                                            <span className="text-xs text-muted-foreground">from</span>
                                            <span className="font-berkeley-mono">{formatCurrency(total)}</span>
                                        </span>
                                        <span className="text-xs text-muted-foreground">total price</span>
                                    </span>
                                ) : (
                                    ""
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
