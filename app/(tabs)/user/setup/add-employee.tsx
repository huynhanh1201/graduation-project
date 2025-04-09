import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView } from 'react-native';
import { Colors } from '~/constants/Colors';

interface FormErrors {
  employeeName?: string;
  phoneNumber?: string;
  email?: string;
  idNumber?: string;
  startDate?: string;
}

const AddEmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const { companyName, positionName } = useLocalSearchParams();

  const positions =
    positionName && typeof positionName === 'string' && positionName.trim().length > 0
      ? [positionName]
      : [];

  const positionData = positions.map((pos) => ({ key: pos, value: pos }));

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!employeeName.trim()) {
      tempErrors.employeeName = 'Họ tên nhân viên không được để trống';
    } else if (employeeName.trim().length < 3) {
      tempErrors.employeeName = 'Họ tên nhân viên phải có ít nhất 3 ký tự';
    }

    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Số điện thoại không được để trống';
    } else if (!phoneRegex.test(phoneNumber)) {
      tempErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Email không hợp lệ';
    }

    const idNumberRegex = /^\d{12}$/;
    if (!idNumber.trim()) {
      tempErrors.idNumber = 'Căn cước công dân không được để trống';
    } else if (!idNumberRegex.test(idNumber)) {
      tempErrors.idNumber = 'Căn cước công dân phải có 12 chữ số';
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!startDate.trim()) {
      tempErrors.startDate = 'Ngày vào làm không được để trống';
    } else if (!dateRegex.test(startDate)) {
      tempErrors.startDate = 'Ngày vào làm không hợp lệ (YYYY-MM-DD)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddEmployee = () => {
    if (validateForm()) {
      console.log('Employee data:', {
        companyName,
        employee: { employeeName, phoneNumber, email, idNumber, position, startDate },
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
        <Appbar.Content title="Thêm nhân viên" titleStyle={{ color: '#000' }} />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        <Card
          style={{
            margin: 10,
            backgroundColor: 'transparent',
            elevation: 0,
            shadowColor: 'transparent',
          }}
        >
          <Card.Content>
            <TextInput
              label="Họ tên nhân viên"
              value={employeeName}
              onChangeText={setEmployeeName}
              error={!!errors.employeeName}
              underlineColor={Colors.light.primary}
              activeUnderlineColor={Colors.light.primary}
              style={{ marginBottom: 10, backgroundColor: '#fff' }}
              textColor="#000"
            />
            {errors.employeeName && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.employeeName}</Text>
            )}

            <TextInput
              label="Số điện thoại"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              error={!!errors.phoneNumber}
              underlineColor={Colors.light.primary}
              activeUnderlineColor={Colors.light.primary}
              style={{ marginBottom: 10, backgroundColor: '#fff' }}
              textColor="#000"
            />
            {errors.phoneNumber && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.phoneNumber}</Text>
            )}

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={!!errors.email}
              underlineColor={Colors.light.primary}
              activeUnderlineColor={Colors.light.primary}
              style={{ marginBottom: 10, backgroundColor: '#fff' }}
              textColor="#000"
            />
            {errors.email && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>
            )}

            <TextInput
              label="Căn cước công dân"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
              error={!!errors.idNumber}
              underlineColor={Colors.light.primary}
              activeUnderlineColor={Colors.light.primary}
              style={{ marginBottom: 10, backgroundColor: '#fff' }}
              textColor="#000"
            />
            {errors.idNumber && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.idNumber}</Text>
            )}

            {positionData.length > 0 ? (
              <SelectList
                setSelected={setPosition}
                data={positionData}
                placeholder="Chọn chức vụ"
                boxStyles={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  backgroundColor: '#fff',
                }}
                dropdownStyles={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                }}
                search={false}
                maxHeight={200}
              />
            ) : (
              <TextInput
                label="Chức vụ"
                value={position}
                onChangeText={setPosition}
                underlineColor={Colors.light.primary}
                activeUnderlineColor={Colors.light.primary}
                style={{ marginBottom: 10, backgroundColor: '#fff' }}
                textColor="#000"
              />
            )}

            <TextInput
              label="Ngày vào làm (YYYY-MM-DD)"
              value={startDate}
              onChangeText={setStartDate}
              error={!!errors.startDate}
              underlineColor={Colors.light.primary}
              activeUnderlineColor={Colors.light.primary}
              style={{ marginBottom: 10, backgroundColor: '#fff' }}
              textColor="#000"
            />
            {errors.startDate && (
              <Text style={{ color: 'red', marginBottom: 10 }}>{errors.startDate}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleAddEmployee}
              style={{ marginTop: 10 }}
              buttonColor={Colors.light.primary}
              textColor="#fff"
            >
              Hoàn tất
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

export default AddEmployeeForm;
