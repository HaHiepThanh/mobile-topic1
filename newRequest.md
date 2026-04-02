# Yêu Cầu Nâng Cấp Ứng Dụng (Giai đoạn 2)

**C. Tính năng mới bổ sung (New Features):**

1. **Màn hình Đăng bài (CreatePostScreen):**
   - Tạo thêm một màn hình mới có tên `CreatePostScreen.js`.
   - **Tái sử dụng Component:** BẮT BUỘC import và tái sử dụng component `Avatar` và phần hiển thị thông tin User (Username) từ cấu trúc đã tạo ở giai đoạn trước.
   - **Thành phần UI bổ sung:** Giao diện màn hình cần có thêm các phần tử sau:
     + Khu vực hiển thị hoặc nút để chọn "Ảnh bài đăng" (Có thể dùng UI giả lập/Placeholder hình chữ nhật).
     + Ô nhập văn bản đa dòng (TextInput) dành cho "Nội dung" (Caption của bài viết).
     + Một nút bấm "Đăng bài" (Submit/Post Button).

2. **Cập nhật Navigation:**
   - Cài đặt điều hướng (Navigation) để người dùng có thể truy cập vào `CreatePostScreen`.
   - **Yêu cầu kỹ thuật:** Hãy tích hợp màn hình này vào hệ thống Navigation hiện có. Cụ thể, hãy thêm nó như một Tab mới nằm ở giữa trong **Bottom Tab Navigation** (Ví dụ: Tab Home - Tab Create Post - Tab Profile), hoặc tạo một Header có nút bấm ở `FeedScreen` để navigate sang.