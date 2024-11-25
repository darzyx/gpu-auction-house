import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TOrder } from "@/db/schema";
import { formatDateForDisplay, formatShortDateForDisplay } from "@/lib/utils";
import { Column, ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatTime } from "../exchange/utils";
import CancelButton from "./cancel-button";

const SortableHeader = ({
    column,
    children,
}: {
    column: Column<TOrder, unknown>;
    children: React.ReactNode;
}) => {
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
        accessorKey: "created_at",
        header: ({ column }) => (
            <SortableHeader column={column}>Time Placed</SortableHeader>
        ),
        cell: ({ row }) => {
            const v = row.getValue("created_at") as TOrder["created_at"];
            return (
                <div className="text-muted-foreground">
                    {formatDateForDisplay(v)}
                </div>
            );
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
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => {
            const v = row.getValue("method") as TOrder["method"];
            return <div className="capitalize">{v}</div>;
        },
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => (
            <SortableHeader column={column}>Start</SortableHeader>
        ),
        cell: ({ row }) => {
            const v = row.getValue("start_date") as TOrder["start_date"];
            return formatShortDateForDisplay(v);
        },
    },
    {
        accessorKey: "start_end_hour",
        header: ({ column }) => (
            <SortableHeader column={column}>Hour</SortableHeader>
        ),
        cell: ({ row }) => {
            const v: TOrder["start_end_hour"] = row.getValue("start_end_hour");
            return formatTime(v.toString());
        },
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => (
            <SortableHeader column={column}>End</SortableHeader>
        ),
        cell: ({ row }) => {
            const v = row.getValue("end_date") as TOrder["end_date"];
            return formatShortDateForDisplay(v);
        },
    },
    {
        accessorKey: "gpu_count",
        header: ({ column }) => (
            <SortableHeader column={column}>GPUs</SortableHeader>
        ),
    },
    {
        accessorKey: "price_per_gpu",
        header: ({ column }) => (
            <SortableHeader column={column}>$/GPU/day</SortableHeader>
        ),
        cell: ({ row }) => {
            const v = row.getValue("price_per_gpu") as number;
            return formatCurrency(v.toString());
        },
    },
    {
        accessorKey: "total_price",
        header: ({ column }) => (
            <SortableHeader column={column}>Total</SortableHeader>
        ),
        cell: ({ row }) => {
            const v = row.getValue("total_price") as number;
            return formatCurrency(v.toString());
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const v = row.getValue("status") as TOrder["status"];
            const color =
                v === "filled"
                    ? "text-green-600"
                    : v === "pending"
                    ? "text-yellow-600"
                    : "text-red-600";
            return <div className={color + " text-right capitalize"}>{v}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row: { original }, table }) => (
            <CancelButton original={original} table={table} />
        ),
    },
];

export default ordersColumns;
