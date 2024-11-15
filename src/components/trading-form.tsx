"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });

    return (
        <div className={cn("w-full grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default function TradingForm() {
    const [buyOrderType, setBuyOrderType] = useState("market");
    const [sellOrderType, setSellOrderType] = useState("market");

    return (
        <div>
            <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2 mb-5">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <div className="space-y-4">
                        <div className="flex justify-center items-center">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    variant={buyOrderType === "market" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setBuyOrderType("market")}
                                >
                                    Market
                                </Button>
                                <Button
                                    variant={buyOrderType === "limit" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setBuyOrderType("limit")}
                                >
                                    Limit
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity (GPUs)</Label>
                            <Input id="quantity" type="number" placeholder="8" />
                        </div>
                        {buyOrderType === "limit" && (
                            <div className="space-y-2">
                                <Label htmlFor="price">Max price ($/GPU/hour)</Label>
                                <Input id="price" type="number" step="0.01" placeholder="1.20" />
                            </div>
                        )}
                        <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <DatePickerWithRange />
                        </div>
                        <Button className="w-full bg-green-700 hover:bg-green-600">
                            Place {buyOrderType === "market" ? "Market" : "Limit"} Buy Order
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Orders will be filled when matching offers are available
                    </div>
                </TabsContent>
                <TabsContent value="sell">
                    <div className="space-y-4">
                        <div className="flex justify-center items-center">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    variant={sellOrderType === "market" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSellOrderType("market")}
                                >
                                    Market
                                </Button>
                                <Button
                                    variant={sellOrderType === "limit" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSellOrderType("limit")}
                                >
                                    Limit
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sell-quantity">Quantity (GPUs)</Label>
                            <Input id="sell-quantity" type="number" placeholder="8" />
                        </div>
                        {sellOrderType === "limit" && (
                            <div className="space-y-2">
                                <Label htmlFor="sell-price">Min price ($/GPU/hour)</Label>
                                <Input id="sell-price" type="number" step="0.01" placeholder="0.80" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="sell-duration">Duration (hours)</Label>
                            <Input id="sell-duration" type="number" placeholder="24" />
                        </div>
                        <Button className="w-full bg-red-700 hover:bg-red-600">
                            Place {sellOrderType === "market" ? "Market" : "Limit"} Sell Order
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Orders will be filled when matching offers are available
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
