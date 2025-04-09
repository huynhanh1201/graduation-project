/**
 * Đây là định nghĩa các màu sắc cho giao diện của ứng dụng, thuộc chủ đề "light" (sáng).
 *
 * Các màu này được sử dụng để tạo theme cho toàn bộ ứng dụng, giúp đảm bảo giao diện nhất quán và dễ bảo trì.
 */

// Định nghĩa một hằng số tintColorLight để dùng cho các thành phần cần màu tint
const tintColorLight = '#0a7ea4'

export const Colors = {
  light: {
    // primary: Màu chủ đạo của giao diện, thường dùng cho các button, tiêu đề, hay các thành phần cần nhấn mạnh.
    primary: '#1ccc78',

    // secondary: Màu phụ, thường dùng cho các chi tiết hoặc background phụ, có độ trong suốt.
    secondary: 'rgba(46,191,204,0.6)',

    // text: Màu của văn bản chính trong giao diện.
    text: '#11181C',

    // background: Màu nền của ứng dụng.
    background: '#f5f5f5',

    // tint: Màu tint được dùng cho các hiệu ứng như icon, trạng thái active, hoặc những phần cần nhấn mạnh.
    tint: tintColorLight,

    // icon: Màu mặc định cho các icon trong ứng dụng.
    icon: '#687076',

    // tabIconDefault: Màu của icon trong tab navigator khi chưa được chọn.
    tabIconDefault: '#687076',

    // tabIconSelected: Màu của icon trong tab navigator khi được chọn. Ở đây sử dụng giá trị của tintColorLight để nhất quán với tint.
    tabIconSelected: tintColorLight,

    // textLink: Màu của các liên kết văn bản (text links) trong giao diện.
    textLink: '#007AFF',

    // accent: Màu nhấn mạnh, có thể dùng cho các thông báo hay các thành phần đặc biệt.
    accent: '#e74c3c',

    // muted: Màu nhẹ, thường dùng cho văn bản phụ, thông báo hay các thành phần ít quan trọng.
    muted: '#95a5a6',
  },
}
