import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Card, List, Searchbar, Text, Appbar, IconButton } from 'react-native-paper';
import { Colors } from '~/constants/Colors';

interface Region {
  id: string;
  name: string;
}

const AddRegion = () => {
  const [regions, setRegions] = useState<Region[]>([{ id: '1', name: 'demo' }]);
  const [search, setSearch] = useState('');
  const { companyName } = useLocalSearchParams();

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Vùng hoạt động" titleStyle={{ color: Colors.light.text }} />
        <Link
          href={{
            pathname: '/user/setup/add-region',
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
        {regions.length > 0 && (
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
          data={regions.filter(region =>
            region.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              left={() => (
                <List.Icon
                  icon={() => (
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
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.light.text }}>
                        {item.name.charAt(0).toUpperCase()}
                      </Text>
                    </Card>
                  )}
                />
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

export default AddRegion;
