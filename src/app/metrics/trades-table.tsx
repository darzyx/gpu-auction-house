"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
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

const columns: ColumnDef<TOrder>[] = [
    {
        accessorKey: "gpu_count",
        header: "GPUs",
        cell: ({ row }) => {
            const count = row.getValue("gpu_count") as number;
            return count.toLocaleString();
        },
    },
    {
        accessorKey: "price_per_gpu",
        header: "$/GPU/day",
        cell: ({ row }) => {
            const price = row.getValue("price_per_gpu") as number;
            return <div>${Number(price).toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "total_price",
        header: "Total",
        cell: ({ row }) => {
            const total = row.getValue("total_price") as string;
            return <div>${Number(total).toLocaleString()}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Time",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at") as Date);
            return (
                <div className="text-muted-foreground">
                    {date.toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </div>
            );
        },
    },
];

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

    const gpuCount = Math.floor(Math.random() * 950) + 50;
    const pricePerGpu = (Math.random() * 40 + 25).toFixed(2);
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

export default function TradesTable() {
    const [orders, setOrders] = useState<TOrder[]>([]);

    useEffect(() => {
        setOrders(Array.from({ length: 10 }, generateRandomOrder));

        const interval = setInterval(() => {
            setOrders((prevOrders) => {
                const newOrder = generateRandomOrder();
                return [newOrder, ...prevOrders.slice(0, 9)];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const hasOrders = !!table.getRowModel().rows?.length;

    return (
        <div className="space-y-1">
            <h2 className="text-lg font-georgia leading-none">Trades</h2>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, idx) => {
                                let className = "font-berkeley-mono text-xs";
                                if (idx === 0) className += " pl-0";
                                if (idx === headerGroup.headers.length - 1) {
                                    className += " pr-0 text-right";
                                }
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={className}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {hasOrders
                        ? table.getRowModel().rows.map((row) => (
                              <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                              >
                                  {row.getVisibleCells().map((cell, idx) => {
                                      let className = "h-10 text-xs";
                                      if (idx === 0) className += " pl-0";
                                      if (
                                          idx ===
                                          row.getVisibleCells().length - 1
                                      ) {
                                          className += " pr-0 text-right";
                                      }
                                      return (
                                          <TableCell
                                              key={cell.id}
                                              className={className}
                                          >
                                              {flexRender(
                                                  cell.column.columnDef.cell,
                                                  cell.getContext()
                                              )}
                                          </TableCell>
                                      );
                                  })}
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
            {!hasOrders && (
                <div className="w-full flex justify-center items-center h-20 lg:h-40">
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            )}
        </div>
    );
}
