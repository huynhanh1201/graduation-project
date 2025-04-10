import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';

import { Colors } from '~/constants/Colors'; // Nếu bạn có file màu riêng

interface FormErrors {
  departmentName?: string;
}

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentNote, setDepartmentNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const { companyName, regionName, branchRegion, positionName } = useLocalSearchParams();

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!departmentName || departmentName.trim().length === 0) {
      tempErrors.departmentName = 'Tên phòng ban không được để trống';
    } else if (departmentName.trim().length < 3) {
      tempErrors.departmentName = 'Tên phòng ban phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddDepartment = () => {
    if (validateForm()) {
      console.log('Department data:', {
        companyName,
        regionName,
        branchRegion,
        positionName,
        departmentName,
        departmentNote,
      });
      router.back();
    }
  };

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Thêm Phòng ban" titleStyle={{ color: Colors.light.text }} />
      </Appbar.Header>

      <Card
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 1,
        }}
      >
        <Card.Content>
          <TextInput
            label="Tên phòng ban"
            value={departmentName}
            onChangeText={setDepartmentName}
            error={!!errors.departmentName}
            mode="outlined"
            style={{ marginBottom: 10, backgroundColor: 'transparent', color: Colors.light.text }}
            outlineColor={errors.departmentName ? 'red' : '#000'}
            activeOutlineColor={Colors.light.primary}
          />
          {errors.departmentName && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.departmentName}</Text>
          )}
          <TextInput
            label="Ghi chú"
            value={departmentNote}
            onChangeText={setDepartmentNote}
            multiline
            mode="outlined"
            style={{ marginBottom: 10, backgroundColor: 'transparent', color: Colors.light.text }}
            outlineColor={'#000'}
            activeOutlineColor={Colors.light.primary}
          />
          <Button
            mode="contained"
            onPress={handleAddDepartment}
            style={{ marginTop: 10, backgroundColor: Colors.light.primary }}
            textColor={Colors.light.text}
          >
            Hoàn tất
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default AddDepartmentForm;
