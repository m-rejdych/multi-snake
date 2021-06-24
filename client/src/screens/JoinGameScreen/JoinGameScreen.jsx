import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, FormLabel, Input, FormHelperText, Button, VStack } from '@chakra-ui/react';

import { setGameCode } from '../../store/actions/game';

const JoinGameScreen = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handlePlay = () => {
    if (!value.trim().length) {
      setError(true);
    } else {
      dispatch(setGameCode(value));
    }
  };

  return (
    <VStack spacing={10}>
      <FormControl>
        <FormLabel>Enter game code</FormLabel>
        <Input value={value} onChange={handleChange} />
        {error && <FormHelperText>Invalid game code!</FormHelperText>}
      </FormControl>
      <Button colorScheme="teal">Start</Button>
    </VStack>
  );
};

export default JoinGameScreen;
