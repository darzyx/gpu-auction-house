"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type TOrdersProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

export default function Orders<TData, TValue>({ columns, data }: TOrdersProps<TData, TValue>) {
    const slicedData = data.slice(0, 5);
    const [sorting, setSorting] = useState<SortingState>([{ id: "orderDate", desc: true }]);
    const table = useReactTable({
        data: slicedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
    });

    return (
        <div className="space-y-1">
            <h2 className="text-lg font-georgia leading-none">Orders</h2>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, idx) => {
                                let className = "font-berkeley-mono";
                                if (idx === 0) className += " pl-0";
                                if (idx === headerGroup.headers.length - 1) className += " pr-0";
                                return (
                                    <TableHead key={header.id} className={className}>
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
                                {row.getVisibleCells().map((cell, idx) => {
                                    let className = "h-12";
                                    if (idx === 0) className += " pl-0";
                                    if (idx === row.getVisibleCells().length - 1) className += " pr-0";
                                    return (
                                        <TableCell key={cell.id} className={className}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
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
            <div className="w-full flex justify-center items-center">
                <div className="group flex items-center gap-1 text-sm text-muted-foreground font-medium hover:underline underline-offset-2">
                    See all orders
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
}
