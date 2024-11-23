import { TOrder, TOrderForSubmit } from "@/types";
import { QueryResult, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
    side: z.enum(["buy", "sell"]),
    method: z.enum(["market", "limit"]),
    status: z.enum(["filled", "pending", "canceled"]),
    gpu_count: z.number().positive(),
    price_per_gpu: z.number().positive(),
    total_price: z.number().positive(),
    start_date: z.string().datetime({ message: "Invalid ISO date string" }),
    end_date: z.string().datetime({ message: "Invalid ISO date string" }),
    start_end_hour: z.number().min(0).max(23),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validationResult = orderSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Invalid request data", details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const orderData: TOrderForSubmit = validationResult.data;

        if (orderData.start_date > orderData.end_date) {
            return NextResponse.json({ error: "Start date must be before or equal to end date" }, { status: 400 });
        }

        const result: QueryResult<TOrder> = await sql`
            INSERT INTO new_orders (
                side,
                method,
                status,
                gpu_count,
                price_per_gpu,
                total_price,
                start_date,
                end_date,
                start_end_hour
            ) VALUES (
                ${orderData.side},
                ${orderData.method},
                ${orderData.status},
                ${orderData.gpu_count},
                ${orderData.price_per_gpu},
                ${orderData.total_price},
                ${orderData.start_date},
                ${orderData.end_date},
                ${orderData.start_end_hour}
            )
            RETURNING *;
        `;

        const response: TOrder = result.rows[0];

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}

export const runtime = "edge";
