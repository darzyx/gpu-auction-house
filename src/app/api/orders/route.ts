import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { side, type, gpus, pricePerGpu, totalPrice, startDate, endDate, startHour } = body;

        const result = await sql`
            INSERT INTO orders_new (
                side,
                type,
                gpus,
                price_per_gpu,
                total_price,
                start_date,
                end_date,
                start_hour
            ) VALUES (
                ${side}::order_side_type,
                ${type}::order_type_type,
                ${gpus},
                ${pricePerGpu},
                ${totalPrice},
                ${startDate}::date,
                ${endDate}::date,
                ${startHour}
            ) RETURNING *;
        `;

        return NextResponse.json({
            message: "Order created successfully",
            order: result.rows[0],
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to create order",
                details: JSON.stringify(error),
            },
            { status: 500 }
        );
    }
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
                end_date,
                gpus,
                price_per_gpu,
                total_price,
                status::text
            FROM orders_new 
            ORDER BY order_date DESC;
        `;

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
