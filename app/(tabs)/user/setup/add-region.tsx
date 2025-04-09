import React, { useState } from 'react';
import { Link, useLocalSearchParams, router } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

interface FormErrors {
  regionName?: string;
}

const AddRegionForm = () => {
  const [regionName, setRegionName] = useState('');
  const [regionNote, setRegionNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const { companyName } = useLocalSearchParams();

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!regionName || regionName.trim().length === 0) {
      tempErrors.regionName = 'Tên vùng không được để trống';
    } else if (regionName.trim().length < 3) {
      tempErrors.regionName = 'Tên vùng phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddRegion = () => {
    if (validateForm()) {
      console.log('Region data:', { companyName, regionName, regionNote });
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
        <Appbar.Content title="Thêm Vùng" titleStyle={{ color: '#000' }} />
      </Appbar.Header>

      <Card style={{ flex: 1, margin: 10, backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent' }}>
        <Card.Content>
          <TextInput
            label="Tên vùng"
            value={regionName}
            onChangeText={setRegionName}
            error={!!errors.regionName}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            textColor="#000"
          />
          {errors.regionName && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.regionName}</Text>
          )}

          <TextInput
            label="Ghi chú"
            value={regionNote}
            onChangeText={setRegionNote}
            multiline
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            textColor="#000"
          />

          <Button
            mode="contained"
            onPress={handleAddRegion}
            style={{ marginTop: 10 }}
            buttonColor={Colors.light.primary}
            textColor="#fff"
          >
            Hoàn tất
          </Button>
        </Card.Content>
      </Card>
    </>
  );
};

export default AddRegionForm;
