"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

type TradeType = "buy" | "sell";
type OrderType = "market" | "limit";

type OrderData = {
    tradeType: TradeType;
    orderType: OrderType;
    quantity: string;
    price?: string;
    dateRange: DateRange | undefined;
    days: string;
    total: string;
};

type ConfirmProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderData: OrderData;
};

export default function Confirm({ isOpen, onClose, onConfirm, orderData }: ConfirmProps) {
    const { tradeType, orderType, quantity, price, dateRange, days, total } = orderData;

    const isBuy = tradeType === "buy";
    const isMarket = orderType === "market";
    const accentColor = isBuy ? "text-green-600" : "text-red-600";

    const durationDays =
        dateRange?.from && dateRange?.to
            ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
            : 0;

    const DetailRow = ({ label, value }: { label: string; value: string | JSX.Element }) => (
        <>
            <div className="text-muted-foreground">{label}</div>
            <div className="font-medium">{value}</div>
        </>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={accentColor}>
                        Confirm {orderType.charAt(0).toUpperCase() + orderType.slice(1)}{" "}
                        {tradeType.charAt(0).toUpperCase() + tradeType.slice(1)} Order
                    </DialogTitle>
                    <DialogDescription>Please review your order details before confirming</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <DetailRow label="Order Type:" value={orderType.toUpperCase()} />
                        <DetailRow label="Quantity:" value={`${quantity} GPUs`} />
                        <DetailRow label="Duration:" value={`${durationDays} days`} />
                        {!isMarket && (
                            <DetailRow label={`${isBuy ? "Maximum" : "Minimum"} Price:`} value={`$${price}/GPU/day`} />
                        )}
                        <DetailRow
                            label="Date Range:"
                            value={
                                dateRange?.from && dateRange?.to ? (
                                    <>
                                        {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                                    </>
                                ) : (
                                    "Not specified"
                                )
                            }
                        />
                        {parseInt(days) > 0 && <DetailRow label="Days:" value={`±${days} days`} />}
                        <div className="col-span-2 pt-3 border-t">
                            <DetailRow label="Total Value:" value={total} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className={isBuy ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600"}
                    >
                        Confirm {tradeType.toUpperCase()}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
