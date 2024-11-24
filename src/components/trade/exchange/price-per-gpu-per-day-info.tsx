import { TOrderFormData } from "@/types";
import { formatCurrency } from "./utils";

export default function PricePerGPUPerDayInfo({
    formData,
}: {
    formData: TOrderFormData;
}) {
    const { gpu_count, start_end_hour, date_range, price_per_gpu } = formData;
    const hasAllData =
        !!start_end_hour && date_range?.from && date_range?.to && !!gpu_count;

    return (
        <div className="flex justify-between text-sm">
            <div className="font-semibold uppercase">$/GPU/Day</div>
            {hasAllData ? (
                <div>{formatCurrency(price_per_gpu)}</div>
            ) : (
                <div className="text-muted-foreground">---</div>
            )}
        </div>
    );
}
