import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const seedData = [
    {
        id: 1,
        orderDate: "12/19/24 11:07:36",
        side: "Sell" as const, // Type assertion
        type: "Limit" as const,
        startDate: "12/20/24 09:07:36",
        endDate: "12/27/24 09:07:36",
        gpus: 512,
        pricePerGpu: "$46.80",
        totalPrice: "$168,979.20",
        status: "Pending" as const,
    },
    {
        id: 2,
        orderDate: "12/18/24 14:07:36",
        side: "Buy" as const,
        type: "Market" as const,
        startDate: "12/19/24 00:07:36",
        endDate: "12/26/24 00:07:36",
        gpus: 256,
        pricePerGpu: "$57.60",
        totalPrice: "$103,219.20",
        status: "Filled" as const,
    },
    {
        id: 3,
        orderDate: "12/17/24 23:07:36",
        side: "Buy" as const,
        type: "Limit" as const,
        startDate: "12/18/24 12:07:36",
        endDate: "12/25/24 12:07:36",
        gpus: 1024,
        pricePerGpu: "$44.40",
        totalPrice: "$321,331.20",
        status: "Filled" as const,
    },
    {
        id: 4,
        orderDate: "12/17/24 16:07:36",
        side: "Buy" as const,
        type: "Limit" as const,
        startDate: "12/19/24 09:07:36",
        endDate: "12/29/24 09:07:36",
        gpus: 1024,
        pricePerGpu: "$42.00",
        totalPrice: "$432,000.00",
        status: "Canceled" as const,
    },
    {
        id: 5,
        orderDate: "12/17/24 09:07:36",
        side: "Sell" as const,
        type: "Market" as const,
        startDate: "12/18/24 00:07:36",
        endDate: "12/28/24 00:07:36",
        gpus: 768,
        pricePerGpu: "$52.80",
        totalPrice: "$405,504.00",
        status: "Filled" as const,
    },
] as const;

export async function POST() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY,
          order_date TEXT NOT NULL,
          side TEXT NOT NULL,
          type TEXT NOT NULL,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          gpus INTEGER NOT NULL,
          price_per_gpu TEXT NOT NULL,
          total_price TEXT NOT NULL,
          status TEXT NOT NULL
        );
      `;

        await sql`TRUNCATE TABLE orders;`;

        for (const order of seedData) {
            await sql`
          INSERT INTO orders (
            id, order_date, side, type, start_date, end_date, 
            gpus, price_per_gpu, total_price, status
          ) VALUES (
            ${order.id}, ${order.orderDate}, ${order.side}, ${order.type},
            ${order.startDate}, ${order.endDate}, ${order.gpus},
            ${order.pricePerGpu}, ${order.totalPrice}, ${order.status}
          );
        `;
        }

        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
