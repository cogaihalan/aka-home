import { Metadata } from "next";
import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { searchParamsCache } from "@/lib/searchparams";
import { DashboardPageProps } from "@/types";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import AffiliateListingPage from "@/features/affiliate/components/affiliate-listing";
import { UpdateAffiliateButton } from "@/features/affiliate/components/update-affiliate-button";
import { serverAffiliateService } from "@/lib/api/services/server/extensions/affiliate/affiliate";

export const metadata: Metadata = {
  title: "Bảng quản trị: Đại lý/CTV",
  description: "Quản lý đại lý/CTV của hệ thống",
};

export default async function Page(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const defaultCommissionRate =
    await serverAffiliateService.getDefaultAffiliateCommissionRate();

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Đại lý/CTV"
            description="Quản lý đại lý/CTV của hệ thống."
          />
          <UpdateAffiliateButton
            defaultCommissionRate={defaultCommissionRate}
          />
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <AffiliateListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
