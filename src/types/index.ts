import { DateRange } from "react-day-picker";

export type TOrderSide = "buy" | "sell";
export type TOrderMethod = "market" | "limit";
export type TOrderStatus = "filled" | "pending" | "canceled";

export type TOrder = {
    id: string;
    side: TOrderSide;
    method: TOrderMethod;
    gpu_count: number;
    price_per_gpu: number;
    start_date: string;
    end_date: string;
    start_end_hour: number;
    total_price: number;
    status: TOrderStatus;
    created_date: string;
    updated_date: string;
};

export type TOrderFormData = {
    side: TOrderSide;
    method: TOrderMethod;
    gpu_count: string;
    price_per_gpu: string;
    date_range: DateRange | undefined;
    start_end_hour: string;
    total_price: number;
};

export type TOrderForSubmit = Omit<TOrder, "id" | "created_date" | "updated_date" | "start_date" | "end_date"> & {
    start_date: string;
    end_date: string;
};

export type TOrderForTable = Omit<TOrder, "id" | "updated_date">;
