import React from 'react';
import { FlatList, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Card, List, Appbar, IconButton } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors'

const SetupScreen = () => {
  const router = useRouter();

  const setupItems: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    path: string;
  }[] = [
    { label: 'Công ty', icon: 'business-outline', path: '/user/setup/business' },
    { label: 'Nhân viên', icon: 'people-outline', path: '/user/setup/employee' },
    { label: 'Ca làm', icon: 'calendar-outline', path: '/user/setup/' },
    { label: 'Xếp ca', icon: 'grid-outline', path: '/user/setup/' },
    { label: 'Điểm danh', icon: 'person-outline', path: '/user/setup/' },
    { label: 'Chỉnh sửa giới công', icon: 'time-outline', path: '/user/setup/' },
    { label: 'Web admin', icon: 'globe-outline', path: '/user/setup' },
  ];


  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Thiết lập quản lý" titleStyle={{ color: Colors.light.text }} />
      </Appbar.Header>

      <Card
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowColor: 'transparent',
        }}
      >
        <FlatList
          data={setupItems}
          renderItem={({ item, index }) => {
            const isLast = index === setupItems.length - 1;
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 8,
                  borderTopWidth: 1,
                  borderBottomWidth: isLast ? 1 : 0,
                  borderColor: '#bbb',
                }}
              >
                <Link href={item.path as any} asChild>
                  <List.Item
                    style={{ paddingHorizontal: 10 }}
                    title={item.label}
                    left={() => (
                      <List.Icon
                        icon={() => (
                          <Ionicons name={item.icon} size={24} color="#000" />
                        )}
                      />
                    )}
                    right={() => (
                      <List.Icon
                        icon={() => (
                          <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            color={Colors.light.text}
                          />
                        )}
                      />
                    )}
                  />
                </Link>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
    </>
  );
};

export default SetupScreen;
