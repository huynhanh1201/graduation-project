// -Thư mục [calendar] chứa các file liên quan đến [Trang lịch].
// -File example.tsx là file ví dụ khi tạo một file bao gồm cách
// đặt tên file theo dang pascal-case [example-one] và cấu trúc cơ bản của một file trong thư mục [calendar].
// -Tên function của file phải trùng với tên file VD: example-one.tsx => function ExampleOne().
// -Tên file không được viết hoa chữ cái đầu.
// -Quy tắc chung về import các thư viện bên ngoài ở trên cùng, sau đó import các file cần thiết trong project.
// -VD: import React from 'react' trước, sau đó enter 1 dòng import các file của dự án.
// -Bắt buôc phải có comment những phần quan trọng của file.

import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function Example() {
  return <Text>aaa</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
