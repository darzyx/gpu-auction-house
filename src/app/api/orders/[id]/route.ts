import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await sql`UPDATE new_orders SET status = 'canceled' WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to cancel order:", error);
        return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
    }
}
