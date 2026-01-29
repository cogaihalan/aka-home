"use client";

import { AlertCircle, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  // Parse error message to determine type
  const isAuthError =
    error.message.includes("401") ||
    error.message.includes("403") ||
    error.message.includes("Unauthorized") ||
    error.message.includes("Forbidden");
  const isApiError =
    error.message.includes("API") ||
    error.message.includes("HTTP") ||
    error.message.includes("500");

  const getErrorInfo = () => {
    if (isAuthError) {
      return {
        title: "Access Denied",
        description:
          "Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin.",
        icon: LogIn,
        showSignIn: true,
      };
    }
    if (isApiError) {
      return {
        title: "Server Error",
        description:
          "Không thể tải dữ liệu admin. Máy chủ có thể đang gặp vấn đề.",
        icon: AlertCircle,
        showSignIn: false,
      };
    }
    return {
      title: "Something went wrong",
      description:
        "Đã xảy ra lỗi không mong muốn trong trang admin. Vui lòng thử lại.",
      icon: AlertCircle,
      showSignIn: false,
    };
  };

  const errorInfo = getErrorInfo();
  const Icon = errorInfo.icon;

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <Icon className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl">{errorInfo.title}</CardTitle>
          <CardDescription>{errorInfo.description}</CardDescription>
        </CardHeader>

        {process.env.NODE_ENV === "development" && (
          <CardContent>
            <div className="bg-muted rounded-lg p-3">
              <p className="mb-1 text-xs font-medium">Chi tiết lỗi:</p>
              <code className="text-muted-foreground block break-all text-xs">
                {error.message}
              </code>
              {error.digest && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
