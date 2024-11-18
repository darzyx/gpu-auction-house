import { db } from "@/db";
import { orders } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Check raw table existence
        const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'orders'
      );
    `;

        // Get order count
        const result = await db.select().from(orders);

        // Try direct SQL query
        const rawOrders = await sql`SELECT * FROM orders;`;

        return NextResponse.json({
            tableExists: tableCheck.rows[0].exists,
            orderCount: result.length,
            orders: result,
            rawOrders: rawOrders.rows,
        });
    } catch (error) {
        console.error("Test endpoint error:", error);
        return NextResponse.json({ error: "Database test failed", details: error }, { status: 500 });
    }
}
