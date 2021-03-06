import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, VStack, FormControl, FormLabel, FormHelperText, Button } from '@chakra-ui/react';

import ROUTES from '../../shared/constants/routes';
import { setName } from '../../store/actions/player';

const InitialScreen = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (!value.trim().length) {
      setError(true);
    } else {
      setError(false);
      dispatch(setName(value));
      history.push(ROUTES.SELECT_GAME);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <VStack spacing={5}>
      <FormControl minW="md" minH="28">
        <FormLabel>Enter name</FormLabel>
        <Input
          placeholder="My name is Mr Snake"
          size="lg"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        {error && (
          <FormHelperText color="red.400">Don't be so shy! Enter your snake's name!</FormHelperText>
        )}
      </FormControl>
      <Button size="lg" colorScheme="teal" onClick={handleClick}>
        Play
      </Button>
    </VStack>
  );
};

export default InitialScreen;
