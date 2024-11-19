import { DateRange } from "react-day-picker";

export type TradeType = "buy" | "sell";
export type OrderType = "market" | "limit";

export type OrderFormData = {
    quantity: string;
    price: string;
    days: DateRange | undefined;
    start_time: string | undefined;
    end_time: string | undefined;
};

export type OrderData = {
    tradeType: TradeType;
    orderType: OrderType;
    quantity: string;
    price?: string;
    days: DateRange | undefined;
    total: string;
};
