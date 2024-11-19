import { BEST_PRICE_HOURS, getBestPrice, getHigherPrice } from "./price-helpers";
import { OrderFormData, OrderType } from "./types";

export const AVAILABLE_GPUS = 15000;
export const USED_GPUS = 2042;

export const getPriceForHour = (hour: number, fromDate: Date, toDate: Date, quantity: number | undefined): number => {
    // Set the specific hours on the dates
    const dateFrom = new Date(fromDate);
    const dateTo = new Date(toDate);
    dateFrom.setHours(hour);
    dateTo.setHours(hour);

    return BEST_PRICE_HOURS.includes(hour)
        ? getBestPrice(dateFrom, dateTo, quantity)
        : getHigherPrice(dateFrom, dateTo, quantity);
};

export const calculateTotal = (data: OrderFormData, orderType: OrderType): number => {
    const quantity = data.quantity;
    if (!quantity) return 0;

    if (!data.days?.from || !data.days?.to || !data.start_time || !data.end_time) {
        return 0;
    }

    const days = Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    // Calculate prices for start and end times
    const startHour = parseInt(data.start_time);
    const endHour = parseInt(data.end_time);

    const startPrice = getPriceForHour(startHour, data.days.from, data.days.to, quantity);
    const endPrice = getPriceForHour(endHour, data.days.from, data.days.to, quantity);
    const effectivePrice = Math.max(startPrice, endPrice);

    return quantity * effectivePrice * days;
};

export const validateFormData = (data: OrderFormData, orderType: OrderType): boolean => {
    const quantity = data.quantity;
    if (!quantity || quantity <= 0 || quantity > AVAILABLE_GPUS - USED_GPUS) return false;

    if (orderType === "limit") {
        const price = data.price;
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
