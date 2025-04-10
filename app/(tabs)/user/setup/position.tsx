import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Link, useLocalSearchParams, router } from 'expo-router';
import { Card, List, Searchbar, Text, FAB, Appbar, IconButton } from 'react-native-paper'
import { Colors } from '~/constants/Colors';

interface Position {
  id: string;
  name: string;
}

const AddPosition = () => {
  const [positions, setPositions] = useState<Position[]>([
    { id: '1', name: 'Quản trị viên' },
    { id: '2', name: 'CEO/Chủ tịch' },
    { id: '3', name: 'Quản lý' },
    { id: '4', name: 'Người giám sát' },
  ]);
  const [search, setSearch] = useState('');
  const { companyName, regionName, branchRegion } = useLocalSearchParams();

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Chức vụ" titleStyle={{ color: Colors.light.text }} />
        <Link
          href={{
            pathname: '/user/setup/add-position',
            params: {
              companyName: companyName || 'Demo Company',
            },
          }}
          asChild
        >
          <IconButton icon="plus" iconColor={Colors.light.primary} />
        </Link>
      </Appbar.Header>

      <Card style={{ flex: 1, margin: 10, borderRadius: 10, shadowColor: 'transparent' }}>
        {positions.length > 0 && (
          <Searchbar
            placeholder="Tìm kiếm"
            onChangeText={setSearch}
            value={search}
            style={{
              margin: 10,
              backgroundColor: '#fff',
              borderColor: '#000',
              borderWidth: 1,
            }}
            inputStyle={{ color: Colors.light.text }}
            iconColor={Colors.light.text}
          />
        )}

        <FlatList
          data={positions.filter(position =>
            position.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              titleStyle={{ fontSize: 16, fontWeight: '600', color: Colors.light.text }}
              left={() => (
                <Card
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#D3E0EA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </Card>
              )}
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: Colors.light.text }}>Không có dữ liệu</Text>
          }
        />
      </Card>
    </>
  );
};

export default AddPosition;
