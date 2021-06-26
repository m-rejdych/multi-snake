import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormControl, FormLabel, Input, FormHelperText, Button, VStack } from '@chakra-ui/react';

const JoinGameScreen = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handlePlay = () => {
    if (!value.trim().length) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <VStack spacing={10}>
      <FormControl>
        <FormLabel>Enter game code</FormLabel>
        <Input size="lg" value={value} onChange={handleChange} />
        {error && <FormHelperText color="red.400">Invalid game code!</FormHelperText>}
      </FormControl>
      <Button size="lg" colorScheme="teal" onClick={handlePlay}>
        Start
      </Button>
    </VStack>
  );
};

export default JoinGameScreen;
