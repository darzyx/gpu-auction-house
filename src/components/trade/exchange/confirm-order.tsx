import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TOrderFormData } from "@/types";
import { formatCurrency, formatTime, getNumerOfDaysSelected } from "./utils";

const DetailRow = ({
    label,
    value,
    noSeparator = false,
}: {
    label: string;
    value: string | JSX.Element;
    noSeparator?: boolean;
}) => (
    <>
        <div className="flex justify-between items-center gap-4">
            <span className="font-georgia leading-none text-sm">{label}</span>
            <span className="text-sm leading-none">{value}</span>
        </div>
        {!noSeparator && <Separator />}
    </>
);

export default function ConfirmOrder({
    formData,
    isOpen,
    onClose,
    onConfirm,
}: {
    formData: TOrderFormData;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    const { side, method, gpu_count, price_per_gpu, date_range, start_end_hour, total_price } = formData;

    const confirmButtonClasses =
        side === "buy" ? "flex-1 bg-green-600 hover:bg-green-600" : "flex-1 bg-red-600 hover:bg-red-600";

    const getValueForPricePerGPUPerDay = () => {
        if (!date_range?.from || !date_range?.to || !start_end_hour || !gpu_count) {
            return "---";
        } else {
            return formatCurrency(price_per_gpu);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] sm:max-w-[400px] rounded-md space-y-4">
                <DialogHeader>
                    <DialogTitle className="font-georgia text-lg font-normal">
                        Confirm {method === "limit" ? "Order" : side === "buy" ? "Purchase" : "Sale"}
                    </DialogTitle>
                    <DialogDescription>Review your order details</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    {method === "limit" && <DetailRow label="Side" value={side === "buy" ? "Buy" : "Sell"} />}
                    <DetailRow label="Method" value={method === "limit" ? "Limit Order" : "Market Order"} />
                    <DetailRow label="GPU Count" value={`${gpu_count} GPUs`} />
                    {method === "limit" && price_per_gpu && (
                        <DetailRow
                            label={`${side === "buy" ? "Ceiling" : "Floor"} price`}
                            value={formatCurrency(price_per_gpu) + "/GPU/day"}
                        />
                    )}
                    {date_range?.from && date_range?.to && (
                        <DetailRow
                            label="Period"
                            value={`${format(date_range.from, "M/d/yy")} - ${format(date_range.to, "M/d/yy")}`}
                        />
                    )}
                    {date_range && <DetailRow label="Days" value={getNumerOfDaysSelected(date_range).toString()} />}
                    {start_end_hour && <DetailRow label="Start/End Time" value={formatTime(start_end_hour)} />}
                    <DetailRow label="$/GPU/Day" value={getValueForPricePerGPUPerDay()} />
                    {total_price && (
                        <DetailRow label="Total" value={formatCurrency(total_price.toString())} noSeparator />
                    )}
                </div>
                {method === "limit" && (
                    <div className="text-sm bg-muted text-muted-foreground rounded-md p-4 text-center">
                        This is a{" "}
                        <Link href="/trade" className="inline text-sky-600 hover:underline underline-offset-2">
                            limit order
                        </Link>
                        . You haven&apos;t actually {side === "buy" ? "bought" : "sold"} anything until your order gets
                        filled.
                    </div>
                )}
                <div className="flex gap-4">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} className={confirmButtonClasses}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
