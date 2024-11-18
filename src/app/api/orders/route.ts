import { db, orders } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await db.select().from(orders).orderBy(desc(orders.orderDate));

        return NextResponse.json(results);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
    }
}
