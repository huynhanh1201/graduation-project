// ui.ts
/**
 * Chứa các hằng số liên quan đến kích thước, border-radius, shadows và các giá trị layout khác.
 */
export const UI = {
  // Định nghĩa các giá trị border-radius cho các thành phần giao diện.
  // Những giá trị này giúp tạo góc bo tròn cho các component.
  borderRadius: {
    small: 4, // "small": Sử dụng cho các thành phần nhỏ, tạo góc bo nhẹ.
    medium: 8, // "medium": Phù hợp cho các component trung bình như card, modal,...
    large: 16, // "large": Dùng cho các thành phần cần bo tròn nổi bật, ví dụ tiêu đề, button chính.
  },

  paddingBody: {
    paddingRight: 15,
    paddingLeft: 15,
  },

  // Định nghĩa các kiểu bóng (shadows) để tạo hiệu ứng chiều sâu cho các thành phần.
  shadows: {
    light: {
      shadowColor: '#000', // Màu sắc của bóng (đen).
      shadowOffset: { width: 0, height: 1 }, // Vị trí dịch chuyển của bóng: 0 theo chiều ngang, 1 theo chiều dọc.
      shadowOpacity: 0.1, // Độ mờ của bóng: rất nhẹ.
      shadowRadius: 3, // Bán kính của bóng, giúp xác định độ mềm mại của bóng.
      elevation: 1, // Giá trị elevation cho Android, điều chỉnh độ sâu bóng.
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 }, // Dịch chuyển bóng nhiều hơn so với "light".
      shadowOpacity: 0.2, // Độ mờ cao hơn, tạo hiệu ứng rõ nét hơn.
      shadowRadius: 5, // Bán kính của bóng tăng lên, tạo hiệu ứng bóng mềm mại hơn.
      elevation: 3, // Elevation cao hơn, giúp bóng nổi bật hơn trên Android.
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 }, // Dịch chuyển bóng mạnh nhất, tạo hiệu ứng bóng lớn.
      shadowOpacity: 0.3, // Độ mờ cao nhất, tạo hiệu ứng nổi bật.
      shadowRadius: 7, // Bán kính của bóng lớn, giúp bóng có kích thước rộng và mềm mại.
      elevation: 5, // Elevation cao nhất, tạo hiệu ứng chiều sâu mạnh mẽ trên Android.
    },
  },

  // Định nghĩa các giá trị layout chung.
  layout: {
    containerPadding: 16, // Giá trị padding mặc định cho container, giúp tạo khoảng cách bên trong đều đặn.
  },
}
