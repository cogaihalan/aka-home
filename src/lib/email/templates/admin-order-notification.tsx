import React from "react";
import type { Order } from "@/types";

interface AdminOrderNotificationProps {
  order: Order;
  customerName: string;
  customerEmail: string;
}

export const AdminOrderNotificationEmail: React.FC<AdminOrderNotificationProps> = ({
  order,
  customerName,
  customerEmail,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Đơn hàng mới #{order.code}</title>
      </head>
      <body style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333", maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <div style={{ backgroundColor: "#dcfce7", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #22c55e" }}>
          <h1 style={{ color: "#15803d", marginTop: "0" }}>🛒 Đơn hàng mới đã được đặt thành công!</h1>
          <p>Bạn có đơn hàng mới cần xử lý. Dưới đây là thông tin chi tiết:</p>
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <h2 style={{ color: "#1f2937", borderBottom: "2px solid #22c55e", paddingBottom: "10px" }}>
            Đơn hàng #{order.code}
          </h2>

          <div style={{ backgroundColor: "#f0fdf4", padding: "15px", borderRadius: "6px", marginBottom: "20px" }}>
            <h3 style={{ color: "#374151", fontSize: "16px", marginBottom: "10px" }}>Thông tin khách hàng:</h3>
            <p style={{ margin: "5px 0" }}><strong>Họ tên:</strong> {customerName}</p>
            <p style={{ margin: "5px 0" }}><strong>Email:</strong> {customerEmail}</p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#374151", fontSize: "16px", marginBottom: "10px" }}>Sản phẩm đã đặt:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Sản phẩm</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Số lượng</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Giá</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "10px" }}>{item.productName}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      {formatCurrency(item.priceAtPurchase * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ backgroundColor: "#f9fafb", padding: "15px", borderRadius: "6px", marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Tạm tính:</span>
              <strong>{formatCurrency(order.subtotalAmount)}</strong>
            </div>
            {order.discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#10b981" }}>
                <span>Giảm giá:</span>
                <strong>-{formatCurrency(order.discountAmount)}</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Phí vận chuyển:</span>
              <strong>{formatCurrency(order.shippingFee)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", paddingTop: "10px", borderTop: "2px solid #e5e7eb", fontSize: "18px", fontWeight: "bold", color: "#15803d" }}>
              <span>Tổng cộng:</span>
              <span>{formatCurrency(order.finalAmount)}</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <h3 style={{ color: "#374151", fontSize: "16px", marginBottom: "15px" }}>Thông tin giao hàng:</h3>
          <p style={{ margin: "5px 0" }}><strong>Người nhận:</strong> {order.recipientName}</p>
          <p style={{ margin: "5px 0" }}><strong>Số điện thoại:</strong> {order.recipientPhone}</p>
          <p style={{ margin: "5px 0" }}><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
          <p style={{ margin: "5px 0" }}><strong>Phương thức thanh toán:</strong> {
            order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" :
            order.paymentMethod === "VNPAY" ? "VNPay" :
            order.paymentMethod === "MOMO" ? "MoMo" :
            order.paymentMethod === "ZALO" ? "ZaloPay" : order.paymentMethod
          }</p>
          {order.note && (
            <p style={{ margin: "5px 0" }}><strong>Ghi chú:</strong> {order.note}</p>
          )}
        </div>

        <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e5e7eb", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
          <p>Email tự động từ hệ thống AKA Ecommerce</p>
        </div>
      </body>
    </html>
  );
};
