import { TOrder } from "@/db/schema";
import { DateRange } from "react-day-picker";

export type TOrderSide = "buy" | "sell";
export type TOrderMethod = "market" | "limit";
export type TOrderStatus = "filled" | "pending" | "canceled";

export type TOrderFormData = {
    side: TOrderSide;
    method: TOrderMethod;
    gpu_count: string;
    price_per_gpu: string;
    date_range: DateRange | undefined;
    start_end_hour: string;
    total_price: string;
};

export type TOrderForSubmit = Omit<
    TOrder,
    | "id"
    | "created_at"
    | "updated_at"
    | "start_date"
    | "end_date"
    | "price_per_gpu"
    | "total_price"
> & {
    start_date: string;
    end_date: string;
    price_per_gpu: number;
    total_price: number;
};

export type TOrderForTable = Omit<TOrder, "id" | "updated_at">;
