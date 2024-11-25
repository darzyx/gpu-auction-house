import { NextResponse } from "next/server";

import { db } from "@/db";
import { orders, orderSchema } from "@/db/schema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validationResult = orderSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request data",
                    details: validationResult.error.issues,
                },
                { status: 400 }
            );
        }

        const [insertedOrder] = await db
            .insert(orders)
            .values(validationResult.data)
            .returning();

        return NextResponse.json(insertedOrder, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
