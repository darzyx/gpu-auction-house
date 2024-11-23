import { TOrderFormData } from "@/types";
import { formatCurrency, getPriceForHour } from "./utils";

export default function PricePerGPUPerDayInfo({ formData }: { formData: TOrderFormData }) {
    const { gpu_count, start_end_hour, date_range } = formData;
    const hasAllData = !!start_end_hour && date_range?.from && date_range?.to && !!gpu_count;

    return (
        <div className="flex justify-between text-sm">
            <div className="font-semibold uppercase">$/GPU/Day</div>
            {hasAllData ? (
                <div>{formatCurrency(getPriceForHour(formData))}</div>
            ) : (
                <div className="text-muted-foreground">---</div>
            )}
        </div>
    );
}
