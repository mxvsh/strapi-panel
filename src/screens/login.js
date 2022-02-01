import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Input,
  Stack,
  FormControl,
  Button,
  Text,
  Toast,
  Heading,
} from 'native-base';
import axios from 'axios';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {AuthStore} from '../store/auth';

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('Xen123456');
  const [email, setEmail] = useState('xencodes@icloud.com');
  const [hostname, setHostname] = useState('http://10.0.0.2:1337');

  const login = async () => {
    setLoading(true);
    axios
      .post(`${hostname}/admin/login`, {
        email,
        password,
      })
      .then(async ({data}) => {
        setLoading(false);

        if (data.data?.token) {
          const {firstname, lastname} = data.data.user;
          const fullName = `${firstname} ${lastname}`;

          await AsyncStorageLib.setItem('name', fullName);
          await AsyncStorageLib.setItem('base_url', hostname);
          await AsyncStorageLib.setItem('jwt', data.data.token);
          await AsyncStorageLib.setItem(
            'user_info',
            JSON.stringify(data.data.user),
          );

          // update global state
          AuthStore.update(s => {
            s.user = data.data.user;
          });

          Toast.show({
            title: `Logged in as ${fullName}`,
            status: 'success',
          });
        }
      })
      .catch(err => {
        const {data} = err.response;
        Toast.show({
          title: data.error?.message,
          status: 'error',
        });
      });
  };

  return (
    <ScrollView flex={1}>
      <Heading mt={4} px={4}>
        Strapi Panel
      </Heading>
      <Text px={4}>
        Welcome to Strapi Panel. Please enter website host name and credentials
        to continue.
      </Text>
      <Box m={4} mt={6} p={4} bg="white" shadow={1}>
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Website Host</FormControl.Label>
              <Input
                p={2}
                variant="underlined"
                placeholder="Enter website base url"
                keyboardType="url"
                onChangeText={setHostname}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="Enter email"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="Enter password"
                secureTextEntry
                onChangeText={setPassword}
              />
            </Stack>
            <Button onPress={login}>Login</Button>
          </Stack>
        </FormControl>
      </Box>
    </ScrollView>
  );
}

export default LoginScreen;
