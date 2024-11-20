import { DateRange } from "react-day-picker";
import { OrderFormData, OrderType } from "./types";

export const TOTAL_GPUS = 3200;
export const AVAILABLE_GPUS = 2295;
export const USER_GPUS = 512;
export const LOWEST_PRICE_HOURS = [2, 3, 16, 17, 23];
export const HIGHEST_PRICE_HOURS = [4, 5, 18, 19];
export const UNAVAILABLE_HOURS = [7, 21, 22];

const generateDeterministicCents = (date1: Date, date2: Date, quantity: string): number => {
    const seed = (date1.getDate() * date2.getMonth() + date2.getDate() * date1.getMonth()) * parseInt(quantity);
    return seed % 100;
};

const generatePriceForRange = (from: Date, to: Date, quantity: string): string => {
    if (!quantity) return "0";
    const parsedQuantity = parseInt(quantity);
    const seed = (from.getDate() * to.getMonth() + to.getDate() * from.getMonth() + parsedQuantity) % 25;
    const dollars = 35 + seed;
    const cents = generateDeterministicCents(from, to, quantity);
    return `${dollars}.${cents.toString().padStart(2, "0")}`;
};

const generateMediumPrice = (from: Date, to: Date, quantity: string): string => {
    const basePrice = generatePriceForRange(from, to, quantity);
    const parsedQuantity = parseInt(quantity);
    const increaseSeed = (from.getHours() * to.getDate() + to.getHours() * from.getDate() + parsedQuantity) % 2000;
    const percentageIncrease = 0.05 + (increaseSeed / 2000) * 0.45;
    const increasedPrice = +basePrice * (1 + percentageIncrease);
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const baseDollars = Math.floor(+basePrice);
    const baseCents = Math.round((+basePrice - baseDollars) * 100);
    const increasedDollars = Math.floor(increasedPrice);

    if (increasedDollars === baseDollars) {
        const additionalCents = (generateDeterministicCents(from, newCentsSeed, quantity) % (99 - baseCents)) + 1;
        const newCents = baseCents + additionalCents;
        return `${increasedDollars}.${newCents.toString().padStart(2, "0")}`;
    }

    const newCents = generateDeterministicCents(from, newCentsSeed, quantity);
    return `${increasedDollars}.${newCents.toString().padStart(2, "0")}`;
};

const generateHighestPrice = (from: Date, to: Date, quantity: string): string => {
    const basePrice = generatePriceForRange(from, to, quantity);
    const increasedPrice = +basePrice * 1.65;
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const newCents = generateDeterministicCents(from, newCentsSeed, quantity);
    const dollars = Math.floor(increasedPrice);
    return `${dollars}.${newCents.toString().padStart(2, "0")}`;
};

export const getPricesWithStartDate = (
    startDate: Date,
    quantity: string | undefined,
    isBuy: boolean
): Record<string, string> => {
    if (!quantity) return {};
    const prices: Record<string, string> = {};
    const endOfJanuary = new Date(2025, 0, 31);
    let currentDate = startDate;

    while (currentDate <= endOfJanuary) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = isBuy
            ? generatePriceForRange(startDate, currentDate, quantity)
            : generateHighestPrice(startDate, currentDate, quantity);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getPricesWithDateRange = (
    range: DateRange,
    quantity: string | undefined,
    isBuy: boolean
): Record<string, string> => {
    if (!quantity) return {};
    const prices: Record<string, string> = {};
    if (!range.from || !range.to) return prices;

    let currentDate = new Date(2024, 10, 19);
    while (currentDate < range.from) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = isBuy
            ? generatePriceForRange(currentDate, range.to, quantity)
            : generateHighestPrice(currentDate, range.to, quantity);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    currentDate = new Date(range.from);
    const endOfJanuary = new Date(2025, 0, 31);
    while (currentDate <= endOfJanuary) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = isBuy
            ? generatePriceForRange(range.from, currentDate, quantity)
            : generateHighestPrice(range.from, currentDate, quantity);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getLowestPrice = (startDate: Date, endDate: Date, quantity: string | undefined): string => {
    if (!quantity) return "0";
    return generatePriceForRange(startDate, endDate, quantity);
};

export const getMediumPrice = (startDate: Date, endDate: Date, quantity: string | undefined): string => {
    if (!quantity) return "0";
    return generateMediumPrice(startDate, endDate, quantity);
};

export const getHighestPrice = (startDate: Date, endDate: Date, quantity: string | undefined): string => {
    if (!quantity) return "0";
    return generateHighestPrice(startDate, endDate, quantity);
};

export type PriceInfo = {
    price: string;
    priceType: "highest" | "lowest" | "normal" | "unavailable";
};

export const getPriceForHour = (hour: number, fromDate: Date, toDate: Date, quantity: string | undefined): string => {
    if (!quantity) return "0";

    const dateFrom = new Date(fromDate);
    const dateTo = new Date(toDate);
    dateFrom.setHours(hour);
    dateTo.setHours(hour);

    return LOWEST_PRICE_HOURS.includes(hour)
        ? getLowestPrice(dateFrom, dateTo, quantity)
        : HIGHEST_PRICE_HOURS.includes(hour)
        ? getHighestPrice(dateFrom, dateTo, quantity)
        : getMediumPrice(dateFrom, dateTo, quantity);
};

export const getPriceInfoForHour = (
    hour: number,
    fromDate: Date | undefined,
    toDate: Date | undefined,
    quantity: string | undefined
): PriceInfo => {
    if (fromDate && quantity && UNAVAILABLE_HOURS.includes(hour)) {
        return { price: "0", priceType: "unavailable" };
    }

    if (!fromDate || !quantity) {
        const defaultDate = new Date();
        defaultDate.setHours(hour);
        return {
            price: getMediumPrice(defaultDate, defaultDate, "1"),
            priceType: "normal",
        };
    }

    const effectiveToDate = toDate || fromDate;
    const price = getPriceForHour(hour, fromDate, effectiveToDate, quantity);

    let priceType: PriceInfo["priceType"] = "normal";
    if (HIGHEST_PRICE_HOURS.includes(hour)) {
        priceType = "highest";
    } else if (LOWEST_PRICE_HOURS.includes(hour)) {
        priceType = "lowest";
    }

    return { price, priceType };
};

export const calculateTotal = (data: OrderFormData, orderType: OrderType): string => {
    const quantity = parseInt(data.quantity || "0");
    if (!quantity) return "0";

    if (!data.days?.from || !data.days?.to) return "0";

    const days = Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return "0";

    if (orderType === "limit") {
        return (quantity * parseFloat(data.price || "0") * days).toString();
    }

    if (!data.start_time) return "0";

    const startHour = parseInt(data.start_time);
    const effectivePrice = getPriceForHour(startHour, data.days.from, data.days.to, data.quantity);

    return (quantity * +effectivePrice * days).toString();
};

export const validateFormData = (data: OrderFormData, orderType: OrderType, isBuy: boolean): boolean => {
    const quantity = parseInt(data.quantity || "0");
    if (!quantity || quantity <= 0 || (isBuy && quantity > AVAILABLE_GPUS) || (!isBuy && quantity > USER_GPUS)) {
        return false;
    }

    if (orderType === "limit") {
        const price = parseFloat(data.price || "0");
        if (!price || price <= 0) return false;
    }

    if (!data.days?.from || !data.days?.to) return false;

    const days = Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 1) return false;

    if (!data.start_time) return false;

    return true;
};

export const formatTime = (hour: string) => {
    const period = +hour >= 12 ? "PM" : "AM";
    const displayHour = +hour === 0 ? 12 : +hour > 12 ? +hour - 12 : hour;
    return `${String(displayHour)}:00 ${period}`;
};

export const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(+amount);
};

export const initFormData: OrderFormData = {
    quantity: undefined,
    price: undefined,
    days: undefined,
    start_time: undefined,
};

export const getNumerOfDaysSelected = (days: DateRange) => {
    if (!days?.from || !days?.to) return 0;
    return Math.round((days.to.getTime() - days.from.getTime()) / (1000 * 60 * 60 * 24));
};
