import { NavItem, Cart } from "@/types";

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "Sản phẩm",
    url: "/admin/products",
    icon: "product",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
  {
    title: "Danh mục",
    url: "/admin/categories",
    icon: "folder",
    shortcut: ["c", "c"],
    isActive: false,
    items: [],
  },
  {
    title: "Đơn hàng",
    url: "/admin/orders",
    icon: "package",
    shortcut: ["o", "o"],
    isActive: false,
    items: [],
  },
  {
    title: "Trang",
    url: "/admin/pages",
    icon: "page",
    shortcut: ["p", "a"],
    isActive: false,
    items: [],
  },
  {
    title: "Đánh giá sản phẩm",
    url: "/admin/product-reviews",
    icon: "star",
    shortcut: ["r", "r"],
    isActive: false,
    items: [],
  },
  {
    title: "Đại lý/CTV",
    url: "/admin/affiliate",
    icon: "user-check",
    shortcut: ["a", "f"],
    isActive: false,
    items: [
      {
        title: "Yêu cầu đăng ký",
        url: "/admin/affiliate-approvals",
        icon: "user-check",
        shortcut: ["a", "y"],
        isActive: false,
        items: [],
      },
      {
        title: "Liên kết",
        url: "/admin/affiliate-links",
        icon: "link",
        shortcut: ["a", "k"],
        isActive: false,
        items: [],
      },
      {
        title: "Rút tiền",
        url: "/admin/affiliate-withdrawal",
        icon: "money",
        shortcut: ["a", "r"],
        isActive: false,
        items: [],
      },
      {
        title: "Giao dịch",
        url: "/admin/affiliate-transaction",
        icon: "credit-card",
        shortcut: ["a", "t"],
        isActive: false,
        items: [],
      },
    ],
  },
];


export const MOCK_CART_RESPONSE: Cart = {
  "id": 4,
  "userId": 1,
  "items": [
      {
          "id": 57,
          "product": {
              "id": 1,
              "name": "Kéo Nhà Bếp AKS-003",
              "description": "<ul><li>Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2&nbsp;</li><li>Kích&nbsp;thước:&nbsp;9,84&nbsp;x&nbsp;3,26&nbsp;inches&nbsp;(Tương&nbsp;đương&nbsp;25cm)&nbsp;</li><li>Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;110mm&nbsp;-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2,5mm</li><li>Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</li><li>Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</li><li>Vật&nbsp;liệu&nbsp;quai:&nbsp;PP&nbsp;Plastic</li><li>Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập,&nbsp;chịu&nbsp;nhiệt&nbsp;lên&nbsp;tới&nbsp;130%</li><li>Trọng&nbsp;lượng:&nbsp;120g&nbsp;</li><li>Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;các&nbsp;loại&nbsp;thực&nbsp;phẩm&nbsp;(thịt,&nbsp;cá,&nbsp;tôm,&nbsp;rau,&nbsp;củ,&nbsp;quả,...)&nbsp;</li><li>Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</li></ul>",
              "shortDescription": "Kéo nhà bếp đa năng, dùng để cắt thịt, cắt rau củ quả. Kéo được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.",
              "stock": 100,
              "price": 105000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 1,
                      "url": "https://akahome.vn/api/uploads/image/ca790f68-7d16-49f3-b259-2445652f1ef6.png",
                      "primary": false
                  },
                  {
                      "id": 3,
                      "url": "https://akahome.vn/api/uploads/image/ba5b23f4-cd5f-495c-978b-af7cd184d491.jpeg",
                      "primary": false
                  },
                  {
                      "id": 2,
                      "url": "https://akahome.vn/api/uploads/image/7e3c587b-d19b-4b8e-9718-0654cfbf4b40.png",
                      "primary": true
                  }
              ],
              "categories": [
                  {
                      "id": 1,
                      "name": "Kéo nhà bếp",
                      "description": "kéo nhà bếp",
                      "thumbnailUrl": "https://akahome.vn/api/uploads/image/41732e42-b875-44e3-b588-e04e54f0b026.jpg",
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 105000.00
      },
      {
          "id": 58,
          "product": {
              "id": 2,
              "name": "Kéo nhà bếp AKS 008",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;8,86&nbsp;x&nbsp;3,25&nbsp;inches&nbsp;(Tương&nbsp;đương&nbsp;225mm)</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;110mm&nbsp;-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2,5mm</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;PP&nbsp;Plastic</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập,&nbsp;chịu&nbsp;nhiệt&nbsp;lên&nbsp;tới&nbsp;130%</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;100g</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;các&nbsp;loại&nbsp;thực&nbsp;phẩm&nbsp;(thịt,&nbsp;cá,&nbsp;tôm,&nbsp;rau,&nbsp;củ,&nbsp;quả,...)</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015,&nbsp;Quatest</p>",
              "shortDescription": "Kéo nhà bếp đa năng, dùng để cắt thịt, cắt rau củ quả. Kéo được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.",
              "stock": 100,
              "price": 90000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 5,
                      "url": "https://akahome.vn/api/uploads/image/bf6e9a7f-bfb3-4238-a4c7-02bdf069a525.png",
                      "primary": false
                  },
                  {
                      "id": 22,
                      "url": "https://akahome.vn/api/uploads/image/282f42f0-2a66-4ada-a645-5758550db572.jpg",
                      "primary": true
                  }
              ],
              "categories": [
                  {
                      "id": 1,
                      "name": "Kéo nhà bếp",
                      "description": "kéo nhà bếp",
                      "thumbnailUrl": "https://akahome.vn/api/uploads/image/41732e42-b875-44e3-b588-e04e54f0b026.jpg",
                      "parentId": 0
                  }
              ]
          },
          "quantity": 1,
          "price": 90000.00
      },
      {
          "id": 59,
          "product": {
              "id": 3,
              "name": "Kéo cắt gà vịt AKS 002",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;9&nbsp;x&nbsp;1,89&nbsp;inches</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;86&nbsp;mm</p><p>-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;4&nbsp;mm</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;Thép&nbsp;SUS&nbsp;420J2&nbsp;bọc&nbsp;nhựa&nbsp;PVC&nbsp;Plastic</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;An&nbsp;toàn,&nbsp;vệ&nbsp;sinh&nbsp;và&nbsp;dễ&nbsp;cầm&nbsp;nắm</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;230g</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;gà,&nbsp;vịt,&nbsp;xương&nbsp;lườn,&nbsp;xương&nbsp;cánh,&nbsp;xương&nbsp;đùi,...</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</p>",
              "shortDescription": "Kéo nhà bếp đa năng, dùng để cắt gà vịt. Kéo được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.",
              "stock": 100,
              "price": 259000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 20,
                      "url": "https://akahome.vn/api/uploads/image/59e0557f-cf73-4c3e-82c1-af9cfd948428.jpg",
                      "primary": false
                  },
                  {
                      "id": 21,
                      "url": "https://akahome.vn/api/uploads/image/944aa013-0ea3-4cca-89db-75c784cc35a8.jpg",
                      "primary": false
                  },
                  {
                      "id": 19,
                      "url": "https://akahome.vn/api/uploads/image/a7a554b0-93e6-449c-939c-65fc4129eea8.jpg",
                      "primary": true
                  }
              ],
              "categories": [
                  {
                      "id": 1,
                      "name": "Kéo nhà bếp",
                      "description": "kéo nhà bếp",
                      "thumbnailUrl": "https://akahome.vn/api/uploads/image/41732e42-b875-44e3-b588-e04e54f0b026.jpg",
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 259000.00
      },
      {
          "id": 60,
          "product": {
              "id": 4,
              "name": "Kéo đa năng AMS 001",
              "description": "<ul><li>Vật&nbsp;liệu&nbsp;lưỡi:&nbsp;Thép&nbsp;SK5&nbsp;</li><li>Vật&nbsp;liệu&nbsp;quai:&nbsp;Nhựa&nbsp;PVC&nbsp;Plastic</li><li>Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;9,93&nbsp;inch</li><li>Kích&nbsp;thước:&nbsp;7,5&nbsp;x&nbsp;2,16&nbsp;inch</li><li>Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2&nbsp;mm</li><li>Trọng&nbsp;lượng:&nbsp;130&nbsp;g</li><li>Độ&nbsp;cứng:&nbsp;60-62&nbsp;HRC&nbsp;(+/-&nbsp;1)</li><li>Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập</li><li>Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;dây&nbsp;diện,&nbsp;nhựa&nbsp;mềm,&nbsp;ống&nbsp;cao&nbsp;su,&nbsp;cắt&nbsp;tôn,&nbsp;lưới&nbsp;thép,&nbsp;tỉa&nbsp;cành&nbsp;cây</li><li>Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</li></ul>",
              "shortDescription": "Kéo đa năng AMS 001",
              "stock": 100,
              "price": 85000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 7,
                      "url": "https://akahome.vn/api/uploads/image/f64ac87a-d92a-464e-abc1-86d97c71c8d4.jpg",
                      "primary": true
                  },
                  {
                      "id": 10,
                      "url": "https://akahome.vn/api/uploads/image/f04c5e55-a7a9-4d98-b9ed-2114043a211b.jpg",
                      "primary": false
                  },
                  {
                      "id": 9,
                      "url": "https://akahome.vn/api/uploads/image/0f6b9ee9-203e-4b31-8158-e2e2cac008a4.jpg",
                      "primary": false
                  },
                  {
                      "id": 8,
                      "url": "https://akahome.vn/api/uploads/image/b9ad0ff0-dfce-4b44-9520-dc3d1c8a32d1.jpg",
                      "primary": false
                  }
              ],
              "categories": [
                  {
                      "id": 4,
                      "name": "Kéo đa năng",
                      "description": "Kéo đa năng",
                      "thumbnailUrl": "https://akahome.vn/api/uploads/image/8ba94f2e-095e-40d7-8c91-a2b5d4585dcd.jpg",
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 85000.00
      },
      {
          "id": 61,
          "product": {
              "id": 5,
              "name": "Kéo cắt cành AGS 001",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;SK5&nbsp;</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;&nbsp;</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;</p><p>-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;cành&nbsp;cây&nbsp;nhỏ,&nbsp;cây&nbsp;bonsai&nbsp;trong&nbsp;gia&nbsp;đình</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</p>",
              "shortDescription": "Kéo cắt cành AKA, được làm bằng thép SK5 có độ cứng cao. Thiết kế công thái học giúp cắt cành dễ dàng, cắt lâu không bị mỏi tay.",
              "stock": 100,
              "price": 179000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 13,
                      "url": "https://akahome.vn/api/uploads/image/8fe7d591-a74c-448c-9256-02e7fcb0e620.jpg",
                      "primary": false
                  },
                  {
                      "id": 11,
                      "url": "https://akahome.vn/api/uploads/image/45016bea-95f8-4ba6-9df5-447eaffba7db.jpg",
                      "primary": true
                  },
                  {
                      "id": 12,
                      "url": "https://akahome.vn/api/uploads/image/44a280d8-3c27-42eb-9070-a081488cf228.jpg",
                      "primary": false
                  },
                  {
                      "id": 14,
                      "url": "https://akahome.vn/api/uploads/image/7cbf26ff-b660-4221-af6e-36281f2c0b34.jpg",
                      "primary": false
                  }
              ],
              "categories": [
                  {
                      "id": 3,
                      "name": "Kéo làm vườn",
                      "description": "Kéo làm vườn",
                      "thumbnailUrl": "https://akahome.vn/api/uploads/image/63714261-9a93-4006-9cf7-f7ceb34e1ed3.jpg",
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 179000.00
      },
      {
          "id": 62,
          "product": {
              "id": 6,
              "name": "Kẹp gắp thực phẩm",
              "description": "<p>Kẹp&nbsp;gắp&nbsp;thực&nbsp;phẩm,&nbsp;kẹp&nbsp;gắp&nbsp;thịt&nbsp;nướng</p>",
              "shortDescription": "Kẹp gắp thực phẩm, kẹp gắp thịt nướng",
              "stock": 100,
              "price": 99000.00,
              "discountPrice": 0.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 17,
                      "url": "https://akahome.vn/api/uploads/image/5ecae3ac-b806-46e9-8df3-4ebc5194a538.jpg",
                      "primary": false
                  },
                  {
                      "id": 18,
                      "url": "https://akahome.vn/api/uploads/image/83064be2-067a-4cf8-a9c6-9cce8aa19b2e.jpg",
                      "primary": false
                  },
                  {
                      "id": 16,
                      "url": "https://akahome.vn/api/uploads/image/545f7724-4eec-486c-bf8b-9ba031c8638e.jpg",
                      "primary": false
                  },
                  {
                      "id": 15,
                      "url": "https://akahome.vn/api/uploads/image/a7999103-60df-4389-a4e9-36185291cabf.jpg",
                      "primary": true
                  }
              ],
              "categories": []
          },
          "quantity": 1,
          "price": 99000.00
      },
      {
          "id": 63,
          "product": {
              "id": 7,
              "name": "[Mua 1 tặng 1] Mua kéo cắt gà tặng kẹp gắp thịt [FREESHIP]",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;9&nbsp;x&nbsp;1,89&nbsp;inches</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;86&nbsp;mm</p><p>-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;4&nbsp;mm</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;Thép&nbsp;SUS&nbsp;420J2&nbsp;bọc&nbsp;nhựa&nbsp;PVC&nbsp;Plastic</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;An&nbsp;toàn,&nbsp;vệ&nbsp;sinh&nbsp;và&nbsp;dễ&nbsp;cầm&nbsp;nắm</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;230g</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;gà,&nbsp;vịt,&nbsp;xương&nbsp;lườn,&nbsp;xương&nbsp;cánh,&nbsp;xương&nbsp;đùi,...</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</p>",
              "shortDescription": "Kéo cắt gà vịt được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.\n\n",
              "stock": 100,
              "price": 259000.00,
              "discountPrice": 259000.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 25,
                      "url": "https://akahome.vn/api/uploads/image/b9cc97e1-26c0-42e2-920a-3ae123d9e07a.jpg",
                      "primary": false
                  },
                  {
                      "id": 26,
                      "url": "https://akahome.vn/api/uploads/image/cec6f105-d60f-407f-a91a-9d84c19eed48.jpg",
                      "primary": false
                  },
                  {
                      "id": 24,
                      "url": "https://akahome.vn/api/uploads/image/9c135d1f-0bdf-4126-bc6a-b45bc4c2f289.jpg",
                      "primary": false
                  },
                  {
                      "id": 39,
                      "url": "https://akahome.vn/api/uploads/image/f2187076-f0cb-4506-b674-6f4f89f80264.jpg",
                      "primary": true
                  }
              ],
              "categories": [
                  {
                      "id": 5,
                      "name": "Khuyến mại",
                      "description": "Khuyến mại",
                      "thumbnailUrl": null,
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 259000.00
      },
      {
          "id": 64,
          "product": {
              "id": 8,
              "name": "[Mua 1 tặng 1] Mua kéo bếp đa năng tặng kẹp gắp thịt [FREESHIP]",
              "description": "<ul><li>Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2&nbsp;</li><li>Kích&nbsp;thước:&nbsp;9,84&nbsp;x&nbsp;3,26&nbsp;inches&nbsp;(Tương&nbsp;đương&nbsp;25cm)&nbsp;</li><li>Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;110mm&nbsp;-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2,5mm</li><li>Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</li><li>Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</li><li>Vật&nbsp;liệu&nbsp;quai:&nbsp;PP&nbsp;Plastic</li><li>Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập,&nbsp;chịu&nbsp;nhiệt&nbsp;lên&nbsp;tới&nbsp;130%</li><li>Trọng&nbsp;lượng:&nbsp;120g&nbsp;</li><li>Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;các&nbsp;loại&nbsp;thực&nbsp;phẩm&nbsp;(thịt,&nbsp;cá,&nbsp;tôm,&nbsp;rau,&nbsp;củ,&nbsp;quả,...)&nbsp;</li><li>Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</li></ul>",
              "shortDescription": "Kéo nhà bếp đa năng, dùng để cắt thịt, cắt rau củ quả. Kéo được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.",
              "stock": 100,
              "price": 105000.00,
              "discountPrice": 105000.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 28,
                      "url": "https://akahome.vn/api/uploads/image/38b2791c-142c-4265-88a1-dac90a8af9da.png",
                      "primary": false
                  },
                  {
                      "id": 27,
                      "url": "https://akahome.vn/api/uploads/image/485dce1b-d271-4d1a-9367-16ebb455ca0b.jpg",
                      "primary": true
                  },
                  {
                      "id": 29,
                      "url": "https://akahome.vn/api/uploads/image/e9d35683-a985-4f25-adca-c43d11ef9964.jpg",
                      "primary": false
                  }
              ],
              "categories": [
                  {
                      "id": 5,
                      "name": "Khuyến mại",
                      "description": "Khuyến mại",
                      "thumbnailUrl": null,
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 105000.00
      },
      {
          "id": 65,
          "product": {
              "id": 9,
              "name": "[Mua 1 tặng 1] Mua kéo bếp đa năng tặng kéo cắt chỉ [FREESHIP]",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;không&nbsp;gỉ&nbsp;SUS&nbsp;420J2</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;8,86&nbsp;x&nbsp;3,25&nbsp;inches&nbsp;(Tương&nbsp;đương&nbsp;225mm)</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;110mm&nbsp;-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2,5mm</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;Lưỡi&nbsp;răng&nbsp;cưa,&nbsp;mài&nbsp;lòng&nbsp;mo</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;54,56&nbsp;HRC</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;PP&nbsp;Plastic</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập,&nbsp;chịu&nbsp;nhiệt&nbsp;lên&nbsp;tới&nbsp;130%</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;100g</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;các&nbsp;loại&nbsp;thực&nbsp;phẩm&nbsp;(thịt,&nbsp;cá,&nbsp;tôm,&nbsp;rau,&nbsp;củ,&nbsp;quả,...)</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015,&nbsp;Quatest</p>",
              "shortDescription": "Kéo nhà bếp đa năng, dùng để cắt thịt, cắt rau củ quả. Kéo được làm bằng thép SUS 420 J2 không gỉ, không thôi nhiễm kim loại giúp đảm bảo an toàn vệ sinh thực phẩm cho người sử dụng.",
              "stock": 100,
              "price": 90000.00,
              "discountPrice": 90000.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 30,
                      "url": "https://akahome.vn/api/uploads/image/76c8d5af-e9ee-4a36-8c55-f36eddaf575e.jpg",
                      "primary": false
                  },
                  {
                      "id": 31,
                      "url": "https://akahome.vn/api/uploads/image/2715d468-f740-480d-8a50-f575ce58341d.jpg",
                      "primary": false
                  },
                  {
                      "id": 32,
                      "url": "https://akahome.vn/api/uploads/image/6a7840dd-7445-4963-838b-07422fcde061.jpg",
                      "primary": true
                  }
              ],
              "categories": [
                  {
                      "id": 5,
                      "name": "Khuyến mại",
                      "description": "Khuyến mại",
                      "thumbnailUrl": null,
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 90000.00
      },
      {
          "id": 66,
          "product": {
              "id": 11,
              "name": "[Mua 1 tặng 1] Mua đa năng tặng kéo văn phòng [FREESHIP]",
              "description": "<ul><li>Vật&nbsp;liệu&nbsp;lưỡi:&nbsp;Thép&nbsp;SK5&nbsp;</li><li>Vật&nbsp;liệu&nbsp;quai:&nbsp;Nhựa&nbsp;PVC&nbsp;Plastic</li><li>Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;9,93&nbsp;inch</li><li>Kích&nbsp;thước:&nbsp;7,5&nbsp;x&nbsp;2,16&nbsp;inch</li><li>Độ&nbsp;dày&nbsp;lưỡi:&nbsp;2&nbsp;mm</li><li>Trọng&nbsp;lượng:&nbsp;130&nbsp;g</li><li>Độ&nbsp;cứng:&nbsp;60-62&nbsp;HRC&nbsp;(+/-&nbsp;1)</li><li>Độ&nbsp;bền&nbsp;quai:&nbsp;Chịu&nbsp;va&nbsp;đập</li><li>Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;dây&nbsp;diện,&nbsp;nhựa&nbsp;mềm,&nbsp;ống&nbsp;cao&nbsp;su,&nbsp;cắt&nbsp;tôn,&nbsp;lưới&nbsp;thép,&nbsp;tỉa&nbsp;cành&nbsp;cây</li><li>Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</li></ul>",
              "shortDescription": "Kéo đa năng AKA được làm bằng thép SK5 cho độ cứng cao dùng để cắt dây điện, dây thép, cành cây nhỏ trong gia ",
              "stock": 100,
              "price": 85000.00,
              "discountPrice": 85000.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 36,
                      "url": "https://akahome.vn/api/uploads/image/12acb8aa-5f18-4a57-9d28-50296f6e3d64.jpg",
                      "primary": true
                  },
                  {
                      "id": 38,
                      "url": "https://akahome.vn/api/uploads/image/696ae28b-470b-4f54-b1d2-4065a7225674.jpg",
                      "primary": false
                  },
                  {
                      "id": 37,
                      "url": "https://akahome.vn/api/uploads/image/710d8025-f1ef-48e6-90a9-fedd5e9aa3d7.jpg",
                      "primary": false
                  }
              ],
              "categories": [
                  {
                      "id": 5,
                      "name": "Khuyến mại",
                      "description": "Khuyến mại",
                      "thumbnailUrl": null,
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 85000.00
      },
      {
          "id": 67,
          "product": {
              "id": 10,
              "name": "[Mua 1 tặng 1] Mua kéo cắt cành tặng kéo văn phòng [FREESHIP]",
              "description": "<p>-&nbsp;Chất&nbsp;liệu&nbsp;kéo:&nbsp;Thép&nbsp;SK5&nbsp;</p><p>-&nbsp;Kích&nbsp;thước:&nbsp;&nbsp;</p><p>-&nbsp;Độ&nbsp;dài&nbsp;lưỡi&nbsp;cắt:&nbsp;</p><p>-&nbsp;Độ&nbsp;dày&nbsp;lưỡi:</p><p>-&nbsp;Thiết&nbsp;kế:&nbsp;</p><p>-&nbsp;Độ&nbsp;cứng:&nbsp;</p><p>-&nbsp;Vật&nbsp;liệu&nbsp;quai:&nbsp;</p><p>-&nbsp;Độ&nbsp;bền&nbsp;quai:&nbsp;</p><p>-&nbsp;Trọng&nbsp;lượng:&nbsp;</p><p>-&nbsp;Ứng&nbsp;dụng:&nbsp;Cắt&nbsp;cành&nbsp;cây&nbsp;nhỏ,&nbsp;cây&nbsp;bonsai&nbsp;trong&nbsp;gia&nbsp;đình</p><p>-&nbsp;Chứng&nbsp;nhận:&nbsp;ISO&nbsp;9001&nbsp;-&nbsp;2015</p>",
              "shortDescription": "Kéo cắt cành AKA, được làm bằng thép SK5 có độ cứng cao. Thiết kế công thái học giúp cắt cành dễ dàng, cắt lâu không bị mỏi tay.",
              "stock": 100,
              "price": 179000.00,
              "discountPrice": 179000.00,
              "status": "ACTIVE",
              "averageRating": 0,
              "reviewCount": 0,
              "images": [
                  {
                      "id": 33,
                      "url": "https://akahome.vn/api/uploads/image/831d3c26-e2a7-4014-9e3b-5a94c543a7e0.jpg",
                      "primary": true
                  },
                  {
                      "id": 34,
                      "url": "https://akahome.vn/api/uploads/image/d17a929d-a897-44e4-97a3-901037bd886b.jpg",
                      "primary": false
                  },
                  {
                      "id": 35,
                      "url": "https://akahome.vn/api/uploads/image/1030442e-4905-4f5c-a610-c7047b5e6661.jpg",
                      "primary": false
                  }
              ],
              "categories": [
                  {
                      "id": 5,
                      "name": "Khuyến mại",
                      "description": "Khuyến mại",
                      "thumbnailUrl": null,
                      "parentId": null
                  }
              ]
          },
          "quantity": 1,
          "price": 179000.00
      }
  ]
}