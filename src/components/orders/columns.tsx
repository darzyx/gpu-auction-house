"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 hover:bg-transparent"
                >
                    Total
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const v = row.getValue("status") as string;
            const color = v === "Filled" ? "text-green-600" : v === "Pending" ? "text-yellow-600" : "text-red-600";
            return <div className={color + " text-right"}>{v}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row: { original } }) => {
            return original.status === "Pending" ? (
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
                    >
                        Cancel
                    </Button>
                </div>
            ) : null;
        },
    },
];

export default ordersColumns;
