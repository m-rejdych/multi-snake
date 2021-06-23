import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Snake = ({ color }) => (
  <Center height="xl" width="xl" borderRadius="md" border="2px">
    <Box bgColor={color} width={50} height="80%" />
  </Center>
);

export default Snake;
