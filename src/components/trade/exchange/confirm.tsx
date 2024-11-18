import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

type TradeType = "buy" | "sell";
type OrderType = "market" | "limit";

type OrderData = {
    tradeType: TradeType;
    orderType: OrderType;
    quantity: string;
    price?: string;
    days: DateRange | undefined;
    total: string;
};

type ConfirmProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderData: OrderData;
};

const DetailRow = ({ label, value }: { label: string; value: string | JSX.Element }) => (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
        <span className="font-georgia leading-none">{label}</span>
        <span className="text-sm leading-none">{value}</span>
    </div>
);

export default function Confirm({ isOpen, onClose, onConfirm, orderData }: ConfirmProps) {
    const { tradeType, orderType, quantity, price, days, total } = orderData;
    const isBuy = tradeType === "buy";
    const isMarket = orderType === "market";

    const confirmButtonClasses = isBuy
        ? "flex-1 bg-green-600 hover:bg-green-700"
        : "flex-1 bg-red-600 hover:bg-red-700";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] sm:max-w-[400px]">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="font-georgia text-lg font-normal">
                        Confirm {tradeType === "buy" ? "Purchase" : "Sale"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <DetailRow
                        label="Type"
                        value={`${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order`}
                    />
                    <DetailRow label="Quantity" value={`${quantity} GPUs`} />
                    {!isMarket && (
                        <DetailRow label={`${isBuy ? "Ceiling" : "Floor"} price`} value={`$${price}/GPU/day`} />
                    )}
                    {days?.from && days?.to && (
                        <DetailRow
                            label="Days"
                            value={`${format(days.from, "MMM d")} - ${format(days.to, "MMM d, yyyy")}`}
                        />
                    )}
                    <DetailRow label="Total" value={total} />
                </div>
                <div className="flex border-t p-4 gap-2">
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
