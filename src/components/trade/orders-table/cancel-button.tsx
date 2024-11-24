import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CancelButton({
    original,
    table,
}: {
    original: { id: string; status: string };
    table: { options: { meta?: { onOrderCanceled?: (id: string) => void } } };
}) {
    const handleCancel = async () => {
        try {
            const response = await fetch(`/api/orders/${original.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof data.error === "string"
                        ? data.error
                        : "Failed to cancel order"
                );
            }

            const onOrderCanceled = (
                table.options.meta as {
                    onOrderCanceled?: (id: string) => void;
                }
            )?.onOrderCanceled;

            if (onOrderCanceled) onOrderCanceled(original.id);

            toast.success("Order canceled");
        } catch (error) {
            console.error("Error canceling order:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to cancel order"
            );
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
}
