import { useState } from "react";
import { AffiliateDialog } from "../affiliate-dialog";
import { AffiliateAccount } from "@/types/affiliate";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: AffiliateAccount;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Mở menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setEditDialogOpen(true)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa tỷ lệ hoa hồng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AffiliateDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        account={data}
        defaultCommissionRate={data.affiliate.commissionRate * 100}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
};
