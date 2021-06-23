import React from 'react';
import { SimpleGrid, Box, VStack, Text } from '@chakra-ui/react';

const colors = [
  {
    id: 'color-red',
    value: 'red.500',
  },
  {
    id: 'color-blue',
    value: 'blue.500',
  },
  {
    id: 'color-purple',
    value: 'purple.500',
  },
  {
    id: 'color-green',
    value: 'green.500',
  },
  {
    id: 'color-yellow',
    value: 'yellow.500',
  },
  {
    id: 'color-pink',
    value: 'pink.500',
  },
];

const ColorPicker = ({ color, setColor }) => (
  <SimpleGrid columns={3} spacing={10}>
    {colors.map(({ id, value }) => (
      <Box
        bgColor={value}
        key={id}
        border={color === value ? '4px' : '1px'}
        borderRadius="md"
        width={50}
        height={50}
        onClick={() => setColor(value)}
      />
    ))}
  </SimpleGrid>
);

export default ColorPicker;
