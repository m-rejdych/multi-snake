import React from 'react';

import { Heading, Container, HStack, Button } from '@chakra-ui/react';

const GameSelectorScreen = () => {
  return (
    <Container
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading mb={6}>Multi Snake 🐍</Heading>
      <HStack spacing={6}>
        <Button colorScheme="teal">Create new game</Button>
        <Button colorScheme="purple">Join the game</Button>
      </HStack>
    </Container>
  );
};

export default GameSelectorScreen;
