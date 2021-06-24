import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';

const WaitScreen = () => {
  return (
    <VStack spacing={10}>
      <Heading>Waiting for others to join</Heading>
      <Text fontSize="3xl">1/2</Text>
    </VStack>
  );
};

export default WaitScreen;
