import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Card, TextInput, Button, Text, Appbar } from 'react-native-paper';

import { Colors } from '~/constants/Colors';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0) {
      setError('Email không được để trống');
      return false;
    } else if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendRequest = () => {
    if (validateEmail()) {
      console.log('Sending password reset to:', email);
      // Thực hiện gọi API reset mật khẩu tại đây (nếu có)
    }
  };

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        dark={false}
        style={{ backgroundColor: 'transparent', elevation: 0, marginBottom: 10 }}
      >
        <Appbar.BackAction color="#000" onPress={() => router.push('/user/log-in')} />
        <Appbar.Content title="Quên mật khẩu" titleStyle={{ color: Colors.light.text }} />
      </Appbar.Header>

      <Card style={{ flex: 1, margin: 10, backgroundColor: 'transparent', elevation: 0, shadowColor: 'transparent'}}>
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            keyboardType="email-address"
            error={!!error}
            style={{ marginBottom: 10, backgroundColor: '#fff' }}
            underlineColor={Colors.light.primary}
            activeUnderlineColor={Colors.light.primary}
            placeholderTextColor={emailFocused ? Colors.light.primary : '#aaa'}
          />
          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSendRequest}
            style={{ backgroundColor: Colors.light.primary, marginTop: 10 }}
          >
            Gửi yêu cầu
          </Button>

          <Link href="/user/log-in" asChild>
            <Button
              mode="text"
              labelStyle={{ color: Colors.light.primary }}
              style={{ marginTop: 10 }}
            >
              Quay lại đăng nhập
            </Button>
          </Link>
        </Card.Content>
      </Card>
    </>
  );
};

export default ForgotPasswordScreen;
