import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Link, useLocalSearchParams, router } from 'expo-router';
import { Appbar, Card, List, Searchbar, Text, FAB, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';

interface Employee {
  id: string;
  name: string;
}

const AddEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'khang' },
    { id: '2', name: 'test' },
  ]);
  const [search, setSearch] = useState('');
  const { companyName, positionName } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      {/* Appbar Header */}
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Danh sách nhân viên" titleStyle={{ color: Colors.light.text }} />
        <Link
          href={{
            pathname: '/user/setup/add-employee',
            params: {
              companyName: companyName || '',
              positionName: positionName || '',
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
        <Card.Content style={{ paddingBottom: 70 }}>
          {employees.length > 0 && (
            <Searchbar
              placeholder="Tìm kiếm"
              onChangeText={setSearch}
              value={search}
              style={{
                margin: 10,
                marginTop: 0,
                backgroundColor: '#fff',
                borderColor: '#000',
                borderWidth: 1,
              }}
              inputStyle={{ color: Colors.light.primary}}
              iconColor={Colors.light.text}
            />
          )}

          <FlatList
            data={employees.filter(emp =>
              emp.name.toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                titleStyle={{ color: Colors.light.text, fontWeight: '500' }}
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.light.text }}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                right={() => (
                  <List.Icon
                    icon={() => <Ionicons name="call-outline" size={20} color="#00FF00" />}
                  />
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
        </Card.Content>
      </Card>

    </View>
  );
};

export default AddEmployee;
