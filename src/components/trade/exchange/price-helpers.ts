// Claude helped me a lot with this file. Just using it as a single source
// of truth for the mock price generation logic. This is simpler/cheaper
// than creating a large table of prices for every date range possibility
// in our Vercel Postgres database.

import { DateRange } from "react-day-picker";

export const BEST_PRICE_HOURS = [2, 3, 16, 17, 23];

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

const generateHigherPrice = (from: Date, to: Date, quantity: number): number => {
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

export const getPricesWithStartDate = (startDate: Date, quantity: number | undefined): Record<string, number> => {
    if (quantity === undefined) return {};
    const prices: Record<string, number> = {};
    const endOfYear = new Date(2024, 11, 31);
    let currentDate = startDate;

    while (currentDate <= endOfYear) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = generatePriceForRange(startDate, currentDate, quantity);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getPricesWithDateRange = (range: DateRange, quantity: number | undefined): Record<string, number> => {
    if (quantity === undefined) return {};
    const prices: Record<string, number> = {};
    if (!range.from || !range.to) return prices;

    let currentDate = new Date(2024, 10, 19);
    while (currentDate < range.from) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = generatePriceForRange(currentDate, range.to, quantity);

        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    currentDate = new Date(range.from);
    const endOfYear = new Date(2024, 11, 31);
    while (currentDate <= endOfYear) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] = generatePriceForRange(range.from, currentDate, quantity);

        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getBestPrice = (startDate: Date, endDate: Date, quantity: number | undefined): number => {
    if (quantity === undefined) return 0;
    return generatePriceForRange(startDate, endDate, quantity);
};

export const getHigherPrice = (startDate: Date, endDate: Date, quantity: number | undefined): number => {
    if (quantity === undefined) return 0;
    return generateHigherPrice(startDate, endDate, quantity);
};
