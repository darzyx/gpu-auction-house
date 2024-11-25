"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TOrder } from "@/db/schema";

export default function OrdersTable({
    orders,
    columns,
    onOrderCanceled,
}: {
    orders: TOrder[];
    columns: ColumnDef<TOrder>[];
    onOrderCanceled: (id: string) => void;
}) {
    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        meta: { onOrderCanceled },
    });

    const hasOrders = !!table.getRowModel().rows?.length;

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
                                      let className =
                                          "h-10 xl:h-12 text-xs 2xl:text-sm";
                                      if (idx === 0) className += " pl-0";
                                      if (
                                          idx ===
                                          row.getVisibleCells().length - 1
                                      )
                                          className += " pr-0";
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
                    <p className="text-sm text-muted-foreground">
                        Your orders will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}
