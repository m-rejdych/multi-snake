import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Container, HStack, Button, VStack, Text } from '@chakra-ui/react';

import Snake from './Snake';
import ColorPicker from './ColorPicker';
import { setColor as setStoreColor } from '../../store/actions/player';

const GameSelectorScreen = () => {
  const [color, setColor] = useState('red.500');
  const selectedColor = useSelector((state) => state.player.color);
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setStoreColor(color));
  };

  return (
    <Container
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading mb={6}>Multi Snake 🐍</Heading>
      <HStack spacing={100}>
        <Snake color={color} />
        {selectedColor ? (
          <VStack spacing={6}>
            <Button size="lg" colorScheme="teal">
              Create new game
            </Button>
            <Button size="lg" colorScheme="purple">
              Join the game
            </Button>
          </VStack>
        ) : (
          <VStack spacing={10}>
            <Text align="center" fontSize="2xl">
              Select your snake's color
            </Text>
            <ColorPicker color={color} setColor={setColor} />
            <Button colorScheme="teal" size="lg" onClick={handleSelect}>
              Select
            </Button>
          </VStack>
        )}
      </HStack>
    </Container>
  );
};

export default GameSelectorScreen;