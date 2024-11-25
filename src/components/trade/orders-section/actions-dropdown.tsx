"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Pencil, Receipt, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cancelOrder } from "@/db/actions";

export default function ActionsDropdown({
    original,
}: {
    original: { id: string; status: string };
}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => cancelOrder(original.id),
        onSuccess: () => {
            toast.success("Order canceled");
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: Error) => {
            console.error("Error canceling order:", error);
            toast.error(error.message || "Failed to cancel order");
        },
    });

    const canCancel = original.status === "pending";

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-transparent"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => mutation.mutate()}
                        disabled={!canCancel || mutation.isPending}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 gap-2"
                    >
                        <XIcon className="h-4 w-4" />
                        {mutation.isPending ? "Canceling..." : "Cancel"}
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled className="gap-2">
                        <Receipt className="h-4 w-4" />
                        Receipt
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
