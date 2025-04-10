import React from 'react';
import { FlatList, View } from 'react-native';
import { Link } from 'expo-router';
import { Avatar, Card, List, Text, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '~/constants/Colors';

const HomeScreen = () => {
  const user = {
    name: 'khang',
    role: 'Quản lý',
    phone: '077****21',
  };

  const menuItems: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    path: string;
    description?: string;
    isLogout?: boolean;
  }[] = [
    { label: 'Thiết lập quản lý', icon: 'settings-outline', path: '/user/setup' as const },
    { label: 'Báo cáo', icon: 'bar-chart-outline', path: '/user/' as const },
    { label: 'Quản lý phêp', icon: 'calendar-outline', path: '/user/' as const },
    { label: 'Phiếu lương', icon: 'document-text-outline', path: '/user/' as const },
    { label: 'Ngôn ngữ', icon: 'language-outline', path: '/user/' as const, description: 'Tiếng Việt' },
    { label: 'Cài đặt cần báo', icon: 'notifications-outline', path: '/user/' as const },
    { label: 'Đổi doanh nghiệp', icon: 'business-outline', path: '/user/setup/list-business' as const },
    { label: 'Thông tin ứng dụng', icon: 'information-circle-outline', path: '/user/' as const },
    { label: 'Làm mới ứng dụng', icon: 'refresh-outline', path: '/user/' as const },
    { label: 'Trung tâm bộ nhớ', icon: 'shield-checkmark-outline', path: '/user/' as const },
    { label: 'Đăng xuất', icon: 'log-out-outline', path: '/user/log-in' as const, isLogout: true },
  ];

  return (
    <Card style={{ flex: 1, margin: 10, backgroundColor: Colors.light.background, elevation: 0, shadowColor: 'transparent' }}>
      {/* Thông tin người dùng */}
      <Card.Content style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
        <Avatar.Text
          size={50}
          label={user.name.charAt(0).toUpperCase()}
          style={{ marginRight: 15, backgroundColor: '#D3E0EA' }}
        />
        <Card.Content>
          <Text variant="titleLarge">{user.name}</Text>
          <Text variant="bodyMedium" style={{ color: '#666' }}>
            {user.role} • {user.phone}
          </Text>
        </Card.Content>
      </Card.Content>
      <Divider />

      {/* Danh sách menu */}
      <FlatList
        data={menuItems}
        renderItem={({ item, index }) => {
          const isLast = index === menuItems.length - 1;
          return (
            <View
              style={{
                backgroundColor: '#fff',
                marginHorizontal: 10,
                borderRadius: 8,
                borderTopWidth: 1,
                borderBottomWidth: isLast ? 1 : 0,
                borderColor: '#bbb',
              }}
            >
              <Link href={item.path as any} asChild>
                <List.Item
                  style={{ paddingHorizontal: 15 }}
                  title={item.label}
                  titleStyle={item.isLogout ? { color: '#FF0000' } : { color: Colors.light.text }}
                  description={item.description}
                  left={() => (
                    <List.Icon
                      icon={() => (
                        <Ionicons
                          name={item.icon}
                          size={24}
                          color={item.isLogout ? '#FF0000' : '#000'}
                        />
                      )}
                    />
                  )}
                  right={() =>
                    !item.isLogout ? (
                      <List.Icon
                        icon={() => (
                          <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            color="#000"
                          />
                        )}
                      />
                    ) : null
                  }
                />
              </Link>

            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </Card>
  );
};

export default HomeScreen;
