import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TOrder } from "@/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatTime } from "../exchange/utils";

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
        cell: ({ row }) => {
            const v = row.getValue("side") as TOrder["side"];
            return <div className="capitalize">{v}</div>;
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const v = row.getValue("type") as TOrder["type"];
            return <div className="capitalize">{v}</div>;
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => <SortableHeader column={column}>Start Date</SortableHeader>,
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => <SortableHeader column={column}>Start Time</SortableHeader>,
        cell: ({ row }) => {
            const v = row.getValue("startTime") as TOrder["startTime"];
            return formatTime(v);
        },
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
        cell: ({ row }) => {
            const v = row.getValue("pricePerGpu") as string;
            return formatCurrency(+v);
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => <SortableHeader column={column}>Total</SortableHeader>,
        cell: ({ row }) => {
            const v = row.getValue("totalPrice") as string;
            return formatCurrency(+v);
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const v = row.getValue("status") as TOrder["status"];
            const color = v === "filled" ? "text-green-600" : v === "pending" ? "text-yellow-600" : "text-red-600";
            return <div className={color + " text-right capitalize"}>{v}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row: { original } }) => {
            return original.status === "pending" ? (
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
