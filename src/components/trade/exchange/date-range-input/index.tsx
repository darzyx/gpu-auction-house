"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { TOrderFormData } from "@/types";
import {
    calculateTotal,
    formatCurrency,
    getHighestPrice,
    getLowestPrice,
    getNumerOfDaysSelected,
    getPricesWithDateRange,
    getPricesWithStartDate,
} from "../utils";
import { Calendar } from "./calendar";

export default function DateRangeInput({
    formData,
    setFormData,
}: {
    formData: TOrderFormData;
    setFormData: React.Dispatch<React.SetStateAction<TOrderFormData>>;
}) {
    const { date_range, gpu_count, side, method } = formData;
    const gpuCountInt = parseInt(gpu_count || "0");

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);
    const [datePrices, setDatesPrices] = useState<Record<string, string>>({});

    const handleSelect = (newDateRange: DateRange | undefined) => {
        const newFormData: TOrderFormData = { ...formData };
        newFormData.date_range = newDateRange;
        if (newFormData.method === "market") {
            newFormData.start_end_hour = "";
        }
        newFormData.total_price = calculateTotal(newFormData);
        setFormData(newFormData);
    };

    useEffect(() => {
        if (
            !gpuCountInt ||
            !date_range ||
            (!date_range.from && !date_range.to)
        ) {
            setDatesPrices({});
        } else if (date_range.from && !date_range.to) {
            setDatesPrices(getPricesWithStartDate(formData));
        } else if (date_range.from && date_range.to) {
            setDatesPrices(getPricesWithDateRange(formData));
        }
    }, [formData]);

    const getSelectedRangePrice = () => {
        if (!date_range?.from || !date_range?.to || !gpuCountInt) return "0";
        return side === "buy"
            ? getLowestPrice(date_range.from, date_range.to, gpu_count)
            : getHighestPrice(date_range.from, date_range.to, gpu_count);
    };

    const numSelectedDays = date_range ? getNumerOfDaysSelected(date_range) : 0;

    const TriggerButton = (
        <Button
            id="date"
            variant="outline"
            className={cn(
                "w-full justify-start text-left font-normal",
                !date_range && "text-muted-foreground"
            )}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date_range?.from ? (
                date_range.to ? (
                    <>
                        {format(date_range.from, "M/d/yy")} -{" "}
                        {format(date_range.to, "M/d/yy")}
                    </>
                ) : (
                    format(date_range.from, "M/d/yy")
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
                selected={date_range}
                onSelect={handleSelect}
                numberOfMonths={isDesktop ? 2 : 1}
                fromDate={new Date()}
                datePrices={datePrices}
                hasPickedGPUCount={!!gpu_count}
                isMarketOrder={method === "market"}
            />
            <div className="flex justify-end items-center gap-1 mt-2">
                <div className="flex items-center h-10 p-2 text-sm md:text-base">
                    {method === "limit" ? (
                        ""
                    ) : !gpuCountInt ? (
                        <span className="flex flex-col justify-center items-end text-xs md:text-sm text-muted-foreground">
                            <span>Add amount (GPUs)</span>
                            <span>to see prices</span>
                        </span>
                    ) : date_range?.from && date_range?.to ? (
                        <span className="flex flex-col justify-center items-end mb-1">
                            <span className="flex justify-start items-center gap-1">
                                <span className="text-xs text-muted-foreground">
                                    {side === "buy" ? "from" : "up to"}
                                </span>
                                <span className="font-berkeley-mono">
                                    {formatCurrency(getSelectedRangePrice())}
                                </span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                                per GPU per day
                            </span>
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
            <div className="relative w-full grid gap-2">
                {isDesktop ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
                        <DialogContent className="w-full max-w-fit">
                            <DialogHeader>
                                <DialogTitle className="font-georgia font-normal text-center">
                                    Select Date Range
                                </DialogTitle>
                                <DialogDescription className="font-normal text-center">
                                    {numSelectedDays}{" "}
                                    {numSelectedDays === 1 ? "day" : "days"}{" "}
                                    selected
                                </DialogDescription>
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
                            <DrawerHeader>
                                <DrawerTitle className="font-georgia font-normal text-center">
                                    Select Date Range
                                </DrawerTitle>
                                <DrawerDescription className="font-normal text-center">
                                    {numSelectedDays}{" "}
                                    {numSelectedDays === 1 ? "day" : "days"}{" "}
                                    selected
                                </DrawerDescription>
                            </DrawerHeader>
                            <CalendarContent />
                        </DrawerContent>
                    </Drawer>
                )}
                <div className="absolute -bottom-5 flex flex-col justify-center items-end">
                    <span className="text-muted-foreground text-xs">
                        You have {numSelectedDays}{" "}
                        {numSelectedDays === 1 ? "day" : "days"} selected
                    </span>
                </div>
            </div>
        </div>
    );
}
