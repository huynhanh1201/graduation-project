import React from 'react';
import { FlatList, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { Appbar, Card, IconButton, List } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors'

const CreateBusiness = () => {
  const menuItems: {
      label: string;
      icon: keyof typeof Ionicons.glyphMap;
      path: string;
    }[] = [
    { label: 'Vùng', icon: 'earth-outline', path: '/user/setup/region' },
    { label: 'Chi nhánh', icon: 'git-branch-outline', path: '/user/setup/branch' },
    { label: 'Chức vụ', icon: 'people-outline', path: '/user/setup/position' },
    { label: 'Phòng ban', icon: 'briefcase-outline', path: '/user/setup/' },
    { label: 'Vị trí chấm công', icon: 'location-outline', path: '/user/setup/' },
  ];
  const router = useRouter();
  const { companyName } = useLocalSearchParams();

  return (
    <>
      <Appbar.Header statusBarHeight={0} dark={false} style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}>
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Quản lý công ty" titleStyle={{ color: Colors.light.text }} />
        <Link
          href={{
            pathname: '/user/setup/create-business',
            params: {
              companyName: companyName || 'Demo Company',
            },
          }}
          asChild
        >
          <IconButton icon="plus" iconColor={Colors.light.primary} />
        </Link>
      </Appbar.Header>

      <Card style={{ flex: 1, margin: 10, backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent' }}>
        <FlatList
          data={menuItems}
          renderItem={({ item, index }) => {
            const isLast = index === menuItems.length - 1;
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
                    titleStyle={{ color: Colors.light.text }}
                    left={() => (
                      <List.Icon
                        icon={() => (
                          <Ionicons
                            name={item.icon}
                            size={24}
                            color= {Colors.light.text}
                          />
                        )}
                      />
                    )}
                    right={() => (
                      <List.Icon
                        icon={() => (
                          <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            textColor={Colors.light.text}
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

export default CreateBusiness;
