"use client";

import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import {
  AffiliateTransaction,
  AffiliateTransactionType,
  AffiliateUserAccount,
} from "@/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { formatDate } from "@/lib/format";

export const columns: ColumnDef<AffiliateTransaction>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }: { column: Column<AffiliateTransaction, unknown> }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <div className="font-medium text-sm w-4">{id}</div>;
    },
    size: 16,
    maxSize: 16,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: ({ column }: { column: Column<AffiliateTransaction, unknown> }) => (
      <DataTableColumnHeader column={column} title="Số tiền" />
    ),
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return (
        <div className="font-medium text-sm w-4">{formatDate(createdAt)}</div>
      );
    },
  },
];
