import { TOrderDB, TOrderFrontend } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate().toString().padStart(2, "0")}/${d.getFullYear().toString().slice(-2)} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
}

export function formatShortDate(date: Date | string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        year: "2-digit",
    }).format(new Date(date));
}

export function transformDBOrderToFrontend(order: TOrderDB): TOrderFrontend {
    return {
        id: order.id,
        orderDate: formatDate(order.order_date),
        side: order.side,
        type: order.type,
        startDate: formatShortDate(order.start_date),
        startTime: order.start_time.toString(),
        endDate: formatShortDate(order.end_date),
        gpus: order.gpus.toString(),
        pricePerGpu: order.price_per_gpu.toString(),
        totalPrice: order.total_price.toString(),
        status: order.status,
    };
}
