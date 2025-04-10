import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Card, List, Searchbar, Text, Appbar, IconButton } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

interface Branch {
  id: string;
  name: string;
}

const AddBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([{ id: '1', name: 'demo' }]);
  const [search, setSearch] = useState('');
  const { companyName, regionName } = useLocalSearchParams();

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Chi nhánh" titleStyle={{ color: Colors.light.text }} />
        <Link
          href={{
            pathname: '/user/setup/add-branch',
            params: {
              companyName: companyName || 'Demo Company',
              regionName: regionName || 'Demo Region',
            },
          }}
          asChild
        >
          <IconButton icon="plus" iconColor={Colors.light.primary} />
        </Link>
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
        {branches.length > 0 && (
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
            iconColor={'#000'}
            placeholderTextColor={Colors.light.text}
            inputStyle={{ color: Colors.light.text }}
          />
        )}

        <FlatList
          data={branches.filter(branch =>
            branch.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: Colors.light.text,
                    }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </Card>
              )}
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: Colors.light.text }}>
              Không có dữ liệu
            </Text>
          }
        />
      </Card>
    </>
  );
};

export default AddBranch;
