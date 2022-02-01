import React, {useEffect, useState} from 'react';
import {Center, Spinner, Toast, View} from 'native-base';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {StrapiStore} from '../store/strapi';
import {AuthStore} from '../store/auth';
import axios from 'axios';

function AuthProvider({children}) {
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const jwt = await AsyncStorageLib.getItem('jwt');
    const base_url = await AsyncStorageLib.getItem('base_url');
    const user_info = await AsyncStorageLib.getItem('user_info');

    if (!jwt) {
      setLoading(false);
      return;
    }

    // fetch server information
    axios
      .get(`${base_url}/admin/information`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(({data}) => {
        const user = JSON.parse(user_info);

        AuthStore.update(s => {
          s.user = user;
        });
        StrapiStore.update(s => {
          s.info = data.data;
          s.host = base_url;
        });

        axios
          .get(`${base_url}/content-manager/content-types`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then(({data: contentTypes}) => {
            StrapiStore.update(s => {
              s.contentTypes = contentTypes.data;
            });
            setLoading(false);
          });
      })
      .catch(({response}) => {
        const {data} = response;
        Toast.show({
          title: 'Error',
          description: data.error?.message,
          status: 'error',
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View flex={1} bg="white">
        <Center mt={12}>
          <Spinner size="lg" />
        </Center>
      </View>
    );
  }
  return children;
}

export default AuthProvider;
