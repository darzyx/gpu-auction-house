import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrderType, TradeType } from "./types";
import { formatCurrency, formatTime } from "./utils";

type OrderData = {
    tradeType: TradeType;
    orderType: OrderType;
    quantity: number | undefined;
    price?: number | undefined;
    days: DateRange | undefined;
    start_time?: string;
    total: string;
};

type ConfirmProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderData: OrderData;
};

const DetailRow = ({ label, value }: { label: string; value: string | JSX.Element }) => (
    <div className="flex justify-between items-center gap-4">
        <span className="font-georgia leading-none">{label}</span>
        <span className="text-sm leading-none">{value}</span>
    </div>
);

export default function Confirm({ isOpen, onClose, onConfirm, orderData }: ConfirmProps) {
    const { tradeType, orderType, quantity, price, days, start_time, total } = orderData;
    const isBuy = tradeType === "buy";
    const isMarket = orderType === "market";

    const confirmButtonClasses = isBuy
        ? "flex-1 bg-green-600 hover:bg-green-600"
        : "flex-1 bg-red-600 hover:bg-red-600";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] sm:max-w-[400px] rounded-md space-y-4">
                <DialogHeader>
                    <DialogTitle className="font-georgia text-lg font-normal">
                        Confirm {tradeType === "buy" ? "Purchase" : "Sale"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <DetailRow
                        label="Type"
                        value={`${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order`}
                    />
                    <DetailRow label="Quantity" value={`${quantity} GPUs`} />
                    {!isMarket && price && (
                        <DetailRow
                            label={`${isBuy ? "Ceiling" : "Floor"} price`}
                            value={formatCurrency(price) + "/GPU/day"}
                        />
                    )}
                    {days?.from && days?.to && (
                        <DetailRow
                            label="Period"
                            value={`${format(days.from, "M/d/yy")} - ${format(days.to, "M/d/yy")}`}
                        />
                    )}
                    {start_time && <DetailRow label="Start/End Time" value={formatTime(parseInt(start_time))} />}
                    <DetailRow label="Total" value={total} />
                </div>
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
