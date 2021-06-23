import React from 'react';
import { Container, useColorMode, IconButton, Center } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const AppContainer = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container height="100vh">
      <Center height="100%" flexDirection="column">
        <IconButton
          position="absolute"
          size="lg"
          borderRadius="md"
          top={8}
          right={8}
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        />
        {children}
      </Center>
    </Container>
  );
};

export default AppContainer;
