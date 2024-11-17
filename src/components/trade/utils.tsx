import { OrderFormData, OrderType } from "./types";

export const CURRENT_MARKET_PRICE = 32.98;
export const AVAILABLE_GPUS = 15000;
export const USED_GPUS = 2042;

export const calculateTotal = (data: OrderFormData, orderType: OrderType): number => {
    const quantity = parseFloat(data.quantity) || 0;
    const price = orderType === "market" ? CURRENT_MARKET_PRICE : parseFloat(data.price) || 0;
    const days =
        data.dateRange?.from && data.dateRange?.to
            ? Math.ceil((data.dateRange.to.getTime() - data.dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
            : 0;

    return quantity * price * days;
};

export const validateFormData = (data: OrderFormData, orderType: OrderType): boolean => {
    const quantity = parseFloat(data.quantity);
    if (!quantity || quantity <= 0 || quantity > AVAILABLE_GPUS - USED_GPUS) return false;

    if (orderType === "limit") {
        const price = parseFloat(data.price);
        if (!price || price <= 0) return false;
    }

    if (!data.dateRange?.from || !data.dateRange?.to) return false;

    const days = Math.ceil((data.dateRange.to.getTime() - data.dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 1) return false;

    const flexibility = parseInt(data.datesFlexibility);
    if (isNaN(flexibility) || flexibility < 0) return false;

    return true;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};
