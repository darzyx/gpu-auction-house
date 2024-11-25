"use client";

import { useQuery } from "@tanstack/react-query";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ordersColumns from "@/components/trade/orders-section/columns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/db/actions";
import { TOrder } from "@/db/schema";

function OrdersTable({ orders }: { orders: TOrder[] }) {
    const table = useReactTable({
        data: orders,
        columns: ordersColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header, idx) => {
                            let className = "font-berkeley-mono";
                            if (idx === 0) className += " pl-0";
                            if (idx === headerGroup.headers.length - 1)
                                className += " pr-0";
                            return (
                                <TableHead
                                    key={header.id}
                                    className={className}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length > 0
                    ? table.getRowModel().rows.map((row) => (
                          <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                          >
                              {row.getVisibleCells().map((cell, idx) => {
                                  let className =
                                      "h-10 xl:h-12 text-xs 2xl:text-sm";
                                  if (idx === 0) className += " pl-0";
                                  if (idx === row.getVisibleCells().length - 1)
                                      className += " pr-[1px]";
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
    );
}

export default function OrdersSection() {
    const pathname = usePathname();

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

    if (isLoading) {
        return (
            <div className="w-full h-full p-8 flex flex-col justify-center items-center">
                <p className="leading-none font-berkeley-mono">Loading...</p>
            </div>
        );
    } else if (error || !orders) {
        return (
            <div className="p-4 text-red-500">
                Error loading orders. Please try again later.
            </div>
        );
    } else {
        return (
            <div className="space-y-1">
                <h2 className="text-lg font-georgia leading-none">Orders</h2>
                <OrdersTable orders={orders} />
                {orders.length === 0 && (
                    <div className="w-full flex justify-center items-center h-20 lg:h-40">
                        <p className="text-sm text-muted-foreground">
                            Your orders will appear here.
                        </p>
                    </div>
                )}
                {pathname === "/trade" && orders.length > 0 && (
                    <div className="w-full flex justify-center items-center">
                        <Link
                            href="/orders"
                            className="group flex items-center gap-1 text-sm text-muted-foreground font-medium hover:underline underline-offset-2 cursor-pointer"
                        >
                            See all orders
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}
