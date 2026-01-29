"use client";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  // Parse error message to determine type
  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("Network");
  const isApiError =
    error.message.includes("API") ||
    error.message.includes("HTTP") ||
    error.message.includes("500");
  const isAuthError =
    error.message.includes("401") ||
    error.message.includes("403") ||
    error.message.includes("Unauthorized");

  const getErrorInfo = () => {
    if (isAuthError) {
      return {
        title: "Access Denied",
        description: "Bạn không có quyền truy cập trang này.",
        showSignIn: true,
      };
    }
    if (isNetworkError) {
      return {
        title: "Connection Error",
        description:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.",
        showSignIn: false,
      };
    }
    if (isApiError) {
      return {
        title: "Server Error",
        description:
          "Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.",
        showSignIn: false,
      };
    }
    return {
      title: "Something went wrong",
      description: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.",
      showSignIn: false,
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Error Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {errorInfo.title}
          </h1>
          <p className="text-muted-foreground">{errorInfo.description}</p>
        </div>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-muted rounded-lg p-4 text-left">
            <p className="mb-2 text-sm font-medium">Chi tiết lỗi:</p>
            <code className="text-muted-foreground block break-all text-xs">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-muted-foreground mt-2 text-xs">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
