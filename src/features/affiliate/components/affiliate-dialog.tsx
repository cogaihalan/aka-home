"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AffiliateAccount } from "@/types/affiliate";
import { useState } from "react";
import { unifiedAffiliateService } from "@/lib/api/services/unified/extensions/affiliate/affiliate";

const formSchema = z.object({
  commissionRate: z
    .number()
    .min(0, "Tỷ lệ hoa hồng phải lớn hơn 0")
    .max(100, "Tỷ lệ hoa hồng phải nhỏ hơn 100"),
});

type FormData = z.infer<typeof formSchema>;

interface AffiliateDialogProps {
  open: boolean;
  type?: "default" | "personal";
  onOpenChange: (open: boolean) => void;
  account?: AffiliateAccount;
  onSuccess?: () => void;
  defaultCommissionRate: number;
}

export function AffiliateDialog({
  open,
  type = "personal",
  onOpenChange,
  account,
  defaultCommissionRate,
  onSuccess,
}: AffiliateDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commissionRate:
        account?.affiliate?.commissionRate || defaultCommissionRate,
    } as FormData,
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (type === "default") {
        await unifiedAffiliateService.updateDefaultAffiliateCommissionRate(
          data.commissionRate / 100,
        );
      } else {
        await unifiedAffiliateService.updateAffiliateCommissionRate({
          affiliateId: account?.affiliate?.id || 0,
          commissionRate: data.commissionRate,
        });
      }
      onSuccess?.();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error updating affiliate commission rate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] mx-auto md:!max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            Chỉnh sửa tỷ lệ hoa hồng
            {type === "default" ? "mặc định" : "cá nhân"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="commissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỷ lệ hoa hồng (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        if (value < 0) {
                          e.target.value = "0";
                        } else if (value > 100) {
                          e.target.value = "100";
                        } else {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
