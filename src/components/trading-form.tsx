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

type OrderType = "market" | "limit";

const OrderTypeTabs = ({
    orderType,
    setOrderType,
}: {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
}) => (
    <Tabs value={orderType} onValueChange={(value) => setOrderType(value as OrderType)}>
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
);

const QuantityInput = ({ id = "quantity", label = "Quantity (GPUs)" }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type="number" placeholder="8" />
    </div>
);

const PriceInput = ({ isBuy }: { isBuy: boolean }) => (
    <div className="space-y-2">
        <Label htmlFor={isBuy ? "price" : "sell-price"}>{isBuy ? "Max" : "Min"} price ($/GPU/hour)</Label>
        <Input id={isBuy ? "price" : "sell-price"} type="number" step="0.01" placeholder={isBuy ? "1.20" : "0.80"} />
    </div>
);

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

const OrderForm = ({ isBuy }: { isBuy: boolean }) => {
    const [orderType, setOrderType] = useState<OrderType>("market");

    return (
        <div className="space-y-4">
            <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
            <QuantityInput id={isBuy ? "quantity" : "sell-quantity"} />
            {orderType === "limit" && <PriceInput isBuy={isBuy} />}
            <div>
                <Label htmlFor="date-range">Date Range</Label>
                <DatePickerWithRange />
            </div>
            <Button
                className={cn("w-full", isBuy ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600")}
            >
                Place {orderType === "market" ? "Market" : "Limit"} {isBuy ? "Buy" : "Sell"} Order
            </Button>
            {orderType === "limit" && (
                <div className="text-sm text-muted-foreground">
                    Orders will be filled when matching offers are available
                </div>
            )}
        </div>
    );
};

export default function TradingForm() {
    return (
        <div>
            <Tabs defaultValue="buy">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <OrderForm isBuy={true} />
                </TabsContent>
                <TabsContent value="sell">
                    <OrderForm isBuy={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
