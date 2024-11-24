import { TOrderFormData } from "@/types";
import { DateRange } from "react-day-picker";

export const TOTAL_GPUS = 3200;
export const AVAILABLE_GPUS = 2295;
export const USER_GPUS = 512;
export const LOWEST_PRICE_HOURS = [2, 3, 16, 17, 23];
export const HIGHEST_PRICE_HOURS = [4, 5, 18, 19];
export const UNAVAILABLE_HOURS = [7, 21, 22];

const generateDeterministicCents = (date1: Date, date2: Date, gpu_count: string): number => {
    const seed = (date1.getDate() * date2.getMonth() + date2.getDate() * date1.getMonth()) * parseInt(gpu_count);
    return seed % 100;
};

const generatePriceForRange = (from: Date, to: Date, gpu_count: string): string => {
    if (!gpu_count) return "0";
    const gpuCountInt = parseInt(gpu_count);
    const seed = (from.getDate() * to.getMonth() + to.getDate() * from.getMonth() + gpuCountInt) % 25;
    const dollars = 35 + seed;
    const cents = generateDeterministicCents(from, to, gpu_count);
    return `${dollars}.${cents.toString().padStart(2, "0")}`;
};

const generateMediumPrice = (from: Date, to: Date, gpu_count: string): string => {
    const basePrice = generatePriceForRange(from, to, gpu_count);
    const gpuCountInt = parseInt(gpu_count);
    const increaseSeed = (from.getHours() * to.getDate() + to.getHours() * from.getDate() + gpuCountInt) % 2000;
    const percentageIncrease = 0.05 + (increaseSeed / 2000) * 0.45;
    const increasedPrice = +basePrice * (1 + percentageIncrease);
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const baseDollars = Math.floor(+basePrice);
    const baseCents = Math.round((+basePrice - baseDollars) * 100);
    const increasedDollars = Math.floor(increasedPrice);

    if (increasedDollars === baseDollars) {
        const additionalCents = (generateDeterministicCents(from, newCentsSeed, gpu_count) % (99 - baseCents)) + 1;
        const newCents = baseCents + additionalCents;
        return `${increasedDollars}.${newCents.toString().padStart(2, "0")}`;
    }

    const newCents = generateDeterministicCents(from, newCentsSeed, gpu_count);
    return `${increasedDollars}.${newCents.toString().padStart(2, "0")}`;
};

const generateHighestPrice = (from: Date, to: Date, gpu_count: string): string => {
    const basePrice = generatePriceForRange(from, to, gpu_count);
    const increasedPrice = +basePrice * 1.65;
    const newCentsSeed = new Date(from.getTime() + to.getTime());
    const newCents = generateDeterministicCents(from, newCentsSeed, gpu_count);
    const dollars = Math.floor(increasedPrice);
    return `${dollars}.${newCents.toString().padStart(2, "0")}`;
};

export const getPricesWithStartDate = (formData: TOrderFormData): Record<string, string> => {
    if (!formData.gpu_count || !formData.date_range?.from) return {};
    const prices: Record<string, string> = {};
    const endOfJanuary = new Date(2025, 0, 31);

    let currentDate = formData.date_range?.from;

    while (currentDate <= endOfJanuary) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] =
            formData.side === "buy"
                ? generatePriceForRange(formData.date_range?.from, currentDate, formData.gpu_count)
                : generateHighestPrice(formData.date_range?.from, currentDate, formData.gpu_count);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getPricesWithDateRange = (formData: TOrderFormData): Record<string, string> => {
    if (!formData.gpu_count) return {};
    const prices: Record<string, string> = {};
    if (!formData.date_range?.from || !formData.date_range?.to) return prices;

    let currentDate = new Date(2024, 10, 19);
    while (currentDate < formData.date_range.from) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] =
            formData.side === "buy"
                ? generatePriceForRange(currentDate, formData.date_range?.to, formData.gpu_count)
                : generateHighestPrice(currentDate, formData.date_range?.to, formData.gpu_count);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    currentDate = new Date(formData.date_range?.from);
    const endOfJanuary = new Date(2025, 0, 31);
    while (currentDate <= endOfJanuary) {
        const dateKey = currentDate.toISOString().split("T")[0];
        prices[dateKey] =
            formData.side === "buy"
                ? generatePriceForRange(formData.date_range?.from, currentDate, formData.gpu_count)
                : generateHighestPrice(formData.date_range?.from, currentDate, formData.gpu_count);
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return prices;
};

export const getLowestPrice = (startDate: Date, endDate: Date, gpu_count: string): string => {
    if (!gpu_count) return "0";
    return generatePriceForRange(startDate, endDate, gpu_count);
};

export const getMediumPrice = (startDate: Date, endDate: Date, gpu_count: string | undefined): string => {
    if (!gpu_count) return "0";
    return generateMediumPrice(startDate, endDate, gpu_count);
};

export const getHighestPrice = (startDate: Date, endDate: Date, gpu_count: string): string => {
    if (!gpu_count) return "0";
    return generateHighestPrice(startDate, endDate, gpu_count);
};

export type PriceInfo = {
    price: string;
    priceType: "highest" | "lowest" | "normal" | "unavailable";
};

export const getPriceForHour = (data: TOrderFormData, startEndHour: string): string => {
    if (!data.gpu_count || !data.date_range?.from || !data.date_range?.to || typeof startEndHour !== "string") {
        return "0";
    }

    const startEndHourInt = parseInt(startEndHour);

    const dateFrom = new Date(data.date_range?.from);
    const dateTo = new Date(data.date_range?.to);
    dateFrom.setHours(startEndHourInt);
    dateTo.setHours(startEndHourInt);

    return LOWEST_PRICE_HOURS.includes(startEndHourInt)
        ? getLowestPrice(dateFrom, dateTo, data.gpu_count)
        : HIGHEST_PRICE_HOURS.includes(startEndHourInt)
        ? getHighestPrice(dateFrom, dateTo, data.gpu_count)
        : getMediumPrice(dateFrom, dateTo, data.gpu_count);
};

export const getDatePriceInfo = (formData: TOrderFormData, startEndHour: string): PriceInfo => {
    if (
        formData.date_range?.from &&
        formData.gpu_count &&
        typeof startEndHour === "string" &&
        UNAVAILABLE_HOURS.includes(parseInt(startEndHour || "0"))
    ) {
        return { price: "0", priceType: "unavailable" };
    }

    if (!formData.date_range?.from || !formData.gpu_count) {
        const defaultDate = new Date();
        defaultDate.setHours(parseInt(startEndHour || "0"));
        return {
            price: getMediumPrice(defaultDate, defaultDate, "1"),
            priceType: "normal",
        };
    }

    let priceType: PriceInfo["priceType"] = "normal";
    if (HIGHEST_PRICE_HOURS.includes(parseInt(startEndHour || "0"))) {
        priceType = "highest";
    } else if (LOWEST_PRICE_HOURS.includes(parseInt(startEndHour || "0"))) {
        priceType = "lowest";
    }

    return { price: getPriceForHour(formData, startEndHour), priceType };
};

export const calculateTotal = (data: TOrderFormData): number => {
    const gpuCountInt = parseInt(data.gpu_count || "0");

    if (!gpuCountInt) return 0;

    if (!data.date_range?.from || !data.date_range?.to) return 0;

    const days = Math.ceil((data.date_range.to.getTime() - data.date_range.from.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    if (data.method === "limit") {
        return gpuCountInt * parseFloat(data.price_per_gpu || "0") * days;
    }

    if (!data.start_end_hour) return 0;

    const price = +getPriceForHour(data, data.start_end_hour);

    return gpuCountInt * price * days;
};

export const validateFormData = (data: TOrderFormData): boolean => {
    const gpuCountInt = parseInt(data.gpu_count || "0");

    if (!data.side) return false;

    if (!data.method) return false;

    if (
        !gpuCountInt ||
        gpuCountInt <= 0 ||
        (data.side === "buy" && gpuCountInt > AVAILABLE_GPUS) ||
        (data.side === "sell" && gpuCountInt > USER_GPUS)
    ) {
        return false;
    }

    if (!data.price_per_gpu || parseFloat(data.price_per_gpu) <= 0) {
        return false;
    }

    if (!data.date_range?.from || !data.date_range?.to) return false;

    const numDays = Math.ceil((data.date_range.to.getTime() - data.date_range.from.getTime()) / (1000 * 60 * 60 * 24));
    if (numDays < 1) return false;

    if (!data.start_end_hour) return false;

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

export const initFormData: TOrderFormData = {
    side: "buy",
    method: "market",
    gpu_count: "",
    price_per_gpu: "",
    date_range: undefined,
    start_end_hour: "",
    total_price: 0,
};

export const getNumerOfDaysSelected = (days: DateRange) => {
    if (!days?.from || !days?.to) return 0;
    return Math.round((days.to.getTime() - days.from.getTime()) / (1000 * 60 * 60 * 24));
};
