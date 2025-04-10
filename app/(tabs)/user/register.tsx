import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    let tempErrors: FormErrors = {};

    if (!name || name.trim().length === 0) {
      tempErrors.name = 'Tên không được để trống';
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Tên phải có ít nhất 3 ký tự';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0) {
      tempErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Email không hợp lệ';
    }

    if (!password || password.trim().length === 0) {
      tempErrors.password = 'Mật khẩu không được để trống';
    } else if (password.trim().length < 6) {
      tempErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!confirmPassword || confirmPassword.trim().length === 0) {
      tempErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log('Register data:', { name, email, password });
    }
  };

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.push('/user')} />
        <Appbar.Content title="Đăng ký" titleStyle={{ color: Colors.light.text }} />
      </Appbar.Header>
      <Card style={{ flex: 1, margin: 10, backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent' }}>
        <Card.Content>
          <TextInput
            label="Tên"
            value={name}
            onChangeText={setName}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            error={!!errors.name}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            placeholderTextColor={nameFocused ? Colors.light.primary : '#aaa'}
          />
          {errors.name && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.name}</Text>}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            keyboardType="email-address"
            error={!!errors.email}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            placeholderTextColor={emailFocused ? Colors.light.primary : '#aaa'}
          />
          {errors.email && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.email}</Text>}

          <TextInput
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            secureTextEntry
            error={!!errors.password}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            placeholderTextColor={passwordFocused ? Colors.light.primary : '#aaa'}
          />
          {errors.password && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.password}</Text>}

          <TextInput
            label="Xác nhận mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
            secureTextEntry
            error={!!errors.confirmPassword}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            placeholderTextColor={confirmPasswordFocused ? Colors.light.primary : '#aaa'}
          />
          {errors.confirmPassword && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.confirmPassword}</Text>}

          <Link href="/user/log-in" asChild>
            <Button
              mode="contained"
              onPress={handleRegister}
              style={{ marginTop: 10, backgroundColor: Colors.light.primary }}
            >
              Đăng ký
            </Button>
          </Link>

          <Link href="/user/log-in" asChild>
            <Button
              mode="text"
              labelStyle={{ color: Colors.light.primary }}
              style={{ marginTop: 10 }}
            >
              Đã có tài khoản? Đăng nhập
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </>
  );
};

export default RegisterScreen;
