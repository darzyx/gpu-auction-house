import { formatCurrency } from "./utils";

export default function TotalInfo({ total }: { total: number }) {
    return (
        <div className="flex justify-between text-sm">
            <div className="font-semibold uppercase">Total</div>
            <div>{formatCurrency(total)}</div>
        </div>
    );
}
