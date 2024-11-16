"use client";

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
    {
        accessorKey: "orderDate",
        header: "Order Date",
    },
    {
        accessorKey: "side",
        header: "Side",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "gpus",
        header: "GPUs",
    },
    {
        accessorKey: "pricePerGpu",
        header: "$/GPU/hr",
    },
    {
        accessorKey: "totalPrice",
        header: "Total",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const v = row.getValue("status") as string;
            const color = v === "Filled" ? "text-green-600" : v === "Pending" ? "text-yellow-600" : "text-red-600";
            return <div className={color}>{v}</div>;
        },
    },
];

export default ordersColumns;
