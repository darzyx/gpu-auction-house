import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { type TOrder } from "@/db/schema";

const generateRandomOrder = (): TOrder => {
    const side = Math.random() > 0.5 ? "buy" : "sell";
    const method = Math.random() > 0.7 ? "market" : "limit";

    let status: "pending" | "filled" | "canceled";
    if (method === "limit") {
        const rand = Math.random();
        status = rand < 0.3 ? "pending" : rand < 0.85 ? "filled" : "canceled";
    } else {
        status = Math.random() < 0.9 ? "filled" : "canceled";
    }

    const gpuCount = Math.floor(Math.random() * 90) + 10;
    const pricePerGpu = (Math.random() * 30 + 20).toFixed(2);
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
        id: crypto.randomUUID(),
        side,
        method,
        status,
        gpu_count: gpuCount,
        price_per_gpu: pricePerGpu,
        total_price: (gpuCount * parseFloat(pricePerGpu)).toFixed(2),
        start_date: now,
        end_date: nextWeek,
        start_end_hour: Math.floor(Math.random() * 24),
        created_at: now,
        updated_at: now,
    };
};

export default function OrderBookList() {
    const [orders, setOrders] = useState<TOrder[]>([]);

    useEffect(() => {
        setOrders(Array.from({ length: 10 }, generateRandomOrder));

        const interval = setInterval(() => {
            setOrders((prevOrders) => {
                const newOrder = generateRandomOrder();
                return [newOrder, ...prevOrders.slice(0, 9)];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Table className="min-w-80">
            <TableHeader>
                <TableRow>
                    <TableHead>Side</TableHead>
                    <TableHead>GPUs</TableHead>
                    <TableHead className="text-right">$/GPU</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell
                            className={
                                order.side === "buy"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {order.side.charAt(0).toUpperCase() +
                                order.side.slice(1)}
                        </TableCell>
                        <TableCell>
                            {order.gpu_count.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                            ${Number(order.price_per_gpu).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                            ${Number(order.total_price).toLocaleString()}
                        </TableCell>
                        <TableCell>
                            <div
                                className={
                                    order.status === "pending"
                                        ? "text-yellow-600"
                                        : order.status === "filled"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {order.status.charAt(0).toUpperCase() +
                                    order.status.slice(1)}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
