import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

function formatDate(date: Date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate().toString().padStart(2, "0")}/${d.getFullYear().toString().slice(-2)} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
}

function formatShortDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        year: "2-digit",
    }).format(new Date(date));
}

export async function GET() {
    try {
        const result = await sql`
            SELECT 
                id,
                order_date,
                side::text,
                type::text,
                start_date,
                start_time,
                end_date,
                gpus,
                price_per_gpu,
                total_price,
                status::text
            FROM orders
            ORDER BY order_date DESC;
        `;

        const ordersData = result.rows.map((order) => ({
            id: order.id,
            orderDate: formatDate(order.order_date),
            side: order.side,
            type: order.type,
            startDate: formatShortDate(order.start_date),
            startTime: order.start_time,
            endDate: formatShortDate(order.end_date),
            gpus: order.gpus,
            pricePerGpu: order.price_per_gpu,
            totalPrice: order.total_price,
            status: order.status,
        }));

        return NextResponse.json(ordersData);
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
