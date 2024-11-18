"use client";

import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

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

const SortableHeader = ({ column, children }: { column: Column<TOrder, unknown>; children: React.ReactNode }) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
        >
            {children}
            {column.getIsSorted() === "asc" ? (
                <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    );
};

const ordersColumns: ColumnDef<TOrder>[] = [
    {
        accessorKey: "orderDate",
        header: ({ column }) => <SortableHeader column={column}>Order Date</SortableHeader>,
        cell: ({ row }) => {
            const v = row.getValue("orderDate") as string;
            return <div className="text-muted-foreground">{v}</div>;
        },
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
        header: ({ column }) => <SortableHeader column={column}>Start Date</SortableHeader>,
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => <SortableHeader column={column}>End Date</SortableHeader>,
    },
    {
        accessorKey: "gpus",
        header: ({ column }) => <SortableHeader column={column}>GPUs</SortableHeader>,
    },
    {
        accessorKey: "pricePerGpu",
        header: ({ column }) => <SortableHeader column={column}>$/GPU/day</SortableHeader>,
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => <SortableHeader column={column}>Total</SortableHeader>,
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
