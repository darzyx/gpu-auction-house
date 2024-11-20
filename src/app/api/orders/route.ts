import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the raw request body
        console.log("API Debug - Received body:", body);

        const { side, type, gpus, pricePerGpu, totalPrice, startDate, endDate, startHour } = body;

        // Log the extracted values
        console.log("API Debug - Extracted values:", {
            side,
            type,
            gpus,
            pricePerGpu,
            totalPrice,
            startDate,
            endDate,
            startHour,
            startHourType: typeof startHour,
        });

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
        console.error("API Error Details:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to create order",
                details: JSON.stringify(error),
            },
            { status: 500 }
        );
    }
}
