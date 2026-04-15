import { Metadata } from "next";
import AffiliatePage from "@/features/storefront/components/affiliate-page";
import { serverAffiliateService } from "@/lib/api/services/server/extensions/affiliate/affiliate";

export const metadata: Metadata = {
  title: "Chương trình Affiliate - AKA Store",
  description:
    "Tham gia chương trình Affiliate của AKA Store và kiếm hoa hồng lên. Giới thiệu sản phẩm chất lượng cao đến mạng lưới của bạn và bắt đầu kiếm tiền ngay hôm nay.",
};

export default async function AffiliatePageRoute() {

  const defaultCommissionRate =
    await serverAffiliateService.getDefaultAffiliateCommissionRate();

  return <AffiliatePage defaultCommissionRate={defaultCommissionRate.commissionRate!} />;
}

