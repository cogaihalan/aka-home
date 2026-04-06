"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { AffiliateDialog } from "./affiliate-dialog";
import { AffiliateCommissionRate } from "@/types";

export function UpdateAffiliateButton({
  defaultCommissionRate,
}: {
  defaultCommissionRate: AffiliateCommissionRate;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="flex items-center gap-2 justify-center"
        onClick={() => setOpen(true)}
      >
        Cập nhật
        <Settings className="h-4 w-4" />
      </Button>
      <AffiliateDialog
        open={open}
        onOpenChange={setOpen}
        type="default"
        onSuccess={() => {
          window.location.reload();
        }}
        defaultCommissionRate={defaultCommissionRate.commissionRate * 100}
      />
    </>
  );
}
