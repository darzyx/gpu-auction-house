import { OrderFormData } from "./types";
import { formatCurrency, getPriceForHour } from "./utils";

export default function PricePerGPUPerHrInfo({
    formData: { quantity, start_time, days },
}: {
    formData: OrderFormData;
}) {
    const startTime = start_time ? parseInt(start_time) : undefined;
    const fromDate = days?.from || undefined;
    const toDate = days?.to || undefined;
    const hasAllData = startTime !== undefined && fromDate !== undefined && toDate !== undefined && quantity;

    return (
        <div className="flex justify-between text-sm">
            <div className="font-semibold uppercase">$/GPU/Hour</div>
            <div>{hasAllData ? formatCurrency(getPriceForHour(startTime, fromDate, toDate, quantity)) : "---"}</div>
        </div>
    );
}
