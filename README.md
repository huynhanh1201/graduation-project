# Dự án Graduation Project

## Mô tả dự án

- Dự án xây dựng một app mobile với chức năng chấm công và tính lương cho nhân viên.

## Cài đặt

1. Yêu cầu hệ thống:

- NodeJS: v22.12.0
- Quản lý package: npm (Mặc định khi cài NodeJS)
- IDE: WebStorm

2. Các bước cài đặt:

- Clone dự án từ github về máy
- Cài đặt các package cần thiết: `npm install`

## Cách sử dụng

- Truy cập link trên trình duyệt để tải ứng dụng về thiết bị thật hoặc ảo:
  https://expo.dev/accounts/huynhanh/projects/graduation-project/builds/3f669fcc-8148-40ff-95c0-1237eee13b21
- Chạy ứng dụng: `npm start`
- Sử dụng app expo go trên thiết bị di động để quét mã QR và mở ứng dụng
- Nếu dùng thiết bị ảo thì chạy thiết bị ảo lên và dán link vào trình duyệt để tải và cài đặt ứng dụng vào thiết bị ảo
  sao đó vào termial dự án ấn `a` để mở ứng dụng
- Để chạy server json-server: ` npm run json-server`

## Công nghệ và tài liệu tham khảo

- Vector Icon: https://icons.expo.fyi/Index
- Expo: https://docs.expo.dev/
- Redux: https://redux.js.org/introduction/getting-started
- React Native Paper: https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator
- Json-Server: https://www.npmjs.com/package/json-server
- Type Script: https://www.w3schools.com/typescript/index.php

## Làm việc với Git và Github

- Xem ảnh Flow Git và Github để biết cách làm việc với Git và Github (bắt buộc): các bạn sẽ làm theo Case 2 trong ảnh.
  ![Git and Github Flow](https://trungquandev.com/wp-content/uploads/2022/03/git-github-flow-mind-map-trungquandev.jpeg)
- Video hướng dẫn cách làm việc với Git và Github (bắt buộc): https://www.youtube.com/watch?v=swlrBlriFPE&list=PLP6tw4Zpj-RLzH_NrF8j6SvZLuPk6t948&index=4

## Quy Tắc Đặt Tên Nhánh Trong Git (Bổ sung: 2/4/2025)

### Sử Dụng Tiền Tố Mô Tả Loại Công Việc

- **feature/**: Dành cho các tính năng mới.
- **bugfix/**: Dành cho việc sửa lỗi.
- **hotfix/**: Dành cho việc sửa lỗi khẩn cấp trên môi trường sản xuất.
- **docs/**: Dành cho việc cập nhật tài liệu.

Ví dụ, nếu bạn đang thêm một tính năng mới cho giao diện trang chủ, bạn có thể sử dụng tiền tố `feature/`.

### Đặt Tên Nhánh Mô Tả Rõ Ràng Nội Dung Công Việc

- Tên nhánh nên ngắn gọn nhưng đủ để mô tả nội dung hoặc mục đích của công việc.
- Sử dụng chữ thường và dấu gạch ngang để phân tách các từ (kebab-case).
- Tránh sử dụng khoảng trắng, ký tự đặc biệt hoặc chữ in hoa trong tên nhánh.

Ví dụ, nếu bạn đang phát triển giao diện trang chủ, bạn có thể đặt tên nhánh là `feature/home-ui`.

### Kết Hợp Với Mã Số Công Việc Hoặc Issue (Nếu Có)

Nếu bạn sử dụng hệ thống quản lý công việc như Jira, Trello, mỗi nhiệm vụ thường có một mã số riêng. Bạn có thể kết hợp mã số này vào tên nhánh để dễ theo dõi.

Ví dụ: `feature/1234-home-ui` (với 1234 là mã số của nhiệm vụ).

### Tạo Nhánh Mới Trong Git

Sau khi quyết định tên nhánh, bạn có thể tạo nhánh mới bằng lệnh:

```bash
git checkout -b feature/home-ui
```

Lệnh này sẽ tạo và chuyển bạn sang nhánh `feature/home-ui`.

### Lưu Ý

- Việc tuân thủ quy ước đặt tên nhánh giúp nhóm làm việc dễ dàng quản lý và theo dõi tiến độ công việc.
- Đảm bảo rằng tên nhánh phản ánh chính xác nội dung và mục đích của công việc để tránh nhầm lẫn.

## Luu ý khi phát triển

- Dùng Type Script để viết code
- Dùng Redux để quản lý state
- Dùng React Native Paper để thiết kế giao diện
- Dùng Expo để phát triển ứng dụng
- Vector Icon để sử dụng icon
- Các thư viện khác sẽ được cập nhật sau
- Các bạn cần cài đặt các công cụ cần thiết để phát triển ứng dụng
- Khi cài môt thư viện nào đó dùng cú pháp expo install <tên thư viện> nếu không được thì cài bằng npm install <tên thư viện>
- Luôn tuân thủ theo quy tắc đặt tên file và thư mục
- Dùng Json server để tạo server giả lập
