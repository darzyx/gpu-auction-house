import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
    {
        datetime: "2024-12-18 14:32",
        type: "Market",
        side: "Buy",
        price: "$1.40",
        gpus: 64,
        status: "Filled",
    },
    {
        datetime: "2024-12-18 11:15",
        type: "Limit",
        side: "Sell",
        price: "$0.95",
        gpus: 128,
        status: "Pending",
    },
    {
        datetime: "2024-12-17 23:45",
        type: "Limit",
        side: "Buy",
        price: "$0.85",
        gpus: 256,
        status: "Filled",
    },
    {
        datetime: "2024-12-17 16:20",
        type: "Market",
        side: "Sell",
        price: "$1.20",
        gpus: 32,
        status: "Filled",
    },
    {
        datetime: "2024-12-17 09:05",
        type: "Limit",
        side: "Buy",
        price: "$0.75",
        gpus: 512,
        status: "Pending",
    },
];

export default function OrderHistory() {
    return (
        <Table>
            <TableCaption>Recent H100 GPU orders</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>GPUs</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.datetime}>
                        <TableCell>{order.datetime}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{order.side}</TableCell>
                        <TableCell>{order.price}</TableCell>
                        <TableCell>{order.gpus}</TableCell>
                        <TableCell className="text-right">{order.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
