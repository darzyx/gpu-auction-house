import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { orders } from "@/db/schema";

const paramSchema = z.string();

export async function PATCH(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const validatedId = paramSchema.safeParse(params.id);

        if (!validatedId.success) {
            return NextResponse.json(
                { error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const [updatedOrder] = await db
            .update(orders)
            .set({
                status: "canceled",
                updated_at: new Date(),
            })
            .where(eq(orders.id, validatedId.data))
            .returning();

        if (!updatedOrder) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedOrder);
    } catch (error: unknown) {
        console.error(
            "Failed to cancel order:",
            error instanceof Error ? error.message : "Unknown error"
        );

        return NextResponse.json(
            { error: "Failed to cancel order" },
            { status: 500 }
        );
    }
}

export const runtime = "edge";
