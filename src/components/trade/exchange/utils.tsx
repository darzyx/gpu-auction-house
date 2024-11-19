import { OrderFormData, OrderType } from "./types";

export const CURRENT_MARKET_PRICE = 32.98;
export const AVAILABLE_GPUS = 15000;
export const USED_GPUS = 2042;
const TIME_PRICE_MULTIPLIERS: Record<string, number> = {
    "00": 0.8, // 12 AM - cheaper
    "01": 0.8,
    "02": 0.7, // Even cheaper late night
    "03": 0.7,
    "04": 0.7,
    "05": 0.8,
    "06": 0.9,
    "07": 1.0, // Normal price during day
    "08": 1.1, // Peak morning
    "09": 1.2,
    "10": 1.1,
    "11": 1.0,
    "12": 1.0,
    "13": 1.1, // Peak afternoon
    "14": 1.2,
    "15": 1.1,
    "16": 1.0,
    "17": 1.0,
    "18": 1.1,
    "19": 1.0,
    "20": 0.9,
    "21": 0.9,
    "22": 0.8,
    "23": 0.8,
};

export const getDayTimePrice = (basePrice: number, hour: string): number => {
    return basePrice * (TIME_PRICE_MULTIPLIERS[hour] || 1);
};

export const calculateTotal = (data: OrderFormData, orderType: OrderType): number => {
    const quantity = parseFloat(data.quantity) || 0;
    const basePrice = orderType === "market" ? CURRENT_MARKET_PRICE : parseFloat(data.price) || 0;

    const days =
        data.days?.from && data.days?.to
            ? Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24))
            : 0;

    if (!data.start_time || !data.end_time) {
        return quantity * basePrice * days;
    }

    // Use higher of the two prices
    const startPrice = getDayTimePrice(basePrice, data.start_time);
    const endPrice = getDayTimePrice(basePrice, data.end_time);
    const effectivePrice = Math.max(startPrice, endPrice);

    return quantity * effectivePrice * days;
};

export const validateFormData = (data: OrderFormData, orderType: OrderType): boolean => {
    const quantity = parseFloat(data.quantity);
    if (!quantity || quantity <= 0 || quantity > AVAILABLE_GPUS - USED_GPUS) return false;

    if (orderType === "limit") {
        const price = parseFloat(data.price);
        if (!price || price <= 0) return false;
    }

    if (!data.days?.from || !data.days?.to) return false;

    const days = Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 1) return false;

    if (!data.start_time || !data.end_time) return false;

    return true;
};

export const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${String(displayHour)}:00 ${period}`;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};
