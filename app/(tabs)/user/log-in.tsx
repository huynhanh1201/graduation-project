import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    let tempErrors: FormErrors = {};

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

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log('Login data:', { email, password });
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
        <Appbar.Content title="Đăng nhập" titleStyle={{ color: Colors.light.text }} />
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
          <Link href="/user/forgot-password" asChild>
            <Button
              mode="text"
              labelStyle={{ color: Colors.light.primary }}
              style={{ marginTop: 10 }}
            >
              Bạn quên mật khẩu?
            </Button>
          </Link>
          <Link href="/user" asChild>
            <Button
              mode="contained"
              onPress={handleLogin}
              style={{ marginTop: 10, backgroundColor: Colors.light.primary }}
            >
              Đăng nhập
            </Button>
          </Link>

          <Link href="/user/register" asChild>
            <Button
              mode="text"
              labelStyle={{ color: Colors.light.primary }}
              style={{ marginTop: 10 }}
            >
              Chưa có tài khoản? Đăng ký
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </>
  );
};

export default LoginScreen;
