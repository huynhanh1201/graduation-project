import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Link, router } from 'expo-router';
import { Appbar, Card, List, Searchbar, Text, FAB, IconButton } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

interface Business {
  id: string;
  name: string;
}

const ListBusiness = () => {
  const [businesses, setBusinesses] = useState<Business[]>([
    { id: '1', name: 'Công ty A' },
    { id: '2', name: 'Công ty B' },
  ]);
  const [search, setSearch] = useState('');

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Appbar Header */}
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Doanh nghiệp" titleStyle={{ color: '#000' }} />
        <Link href="/user/setup/create-business" asChild>
          <IconButton icon="plus" iconColor={Colors.light.primary} />
        </Link>
      </Appbar.Header>

      {/* Nội dung chính */}
      <Card
        style={{
          flex: 1,
          margin: 10,
          marginTop: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          shadowColor: 'transparent',
        }}
      >
        <Card.Content style={{ paddingBottom: 70 }}>
          {businesses.length > 0 && (
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
              inputStyle={{ color: '#000' }}
              iconColor={'#000'}
            />
          )}

          <FlatList
            data={filteredBusinesses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                titleStyle={{ color: '#000', fontWeight: '500' }}
                left={() => (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: Colors.light.primary + '33',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 15,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              />
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
                Không có dữ liệu
              </Text>
            }
          />
        </Card.Content>
      </Card>

    </View>
  );
};

export default ListBusiness;
