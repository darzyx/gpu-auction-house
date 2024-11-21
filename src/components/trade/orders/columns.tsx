import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { TOrderFrontend } from "@/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatTime } from "../exchange/utils";

const SortableHeader = ({
    column,
    children,
}: {
    column: Column<TOrderFrontend, unknown>;
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

const ordersColumns: ColumnDef<TOrderFrontend>[] = [
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
            const v = row.getValue("side") as TOrderFrontend["side"];
            return <div className="capitalize">{v}</div>;
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const v = row.getValue("type") as TOrderFrontend["type"];
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
            const v = row.getValue("startTime") as TOrderFrontend["startTime"];
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
            return formatCurrency(v);
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => <SortableHeader column={column}>Total</SortableHeader>,
        cell: ({ row }) => {
            const v = row.getValue("totalPrice") as string;
            return formatCurrency(v);
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-right">Status</div>,
        cell: ({ row }) => {
            const v = row.getValue("status") as TOrderFrontend["status"];
            const color = v === "filled" ? "text-green-600" : v === "pending" ? "text-yellow-600" : "text-red-600";
            return <div className={color + " text-right capitalize"}>{v}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row: { original }, table }) => {
            const handleCancel = async () => {
                try {
                    const response = await fetch(`/api/orders/${original.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to cancel order");
                    }

                    const onCancel = (table.options.meta as { onCancel?: (id: number) => void })?.onCancel;
                    if (onCancel) onCancel(original.id);

                    toast.success("Order canceled");
                } catch (error) {
                    console.error("Error canceling order:", error);
                    toast.error("Failed to cancel order");
                }
            };

            return original.status === "pending" ? (
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            ) : null;
        },
    },
];

export default ordersColumns;
