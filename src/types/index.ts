export type TOrderDB = {
    id: number;
    order_date: string;
    side: "buy" | "sell";
    type: "market" | "limit";
    start_date: string;
    start_time: number;
    end_date: string;
    gpus: number;
    price_per_gpu: number;
    total_price: number;
    status: "filled" | "pending" | "canceled";
};

export type TOrderFrontend = {
    id?: number;
    orderDate: string;
    side: "buy" | "sell";
    type: "market" | "limit";
    startDate: string;
    startTime: string;
    endDate: string;
    gpus: string;
    pricePerGpu: string;
    totalPrice: string;
    status: "filled" | "pending" | "canceled";
};
