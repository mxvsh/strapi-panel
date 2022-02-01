import React from 'react';
import {Box, Heading, Text} from 'native-base';

function PinnedCollection() {
  return (
    <Box py={2} bg="gray.100" px={4}>
      <Heading size="sm">Pinned Collection</Heading>
      <Text>No pinned collection</Text>
    </Box>
  );
}

export default PinnedCollection;
