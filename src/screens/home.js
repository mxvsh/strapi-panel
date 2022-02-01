import React, {useMemo} from 'react';
import {Box, Heading, ScrollView, Stack, Text} from 'native-base';

import {AuthStore} from '../store/auth';
import StrapiInfo from '../components/home/strapi-info';
import PinnedCollection from '../components/home/pinned-collection';
import ContentTypes from '../components/home/content-types';

function HomeScreen() {
  const {user} = AuthStore.useState();
  const {firstname, lastname} = useMemo(() => user, [user]);

  return (
    <ScrollView bg="white">
      <Box p={3}>
        <Text>
          Hi, {firstname} {lastname}
        </Text>
        <Heading size="md">Welcome to Strapi Panel</Heading>
      </Box>

      <Stack space={4}>
        <StrapiInfo />
        <PinnedCollection />
        <ContentTypes />
      </Stack>
      <Box mt={6} />
    </ScrollView>
  );
}

export default HomeScreen;
