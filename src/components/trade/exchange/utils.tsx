// Claude helped me a lot with this file. Using much of it as a single source
// of truth for the mock price generation logic. This is simpler/cheaper
// than creating a large table of prices for every date range possibility
// in our Vercel Postgres database.

import { DateRange } from "react-day-picker";

import { OrderFormData, OrderType } from "./types";

export const AVAILABLE_GPUS = 15000;
export const USED_GPUS = 2042;
export const LOWEST_PRICE_HOURS = [2, 3, 16, 17, 23];
export const HIGHEST_PRICE_HOURS = [4, 5, 18, 19];

const generateDeterministicCents = (date1: Date, date2: Date, quantity: number): number => {
    const seed = (date1.getDate() * date2.getMonth() + date2.getDate() * date1.getMonth()) * quantity;
    return seed % 100;
};

const generatePriceForRange = (from: Date, to: Date, quantity: number): number => {
    if (quantity === undefined) return 0;
    // Include quantity in the seed to vary prices based on block size
    const seed = (from.getDate() * to.getMonth() + to.getDate() * from.getMonth() + quantity) % 25;
    const dollars = 35 + seed;
    const cents = generateDeterministicCents(from, to, quantity);
    return Number(`${dollars}.${cents.toString().padStart(2, "0")}`);
};

const generateMediumPrice = (from: Date, to: Date, quantity: number): number => {
    const basePrice = generatePriceForRange(from, to, quantity);

    const increaseSeed = (from.getHours() * to.getDate() + to.getHours() * from.getDate() + quantity) % 2000;

    // Map the seed to a range between 0.05 and 0.50 (5% to 50%)
    const percentageIncrease = 0.05 + (increaseSeed / 2000) * 0.45;
    const increasedPrice = basePrice * (1 + percentageIncrease);
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const baseDollars = Math.floor(basePrice);
    const baseCents = Math.round((basePrice - baseDollars) * 100);
    const increasedDollars = Math.floor(increasedPrice);

    // Make sure cents are higher if we're in the same dollar amount
    if (increasedDollars === baseDollars) {
        // Generate cents that are guaranteed higher than base cents
        const additionalCents = (generateDeterministicCents(from, newCentsSeed, quantity) % (99 - baseCents)) + 1;
        const newCents = baseCents + additionalCents;
        return Number(`${increasedDollars}.${newCents.toString().padStart(2, "0")}`);
    }

    // If we're in a higher dollar amount, we can use any cents
    const newCents = generateDeterministicCents(from, newCentsSeed, quantity);
    return Number(`${increasedDollars}.${newCents.toString().padStart(2, "0")}`);
};

const generateHighestPrice = (from: Date, to: Date, quantity: number): number => {
    // Start with the base price
    const basePrice = generatePriceForRange(from, to, quantity);

    // Fixed 65% increase
    const increasedPrice = basePrice * 1.65;

    // Generate deterministic cents
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const newCents = generateDeterministicCents(from, newCentsSeed, quantity);

    // Combine dollars with deterministic cents
    const dollars = Math.floor(increasedPrice);
    return Number(`${dollars}.${newCents.toString().padStart(2, "0")}`);
};

export const getPricesWithStartDate = (
    startDate: Date,
    quantity: number | undefined,
    isBuy: boolean
): Record<string, number> => {
    if (quantity === undefined) return {};
    const prices: Record<string, number> = {};
    const endOfYear = new Date(2024, 11, 31);
    let currentDate = startDate;

    while (currentDate <= endOfYear) {
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
    quantity: number | undefined,
    isBuy: boolean
): Record<string, number> => {
    if (quantity === undefined) return {};
    const prices: Record<string, number> = {};
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
    const endOfYear = new Date(2024, 11, 31);
    while (currentDate <= endOfYear) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = isBuy
            ? generatePriceForRange(range.from, currentDate, quantity)
            : generateHighestPrice(range.from, currentDate, quantity);

        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getLowestPrice = (startDate: Date, endDate: Date, quantity: number | undefined): number => {
    if (quantity === undefined) return 0;
    return generatePriceForRange(startDate, endDate, quantity);
};

export const getMediumPrice = (startDate: Date, endDate: Date, quantity: number | undefined): number => {
    if (quantity === undefined) return 0;
    return generateMediumPrice(startDate, endDate, quantity);
};

export const getHighestPrice = (startDate: Date, endDate: Date, quantity: number | undefined): number => {
    if (quantity === undefined) return 0;
    return generateHighestPrice(startDate, endDate, quantity);
};

export const getPriceForHour = (hour: number, fromDate: Date, toDate: Date, quantity: number | undefined): number => {
    // Set the specific hours on the dates
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

export const calculateTotal = (data: OrderFormData, orderType: OrderType): number => {
    const quantity = data.quantity;
    if (!quantity) return 0;

    if (!data.days?.from || !data.days?.to) return 0;

    const days = Math.ceil((data.days.to.getTime() - data.days.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    if (orderType === "limit") {
        return quantity * (data.price || 0) * days;
    }

    if (!data.start_time || !data.end_time) return 0;

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

export const initFormData: OrderFormData = {
    quantity: undefined,
    price: undefined,
    days: undefined,
    start_time: undefined,
    end_time: undefined,
};
