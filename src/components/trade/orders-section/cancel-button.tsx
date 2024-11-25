"use client";

import { Button } from "@/components/ui/button";
import { cancelOrder } from "@/db/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CancelButton({
    original,
}: {
    original: { id: string; status: string };
}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => cancelOrder(original.id),
        onSuccess: () => {
            toast.success("Order canceled");
            // Invalidate and refetch orders after successful cancellation
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (error: Error) => {
            console.error("Error canceling order:", error);
            toast.error(error.message || "Failed to cancel order");
        },
    });

    return original.status === "pending" ? (
        <div className="flex justify-end">
            <Button
                variant="outline"
                size="sm"
                className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Canceling..." : "Cancel"}
            </Button>
        </div>
    ) : null;
}
