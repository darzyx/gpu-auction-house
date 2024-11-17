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

export default function Confirm({ isOpen, onClose, onConfirm, orderData }: ConfirmProps) {
    const { tradeType, orderType, quantity, price, days, total } = orderData;
    const isBuy = tradeType === "buy";
    const isMarket = orderType === "market";

    const getTotalLabel = () => {
        if (isMarket) {
            return "Total amount";
        }
        return isBuy ? "Price ceiling" : "Price floor";
    };

    const DetailRow = ({ label, value }: { label: string; value: string | JSX.Element }) => (
        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className={`text-lg font-semibold ${isBuy ? "text-green-600" : "text-red-600"}`}>
                        Confirm {tradeType === "buy" ? "Purchase" : "Sale"}
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6 py-4">
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
                            label="Period"
                            value={`${format(days.from, "MMM d")} - ${format(days.to, "MMM d, yyyy")}`}
                        />
                    )}
                    <DetailRow label={getTotalLabel()} value={total} />
                </div>
                <div className="flex border-t p-4 gap-2">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className={`flex-1 ${
                            isBuy ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
