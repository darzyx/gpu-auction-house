"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";

type TOrdersProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

export default function Orders<TData, TValue>({ columns, data }: TOrdersProps<TData, TValue>) {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div>
            <h2 className="text-lg font-georgia px-2">Orders</h2>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// export default function Orders() {
//     return (
//         <div>
//             <h2 className="text-lg font-georgia px-2">Orders</h2>
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="font-berkeley-mono">Order Date</TableHead>
//                         <TableHead className="font-berkeley-mono">Side</TableHead>
//                         <TableHead className="font-berkeley-mono">Type</TableHead>
//                         <TableHead className="font-berkeley-mono">Amount</TableHead>
//                         <TableHead className="font-berkeley-mono">$/GPU/hr</TableHead>
//                         <TableHead className="font-berkeley-mono">Total</TableHead>
//                         <TableHead className="font-berkeley-mono">Start Date</TableHead>
//                         <TableHead className="font-berkeley-mono">End Date</TableHead>
//                         <TableHead className="font-berkeley-mono">Status</TableHead>
//                         <TableHead className="text-right">{/* Empty cell for the action buttons below */}</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {orders.map((order) => (
//                         <TableRow key={order.orderDate}>
//                             <TableCell>{order.orderDate}</TableCell>
//                             <TableCell>{order.side}</TableCell>
//                             <TableCell>{order.type}</TableCell>
//                             <TableCell>{order.gpus}</TableCell>
//                             <TableCell>{order.pricePerGpu}</TableCell>
//                             <TableCell>{order.totalPrice}</TableCell>
//                             <TableCell>{order.startDate}</TableCell>
//                             <TableCell>{order.endDate}</TableCell>
//                             <TableCell
//                                 className={
//                                     order.status === "Filled"
//                                         ? "text-green-600"
//                                         : order.status === "Pending"
//                                         ? "text-yellow-600"
//                                         : "text-red-600"
//                                 }
//                             >
//                                 {order.status}
//                             </TableCell>
//                             <TableCell className="text-right">
//                                 {order.status === "Pending" && (
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         className="p-2 h-6 bg-zinc-100 hover:bg-red-500 hover:border-red-600 hover:text-white"
//                                     >
//                                         Cancel
//                                     </Button>
//                                 )}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// }
