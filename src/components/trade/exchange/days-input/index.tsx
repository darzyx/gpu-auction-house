"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
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
    const [open, setOpen] = useState(false);
    const [dayAmounts, setDayAmounts] = useState<Record<string, string>>({});

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
    }, [days, days?.from, days?.to, quantity, isBuy]);

    const getSelectedRangePrice = () => {
        if (!days?.from || !days?.to) return "0";
        return isBuy ? getLowestPrice(days.from, days.to, quantity) : getHighestPrice(days.from, days.to, quantity);
    };

    const numSelectedDays = days ? getNumerOfDaysSelected(days) : 0;

    const TriggerButton = (
        <Button
            id="date"
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !days && "text-muted-foreground")}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
    );

    const CalendarContent = () => (
        <div>
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
            <div className="flex justify-end items-center gap-1 mt-2">
                <div className="flex items-center h-10 p-2 text-sm md:text-base">
                    {orderType === "limit" ? (
                        ""
                    ) : !quantity ? (
                        <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                            <span>Add quantity (GPUs)</span>
                            <span>to see prices</span>
                        </span>
                    ) : days?.from && days?.to ? (
                        <span className="flex flex-col justify-center items-end mb-1">
                            <span className="flex justify-start items-center gap-1">
                                <span className="text-xs text-muted-foreground">{isBuy ? "from" : "up to"}</span>
                                <span className="font-berkeley-mono">{formatCurrency(getSelectedRangePrice())}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">per GPU per day</span>
                        </span>
                    ) : (
                        <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                            <span>Select date range</span>
                            <span>to see best prices</span>
                        </span>
                    )}
                </div>
                {isDesktop ? (
                    <DialogClose asChild>
                        <Button className="w-20 h-10">Done</Button>
                    </DialogClose>
                ) : (
                    <DrawerClose asChild>
                        <Button className="w-20">Done</Button>
                    </DrawerClose>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-1">
            <Label htmlFor="days" className="text-xs">
                DATE RANGE
            </Label>
            <div className={cn("relative w-full grid gap-2", className)}>
                {isDesktop ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
                        <DialogContent className="w-full max-w-fit">
                            <DialogHeader>
                                <DialogTitle className="font-georgia font-normal text-center">
                                    Select Date Range
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col justify-center items-center">
                                <CalendarContent />
                            </div>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
                        <DrawerContent className="flex flex-col justify-center items-center pb-10">
                            <DrawerHeader className="hidden">
                                <DrawerTitle>Select Date Range</DrawerTitle>
                            </DrawerHeader>
                            <CalendarContent />
                        </DrawerContent>
                    </Drawer>
                )}
                <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                    <span className="text-muted-foreground text-xs">
                        You have {numSelectedDays} {numSelectedDays === 1 ? "day" : "days"} selected
                    </span>
                </div>
            </div>
        </div>
    );
}
