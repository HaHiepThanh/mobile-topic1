Vai trò: Bạn là một Senior React Native Developer.

Nhiệm vụ: Viết mã nguồn hoàn chỉnh cho một ứng dụng mạng xã hội đơn giản. Hãy tuân thủ nghiêm ngặt các yêu cầu về chức năng và kỹ thuật dưới đây.

A. Yêu cầu Chức năng (Features):

Feed Screen (Màn hình chính): Hiển thị danh sách các bài đăng (posts).

Mỗi bài đăng hiển thị các thông tin: avatar (ảnh đại diện), username (tên người dùng), post_image (ảnh bài đăng), và caption (nội dung/mô tả).

Tích hợp các nút tương tác (UI) cho hành động: Like, Comment, Share.

Profile Screen (Màn hình cá nhân):

Khi người dùng bấm vào avatar hoặc username trên bất kỳ bài đăng nào ở Feed Screen, ứng dụng phải chuyển hướng (navigate) sang Profile Screen của người đó.

Hiển thị thông tin cơ bản của user (Avatar to hơn, Username, Bio/Thông tin giới thiệu).

B. Yêu cầu Kỹ thuật (Technical Constraints):

Cấu trúc dự án: Tuyệt đối KHÔNG code toàn bộ logic và giao diện trực tiếp trên file App.js. App.js chỉ dùng để bọc các Provider và Navigation. Hãy tách code ra các thư mục như /src/screens, /src/components, /src/data.

Screens (Ít nhất 2): Phải tạo rõ ràng FeedScreen.js và ProfileScreen.js.

Components (Ít nhất 3): Phải tách biệt ít nhất 3 reusable components. Gợi ý: PostItem (hiển thị 1 bài đăng), ActionButton (nút like/comment/share), và Avatar (hiển thị ảnh đại diện có thể bấm được).

Navigation (Ít nhất 2 loại khác nhau): Sử dụng React Navigation. Yêu cầu kết hợp 2 loại:

Bottom Tab Navigation: Dùng để chuyển đổi giữa tab "Home" (chứa Feed) và một tab khác (ví dụ: "Cài đặt" hoặc "Profile của tôi" - làm UI giả là được).

Native Stack Navigation: Dùng để điều hướng từ màn hình Feed sang màn hình chi tiết Profile của user khác (khi bấm vào avatar).

Hiển thị danh sách: Bắt buộc sử dụng FlatList để render danh sách bài đăng trong Feed Screen.

Styling: Toàn bộ UI phải được style bằng StyleSheet.create của React Native. Không dùng inline style ngoại trừ các trường hợp tính toán dynamic.

Dữ liệu (Mock Data): Các dữ liệu bài đăng và user phải được định nghĩa dưới dạng một mảng các object JSON tĩnh (nằm trong một file riêng ví dụ src/data/mockData.json hoặc .js), sau đó import vào screen để sử dụng.

Đầu ra yêu cầu:
Cung cấp cho tôi cấu trúc thư mục gợi ý và toàn bộ mã nguồn của các file cần thiết để tôi có thể chạy ứng dụng.