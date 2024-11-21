import { QueryResult, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { formatDate, formatShortDate } from "@/lib/utils";
import { TOrderDB } from "@/types";

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

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const result: QueryResult<TOrderDB> = await sql`
            INSERT INTO orders (
                side, type, status, gpus, price_per_gpu, total_price,
                start_date, start_time, end_date
            )
            VALUES (
                ${data.side}::order_side,
                ${data.type}::order_type, 
                ${data.status}::order_status,
                ${data.gpus},
                ${data.price_per_gpu},
                ${data.total_price},
                ${data.start_date},
                ${data.start_time},
                ${data.end_date}
            )
            RETURNING id;
        `;

        return NextResponse.json({
            id: result.rows[0].id,
            order_date: result.rows[0].order_date,
            ...data,
        });
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
