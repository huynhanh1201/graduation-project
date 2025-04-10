import React, { useState } from 'react';
import { router } from 'expo-router';
import { Appbar, Card, TextInput, Button, Text } from 'react-native-paper';
import { Colors } from '~/constants/Colors';

interface FormErrors {
  companyName?: string;
}

const AddBusiness = () => {
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!companyName || companyName.trim().length === 0) {
      tempErrors.companyName = 'Tên công ty không được để trống';
    } else if (companyName.trim().length < 3) {
      tempErrors.companyName = 'Tên công ty phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddBusiness = () => {
    if (validateForm()) {
      console.log('Business data:', { companyName });
      router.back();
    }
  };

  return (
    <>
      {/* Appbar Header */}
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Thêm công ty" titleStyle={{ color: '#000' }} />
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
        <Card.Content>
          <TextInput
            label="Tên công ty"
            value={companyName}
            onChangeText={setCompanyName}
            error={!!errors.companyName}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            textColor={Colors.light.text}
          />
          {errors.companyName && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.companyName}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleAddBusiness}
            style={{ marginTop: 10 }}
            buttonColor={Colors.light.primary}
            textColor={Colors.light.text}
          >
            Hoàn tất
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default AddBusiness;
