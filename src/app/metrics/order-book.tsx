import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
    const method = Math.random() > 0.5 ? "market" : "limit";
    const gpuCount = Math.floor(Math.random() * 90) + 10; // 10-100 GPUs
    const pricePerGpu = (Math.random() * 30 + 20).toFixed(2); // $20-50
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
        id: crypto.randomUUID(),
        side,
        method,
        status: "pending",
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
        // Initialize with 10 orders
        setOrders(Array.from({ length: 10 }, generateRandomOrder));

        // Add new order every 5 seconds
        const interval = setInterval(() => {
            setOrders((prevOrders) => {
                const newOrder = generateRandomOrder();
                return [newOrder, ...prevOrders.slice(0, 9)];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-x-auto">
            <Table>
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
                                <Badge
                                    variant="secondary"
                                    className={
                                        order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : order.status === "filled"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }
                                >
                                    {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
