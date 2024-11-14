import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
    {
        orderDate: "2024-12-18 14:32",
        startDate: "2024-12-19 00:00",
        endDate: "2024-12-26 00:00",
        side: "Buy",
        type: "Market",
        gpus: 256,
        pricePerGpu: "$2.40",
        totalPrice: "$103,219.20",
        status: "Filled",
    },
    {
        orderDate: "2024-12-18 11:15",
        startDate: "2024-12-20 09:00",
        endDate: "2024-12-27 09:00",
        side: "Sell",
        type: "Limit",
        gpus: 512,
        pricePerGpu: "$1.95",
        totalPrice: "$168,979.20",
        status: "Pending",
    },
    {
        orderDate: "2024-12-17 23:45",
        startDate: "2024-12-18 12:00",
        endDate: "2024-12-25 12:00",
        side: "Buy",
        type: "Limit",
        gpus: 1024,
        pricePerGpu: "$1.85",
        totalPrice: "$321,331.20",
        status: "Filled",
    },
    {
        orderDate: "2024-12-17 16:20",
        startDate: "2024-12-18 00:00",
        endDate: "2024-12-28 00:00",
        side: "Sell",
        type: "Market",
        gpus: 768,
        pricePerGpu: "$2.20",
        totalPrice: "$405,504.00",
        status: "Filled",
    },
    {
        orderDate: "2024-12-17 09:05",
        startDate: "2024-12-19 09:00",
        endDate: "2024-12-29 09:00",
        side: "Buy",
        type: "Limit",
        gpus: 1024,
        pricePerGpu: "$1.75",
        totalPrice: "$432,000.00",
        status: "Pending",
    },
];

export default function OrderHistory() {
    return (
        <Table>
            <TableCaption>Recent H100 GPU orders</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>GPUs</TableHead>
                    <TableHead>$/GPU/hr</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
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
                        <TableCell className="text-right">{order.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
