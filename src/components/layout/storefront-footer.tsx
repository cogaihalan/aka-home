"use client";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/logo";
import Newsletter from "@/components/newsletter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const footerLinks = {
  shop: [
    { key: "Sản phẩm", href: "/products" },
    { key: "Danh mục", href: "/categories" },
  ],
  support: [
    { key: "Về chúng tôi", href: "/pages/about-us" },
    { key: "Chương trình Affiliate", href: "/affiliate" },
    { key: "Chứng nhận", href: "/pages/certificate" },
    { key: "Khuyến mại", href: "/pages/promotions" },
    { key: "Hướng dẫn", href: "/pages/guide" },
    { key: "Vệ sinh an toàn", href: "/pages/food-safety-hygiene" },
  ],
};

export default function StorefrontFooter() {
  return (
    <>
      <Newsletter />
      <footer className="bg-primary border-t">
        <div className="px-4 pt-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="max-w-lg">
              <Logo size="lg" href="/" />
              <p className="text-sm text-muted-foreground my-4">
                Trải nghiệm mua sắm cao cấp với sản phẩm chất lượng và dịch vụ
                xuất sắc.
              </p>

              <div className="space-y-3 text-sm text-muted-foreground">
                <a
                  className="block hover:text-fg-primary transition-colors"
                  href="mailto:info@akahome.vn"
                >
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>info@akahome.vn</span>
                  </div>
                </a>
                <a
                  className="block hover:text-fg-primary transition-colors"
                  href="tel:0912120880"
                >
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>091 212 0880</span>
                  </div>
                </a>
                <div className="flex items-center space-x-2 hover:text-fg-primary transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Lô CN06, Khu công nghiệp Minh Đức, Thượng Hồng, Hưng Yên
                  </span>
                </div>
              </div>
            </div>

            <Accordion
              type="multiple"
              className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-8"
              defaultValue={["shop", "support"]}
            >
              <AccordionItem value="shop" className="md:border-0">
                <AccordionTrigger className="text-left md:pointer-events-none md:cursor-default md:[&>svg]:hidden">
                  <span className="font-semibold">Mua sắm</span>
                </AccordionTrigger>
                <AccordionContent className="md:pb-0">
                  <ul className="space-y-2">
                    {footerLinks.shop.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-fg-primary transition-colors"
                        >
                          {link.key}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support" className="md:border-0">
                <AccordionTrigger className="text-left md:pointer-events-none md:cursor-default md:[&>svg]:hidden">
                  <span className="font-semibold">Hỗ trợ</span>
                </AccordionTrigger>
                <AccordionContent className="md:pb-0">
                  <ul className="space-y-2">
                    {footerLinks.support.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-fg-primary transition-colors"
                        >
                          {link.key}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="border-t py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {`© ${new Date().getFullYear()} AKA Home Store. Copyrights reserved.`}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
