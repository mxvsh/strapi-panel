import React from 'react';
import {Box, Heading, HStack, Text} from 'native-base';
import {StrapiStore} from '../../store/strapi';

function StrapiInfo() {
  const strapi = StrapiStore.useState();

  return (
    <Box py={2} bg="gray.100" px={4}>
      <Heading size="sm">Strapi Information</Heading>
      <HStack mt={3}>
        <Box w="33%">
          <Heading fontWeight={500} size="sm">
            Version
          </Heading>
          <Text>{strapi.info.strapiVersion}</Text>
        </Box>
        <Box w="33%">
          <Heading fontWeight={500} size="sm">
            Node
          </Heading>
          <Text>{strapi.info.nodeVersion}</Text>
        </Box>
        <Box w="33%">
          <Heading fontWeight={500} size="sm">
            Environment
          </Heading>
          <Text textTransform={'capitalize'}>
            {strapi.info.currentEnvironment}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default StrapiInfo;
