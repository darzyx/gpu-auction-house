export type TOrder = {
    id: number;
    orderDate: string;
    side: "buy" | "sell";
    type: "market" | "limit";
    startDate: string;
    startTime: number;
    endDate: string;
    gpus: number;
    pricePerGpu: number;
    totalPrice: number;
    status: "filled" | "pending" | "canceled";
};
