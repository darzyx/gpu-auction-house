import { DateRange } from "react-day-picker";

export type TradeType = "buy" | "sell";
export type OrderType = "market" | "limit";

export type OrderFormData = {
    quantity: string;
    price: string;
    dateRange: DateRange | undefined;
    days: string;
};

export type OrderData = {
    tradeType: TradeType;
    orderType: OrderType;
    quantity: string;
    price?: string;
    dateRange: DateRange | undefined;
    days: string;
    total: string;
};
