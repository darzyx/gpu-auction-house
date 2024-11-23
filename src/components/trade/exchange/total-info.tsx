import { TOrderFormData } from "@/types";
import { formatCurrency } from "./utils";

export default function TotalInfo({ formData: { total_price } }: { formData: TOrderFormData }) {
    return (
        <div className="flex justify-between text-sm">
            <div className="font-semibold uppercase">Total</div>
            {total_price ? <div>{formatCurrency(total_price)}</div> : <div className="text-muted-foreground">---</div>}
        </div>
    );
}
