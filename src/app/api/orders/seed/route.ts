import { db } from "@/db";
import { orders } from "@/db/schema";
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
        // Clear existing data
        await db.delete(orders);

        // Insert seed data
        for (const order of seedData) {
            await db.insert(orders).values(order);
        }

        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
