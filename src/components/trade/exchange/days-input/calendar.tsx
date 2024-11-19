"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayContentProps, DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    dayAmounts: Record<string, number>;
    isMarketOrder: boolean;
    hasPickedQuantity: boolean;
};

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    dayAmounts = {},
    isMarketOrder,
    hasPickedQuantity,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-11 md:w-14 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md"
                ),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-11 h-11 md:w-14 md:h-14 font-normal aria-selected:opacity-100 flex flex-col justify-center items-center"
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
                DayContent: (props: DayContentProps) => {
                    const dateKey = props.date.toISOString().split("T")[0];
                    const amount = dayAmounts[dateKey];
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isNotPastDate = props.date >= today;
                    const renderPrice = isMarketOrder && hasPickedQuantity;
                    const makePriceVisible = amount !== undefined && isNotPastDate;
                    const isRangeStart = props.activeModifiers.range_start;
                    const isRangeEnd = props.activeModifiers.range_end;
                    return (
                        <>
                            <span className="text-xs md:text-sm">{props.date.getDate()}</span>
                            {renderPrice && (
                                <span
                                    className={cn(
                                        "text-[0.6rem] md:text-xs leading-none -mt-1.5 font-berkeley-mono",
                                        makePriceVisible
                                            ? isRangeStart
                                                ? "text-white"
                                                : isRangeEnd
                                                ? "text-green-400"
                                                : "text-green-600"
                                            : "invisible"
                                    )}
                                >
                                    {isRangeStart ? "start" : makePriceVisible ? formatCurrency(amount) : "$0.00"}
                                </span>
                            )}
                        </>
                    );
                },
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
