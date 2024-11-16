"use client";

import { Button } from "@/components/ui/button";
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
    {
        id: "actions",
        cell: ({ row: { original } }) => {
            return original.status === "Pending" ? (
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
                >
                    Cancel
                </Button>
            ) : null;
        },
    },
];

export default ordersColumns;
