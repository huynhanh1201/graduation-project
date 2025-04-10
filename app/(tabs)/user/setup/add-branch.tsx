import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

import { Colors } from '~/constants/Colors';

interface FormErrors {
  branchRegion?: string;
}

const AddBranchForm = () => {
  const [branchRegion, setBranchRegion] = useState('');
  const [branchNote, setBranchNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const { companyName, regionName } = useLocalSearchParams();

  const regions = regionName && typeof regionName === 'string' && regionName.trim().length > 0 ? [regionName] : [];
  const regionData = regions.map(region => ({
    key: region,
    value: region,
  }));

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!branchRegion || branchRegion.trim().length === 0) {
      tempErrors.branchRegion = 'Tên chi nhánh không được để trống';
    } else if (branchRegion.trim().length < 3) {
      tempErrors.branchRegion = 'Tên chi nhánh phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddBranch = () => {
    if (validateForm()) {
      console.log('Branch data:', { companyName, regionName, branchRegion, branchNote });
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
        <Appbar.Content title="Thêm chi nhánh" titleStyle={{ color: Colors.light.text }} />
      </Appbar.Header>

      <Card style={{ flex: 1, margin: 10, backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent' }}>
        <Card.Content>
          <SelectList
            setSelected={setBranchRegion}
            data={regionData}
            placeholder="Chọn vùng"
            boxStyles={{
              borderWidth: 1,
              borderColor: errors.branchRegion ? 'red' :'#000',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
            dropdownStyles={{
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
              backgroundColor: '#fff',
            }}
            dropdownTextStyles={{ color: Colors.light.text }}
            inputStyles={{ color: Colors.light.text }}
            search={false}
            maxHeight={200}

          />
          {errors.branchRegion && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.branchRegion}</Text>
          )}

          <TextInput
            label="Ghi chú"
            value={branchNote}
            onChangeText={setBranchNote}
            multiline
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            textColor={Colors.light.text}
          />

          <Button
            mode="contained"
            onPress={handleAddBranch}
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

export default AddBranchForm;
