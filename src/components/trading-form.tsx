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
    const [orderType, setOrderType] = useState("market");

    return (
        <div>
            <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <div className="space-y-4">
                        <Tabs defaultValue="market">
                            <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                                    value="market"
                                >
                                    Market
                                </TabsTrigger>
                                <TabsTrigger
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                                    value="limit"
                                >
                                    Limit
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity (GPUs)</Label>
                            <Input id="quantity" type="number" placeholder="8" />
                        </div>
                        {orderType === "limit" && (
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
                            Place {orderType === "market" ? "Market" : "Limit"} Buy Order
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Orders will be filled when matching offers are available
                    </div>
                </TabsContent>
                <TabsContent value="sell">
                    <div className="space-y-4">
                        <Tabs defaultValue="market">
                            <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                                    value="market"
                                >
                                    Market
                                </TabsTrigger>
                                <TabsTrigger
                                    className="inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                                    value="limit"
                                >
                                    Limit
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="space-y-2">
                            <Label htmlFor="sell-quantity">Quantity (GPUs)</Label>
                            <Input id="sell-quantity" type="number" placeholder="8" />
                        </div>
                        {orderType === "limit" && (
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
                            Place {orderType === "market" ? "Market" : "Limit"} Sell Order
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
