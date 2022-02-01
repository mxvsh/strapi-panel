/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import useFetch from 'use-http/dist/cjs/useFetch';
import {useNavigation} from '@react-navigation/native';

const getType = type => {
  if (type === 'collectionType') {
    return 'collection-types';
  } else {
    return 'single-types';
  }
};

function ContentScreen(props) {
  const navigation = useNavigation();
  const content = props.route.params;
  const api = useFetch(
    `/content-manager/${getType(content.kind)}/${content.uid}`,
  );
  const configurationApi = useFetch(
    `/content-manager/content-types/${content.uid}/configuration`,
  );

  const [data, setData] = useState([]);
  const [configuration, setConfiguration] = useState({});
  const listConfing = useMemo(() => {
    if (configuration.contentType) {
      return configuration.contentType.layouts.list;
    } else {
      return [];
    }
  }, [configuration]);

  const loadData = () => {
    let page = 1;
    api.get(`?page=${page}&pageSize=10`).then(res => {
      setData(res.results);
    });
  };

  useEffect(() => {
    loadData();
    configurationApi.get().then(res => {
      setConfiguration(res.data);
    });
  }, []);
  return (
    <ScrollView bg="white">
      <HStack p={2} alignItems={'center'}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={24} color="black" />
        </Pressable>
        <Heading ml={3}>{content.info.displayName}</Heading>
      </HStack>

      {api.loading && (
        <Center>
          <Spinner />
        </Center>
      )}

      <Stack space={2} py={4}>
        {data?.map((item, idx) => {
          const itemData = listConfing.map(key => ({
            key,
            value: item[key],
          }));

          return (
            <Box key={idx}>
              <Box px={3}>
                <Flex flexDirection={'row'} flexWrap={'wrap'} rounded="xl">
                  {itemData.map(({key, value}) => (
                    <Box m={1} mr={3} key={key} rounded="lg">
                      <Text textTransform={'uppercase'} fontSize={12}>
                        {key}
                      </Text>
                      <Text fontSize={14}>{String(value)}</Text>
                    </Box>
                  ))}
                </Flex>
                <Button size="sm" mt={3} variant={'outline'} w="24">
                  Edit
                </Button>
              </Box>
              <Divider my={2} />
            </Box>
          );
        })}
      </Stack>
    </ScrollView>
  );
}

export default ContentScreen;
