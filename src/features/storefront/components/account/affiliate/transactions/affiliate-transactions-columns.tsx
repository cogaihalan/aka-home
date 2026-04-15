"use client";

import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { AffiliateTransaction, AffiliateTransactionType } from "@/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Price } from "@/components/ui/price";

export function createColumns(): ColumnDef<AffiliateTransaction>[] {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: ({
        column,
      }: {
        column: Column<AffiliateTransaction, unknown>;
      }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => {
        const id = row.getValue("id") as number;
        return <div className="font-medium text-sm w-8">{id}</div>;
      },
      size: 32,
      maxSize: 32,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({
        column,
      }: {
        column: Column<AffiliateTransaction, unknown>;
      }) => <DataTableColumnHeader column={column} title="Số tiền" />,
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return (
          <Price
            price={amount}
            size="base"
            weight="semibold"
            showCurrency={true}
            currency="đ"
          />
        );
      },
    },
    {
      id: "type",
      accessorKey: "type",
      header: "Loại giao dịch",
      cell: ({ row }) => {
        const type = row.getValue("type") as AffiliateTransactionType;
        const typeLabels: Record<AffiliateTransactionType, string> = {
          COMMISSION: "Hoa hồng",
          WITHDRAWAL: "Rút tiền",
          ADJUSTMENT: "Điều chỉnh",
        };
        return <Badge variant="outline">{typeLabels[type] || type}</Badge>;
      },
    },
    {
      id: "balanceBefore",
      accessorKey: "balanceBefore",
      header: ({
        column,
      }: {
        column: Column<AffiliateTransaction, unknown>;
      }) => <DataTableColumnHeader column={column} title="Số dư trước" />,
      cell: ({ row }) => {
        const balance = row.getValue("balanceBefore") as number;
        return (
          <Price
            price={balance}
            size="base"
            weight="semibold"
            showCurrency={true}
            currency="đ"
          />
        );
      },
    },
    {
      id: "balanceAfter",
      accessorKey: "balanceAfter",
      header: ({
        column,
      }: {
        column: Column<AffiliateTransaction, unknown>;
      }) => <DataTableColumnHeader column={column} title="Số dư sau" />,
      cell: ({ row }) => {
        const balance = row.getValue("balanceAfter") as number;
        return (
          <Price
            price={balance}
            size="base"
            weight="semibold"
            showCurrency={true}
            currency="đ"
          />
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as Date;
        return (
          <div className="text-sm">
            {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
          </div>
        );
      },
    },
  ];
}
