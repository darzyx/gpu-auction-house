import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";

const orders = [
    {
        orderDate: "12/18/24 14:07:36",
        startDate: "12/19/24 00:07:36",
        endDate: "12/26/24 00:07:36",
        side: "Buy",
        type: "Market",
        gpus: 256,
        pricePerGpu: "$2.40",
        totalPrice: "$103,219.20",
        status: "Filled",
    },
    {
        orderDate: "12/18/24 11:07:36",
        startDate: "12/20/24 09:07:36",
        endDate: "12/27/24 09:07:36",
        side: "Sell",
        type: "Limit",
        gpus: 512,
        pricePerGpu: "$1.95",
        totalPrice: "$168,979.20",
        status: "Pending",
    },
    {
        orderDate: "12/17/24 23:07:36",
        startDate: "12/18/24 12:07:36",
        endDate: "12/25/24 12:07:36",
        side: "Buy",
        type: "Limit",
        gpus: 1024,
        pricePerGpu: "$1.85",
        totalPrice: "$321,331.20",
        status: "Filled",
    },
    {
        orderDate: "12/17/24 16:07:36",
        startDate: "12/18/24 00:07:36",
        endDate: "12/28/24 00:07:36",
        side: "Sell",
        type: "Market",
        gpus: 768,
        pricePerGpu: "$2.20",
        totalPrice: "$405,504.00",
        status: "Filled",
    },
    {
        orderDate: "12/17/24 09:07:36",
        startDate: "12/19/24 09:07:36",
        endDate: "12/29/24 09:07:36",
        side: "Buy",
        type: "Limit",
        gpus: 1024,
        pricePerGpu: "$1.75",
        totalPrice: "$432,000.00",
        status: "Canceled",
    },
];

export default function Orders() {
    return (
        <div>
            <h2 className="text-lg font-georgia px-2">Orders</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-berkeley-mono">Order Date</TableHead>
                        <TableHead className="font-berkeley-mono">Side</TableHead>
                        <TableHead className="font-berkeley-mono">Type</TableHead>
                        <TableHead className="font-berkeley-mono">Amount</TableHead>
                        <TableHead className="font-berkeley-mono">$/GPU/hr</TableHead>
                        <TableHead className="font-berkeley-mono">Total</TableHead>
                        <TableHead className="font-berkeley-mono">Start Date</TableHead>
                        <TableHead className="font-berkeley-mono">End Date</TableHead>
                        <TableHead className="font-berkeley-mono">Status</TableHead>
                        <TableHead className="text-right">{/* Empty cell for the action buttons below */}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.orderDate}>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.side}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{order.gpus}</TableCell>
                            <TableCell>{order.pricePerGpu}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.startDate}</TableCell>
                            <TableCell>{order.endDate}</TableCell>
                            <TableCell
                                className={
                                    order.status === "Filled"
                                        ? "text-green-600"
                                        : order.status === "Pending"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }
                            >
                                {order.status}
                            </TableCell>
                            <TableCell className="text-right">
                                {order.status === "Pending" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
