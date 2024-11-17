"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";

export default function DaysInput({
    date,
    setDate,
    className,
}: {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
}) {
    return (
        <div className="space-y-1">
            <Label htmlFor="days" className="text-xs">
                DATE RANGE
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
                            dayAmounts={{
                                "2024-11-17": 100,
                                "2024-11-18": 250,
                                "2024-11-19": 175,
                            }}
                        />
                        <div className="flex justify-center">
                            <PopoverClose>
                                <div className="h-8 border rounded-md p-2 text-xs -mt-2 mb-2 min-w-36 hover:bg-muted">
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
