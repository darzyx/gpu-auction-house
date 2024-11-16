import { ColumnDef } from "@tanstack/react-table";

export type TOrder = {
    id: number;
    orderDate: string;
    side: "Buy" | "Sell";
    type: "Market" | "Limit";
    startDate: string;
    endDate: string;
    gpus: number;
    pricePerGpu: string;
    totalPrice: string;
    status: "Filled" | "Pending" | "Canceled";
};

const ordersColumns: ColumnDef<TOrder>[] = [
    { accessorKey: "orderDate", header: "Order Date" },
    { accessorKey: "side", header: "Side" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "gpus", header: "GPUs" },
    { accessorKey: "pricePerGpu", header: "$/GPU/hr" },
    { accessorKey: "totalPrice", header: "Total Price" },
    { accessorKey: "status", header: "Status" },
];

export default ordersColumns;
