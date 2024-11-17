import { AVAILABLE_GPUS, CURRENT_MARKET_PRICE, USED_GPUS, formatCurrency } from "./utils";

export default function MarketInfo() {
    return (
        <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-medium">{formatCurrency(CURRENT_MARKET_PRICE)}/GPU/day</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Available GPUs:</span>
                <span className="font-medium">
                    {AVAILABLE_GPUS - USED_GPUS}/{AVAILABLE_GPUS}
                </span>
            </div>
        </div>
    );
}
