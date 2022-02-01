import React, {useMemo} from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from 'native-base';
import {StrapiStore} from '../../store/strapi';
import {useNavigation} from '@react-navigation/native';

function Collections() {
  const navigation = useNavigation();

  const strapi = StrapiStore.useState();
  const collectionTypes = useMemo(
    () =>
      strapi.contentTypes.filter(
        c => c.isDisplayed && c.kind === 'collectionType',
      ),
    [strapi.contentTypes],
  );
  const singleTypes = useMemo(
    () =>
      strapi.contentTypes.filter(c => c.isDisplayed && c.kind === 'singleType'),
    [strapi.contentTypes],
  );

  return (
    <>
      <Box py={2} bg="gray.100" px={4}>
        <HStack>
          <Heading>Collection Types ({collectionTypes.length})</Heading>
          <Spacer />
        </HStack>

        <Stack px={4} space={2} mt={4}>
          {collectionTypes.map((contentType, idx) => {
            const {info, attributes} = contentType;
            const totalAttrs = Object.values(attributes).length;
            return (
              <Box key={idx}>
                <HStack alignItems={'center'}>
                  <Box>
                    <Text fontSize={'lg'}>{info.displayName}</Text>
                    <Text>{totalAttrs} attributes</Text>
                  </Box>
                  <Spacer />
                  <Button
                    onPress={() => {
                      navigation.navigate('Content', {
                        ...contentType,
                      });
                    }}
                    variant={'outline'}
                    size="sm">
                    View
                  </Button>
                </HStack>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Box py={2} bg="gray.100" px={4} mt={4}>
        <HStack>
          <Heading>Single Types ({singleTypes.length})</Heading>
          <Spacer />
        </HStack>

        <Stack px={4} space={2} mt={4}>
          {singleTypes.map((singleType, idx) => {
            const {info, attributes} = singleType;
            const totalAttrs = Object.values(attributes).length;
            return (
              <Box key={idx}>
                <HStack alignItems={'center'}>
                  <Box>
                    <Text fontSize={'lg'}>{info.displayName}</Text>
                    <Text>{totalAttrs} attributes</Text>
                  </Box>
                  <Spacer />
                  <Button
                    onPress={() => {
                      navigation.navigate('Content', {
                        ...singleType,
                        kind: 'singleType',
                      });
                    }}
                    variant={'outline'}
                    size="sm">
                    View
                  </Button>
                </HStack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

export default Collections;
