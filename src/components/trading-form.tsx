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

type TradeType = "buy" | "sell";
type OrderType = "market" | "limit";

type OrderFormData = {
    quantity: string;
    price: string;
    dateRange: DateRange | undefined;
};

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

const QuantityInput = ({
    id = "quantity",
    label = "Quantity (GPUs)",
    value,
    onChange,
}: {
    id?: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type="number" placeholder="8" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);

const PriceInput = ({
    isBuy,
    value,
    onChange,
}: {
    isBuy: boolean;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="space-y-2">
        <Label htmlFor={isBuy ? "price" : "sell-price"}>{isBuy ? "Max" : "Min"} price ($/GPU/hour)</Label>
        <Input
            id={isBuy ? "price" : "sell-price"}
            type="number"
            step="0.01"
            placeholder={isBuy ? "1.20" : "0.80"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const DatePickerWithRange = ({
    date,
    setDate,
    className,
}: {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
}) => {
    return (
        <div className={cn("w-full grid gap-2 mt-2", className)}>
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
                        defaultMonth={new Date()}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        fromDate={new Date()}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

const validateFormData = (data: OrderFormData, orderType: OrderType): boolean => {
    const quantity = parseFloat(data.quantity);
    if (!quantity || quantity <= 0) return false;

    if (orderType === "limit") {
        const price = parseFloat(data.price);
        if (!price || price <= 0) return false;
    }

    if (!data.dateRange?.from || !data.dateRange?.to) return false;

    return true;
};

const InfoBox = ({ orderType, isBuy }: { orderType: OrderType; isBuy: boolean }) => (
    <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm text-gray-600 text-center">
        {orderType === "limit" ? (
            "Your order will be filled when a matching offer becomes available."
        ) : (
            <>
                You {isBuy ? "pay" : "get"}: ${isBuy ? "1.15" : "0.95"}/GPU/hour
            </>
        )}
    </div>
);

const OrderForm = ({
    orderType,
    setOrderType,
    isBuy,
}: {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    isBuy: boolean;
}) => {
    const [formData, setFormData] = useState<OrderFormData>({
        quantity: "",
        price: "",
        dateRange: {
            from: new Date(),
            to: addDays(new Date(), 20),
        },
    });

    const isValid = validateFormData(formData, orderType);

    return (
        <div className="space-y-4">
            <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
            <div className={cn(orderType === "limit" ? "grid grid-cols-2 gap-4" : "")}>
                <QuantityInput
                    id={isBuy ? "quantity" : "sell-quantity"}
                    value={formData.quantity}
                    onChange={(value) => setFormData((prev) => ({ ...prev, quantity: value }))}
                />
                {orderType === "limit" && (
                    <PriceInput
                        isBuy={isBuy}
                        value={formData.price}
                        onChange={(value) => setFormData((prev) => ({ ...prev, price: value }))}
                    />
                )}
            </div>
            <div>
                <Label htmlFor="date-range">Date Range</Label>
                <DatePickerWithRange
                    date={formData.dateRange}
                    setDate={(dateRange) => setFormData((prev) => ({ ...prev, dateRange }))}
                />
            </div>
            <InfoBox orderType={orderType} isBuy={isBuy} />
            <Button
                disabled={!isValid}
                className={cn("w-full", isBuy ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600")}
            >
                Place {orderType === "market" ? "Market" : "Limit"} {isBuy ? "Buy" : "Sell"} Order
            </Button>
        </div>
    );
};

export default function TradingForm() {
    const [tradeType, setTradeType] = useState<TradeType>("buy");
    const [orderType, setOrderType] = useState<OrderType>("market");

    return (
        <div>
            <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as TradeType)}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">
                        <span className={tradeType === "buy" ? "text-green-600" : ""}>Buy</span>
                    </TabsTrigger>
                    <TabsTrigger value="sell">
                        <span className={tradeType === "sell" ? "text-red-600" : ""}>Sell</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={true} />
                </TabsContent>
                <TabsContent value="sell">
                    <OrderForm orderType={orderType} setOrderType={setOrderType} isBuy={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
