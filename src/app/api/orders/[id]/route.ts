import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { orders } from "@/db/schema";

const paramSchema = z.object({
    id: z.string().uuid("Invalid UUID format"),
});

export async function PATCH(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const validatedParams = paramSchema.safeParse(params);

        if (!validatedParams.success) {
            return NextResponse.json(
                { error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const { id } = validatedParams.data;

        const [updatedOrder] = await db
            .update(orders)
            .set({ status: "canceled" })
            .where(eq(orders.id, id))
            .returning();

        if (!updatedOrder) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Failed to cancel order:", error);
        return NextResponse.json(
            { error: "Failed to cancel order" },
            { status: 500 }
        );
    }
}

export const runtime = "edge";
