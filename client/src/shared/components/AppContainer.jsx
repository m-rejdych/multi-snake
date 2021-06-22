import React from 'react';
import { Container, useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const AppContainer = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
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
    </Container>
  );
};

export default AppContainer;
