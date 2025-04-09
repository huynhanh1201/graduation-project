import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';
import { Colors } from '~/constants/Colors';

interface FormErrors {
  positionName?: string;
}

const AddPositionForm = () => {
  const [positionName, setPositionName] = useState('');
  const [positionNote, setPositionNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const { companyName, regionName, branchRegion } = useLocalSearchParams();

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!positionName || positionName.trim().length === 0) {
      tempErrors.positionName = 'Tên chức vụ không được để trống';
    } else if (positionName.trim().length < 3) {
      tempErrors.positionName = 'Tên chức vụ phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddPosition = () => {
    if (validateForm()) {
      console.log('Position data:', {
        companyName: companyName || 'Demo Company',
        regionName: regionName || 'Demo Region',
        branchRegion: branchRegion || 'Demo Branch',
        positionName,
        positionNote,
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
        <Appbar.Content title="Thêm chức vụ" titleStyle={{ color: '#000' }} />
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
            label="Tên chức vụ"
            value={positionName}
            onChangeText={setPositionName}
            error={!!errors.positionName}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            textColor="#000"
          />
          {errors.positionName && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.positionName}</Text>
          )}

          <TextInput
            label="Ghi chú"
            value={positionNote}
            onChangeText={setPositionNote}
            multiline
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            textColor="#000"
          />

          <Button
            mode="contained"
            onPress={handleAddPosition}
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

export default AddPositionForm;
