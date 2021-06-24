import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from '@chakra-ui/react';

import { setSettings } from '../../store/actions/game';
import ROUTES from '../../shared/constants/routes';

const settings = [
  {
    id: 'players',
    label: 'Players',
    options: [
      {
        id: 'two-players',
        label: '2',
        value: '2',
      },
      {
        id: 'three-players',
        label: '3',
        value: '3',
      },
      {
        id: 'four-players',
        label: '4',
        value: '4',
      },
    ],
  },
  {
    id: 'boardSize',
    label: 'Board size',
    options: [
      {
        id: 'small-size',
        label: 'Small',
        value: 'small',
      },
      {
        id: 'medium-size',
        label: 'Medium',
        value: 'medium',
      },
      {
        id: 'big-size',
        label: 'Big',
        value: 'big',
      },
    ],
  },
  {
    id: 'snakeSpeed',
    label: 'Snake speed',
    options: [
      {
        id: 'slow-speed',
        label: 'Slow',
        value: 'slow',
      },
      {
        id: 'regular-speed',
        label: 'Regular',
        value: 'regular',
      },
      {
        id: 'fast-speed',
        label: 'Fast',
        value: 'fast',
      },
    ],
  },
];

const NewGameScreen = () => {
  const [values, setValues] = useState({
    players: '',
    boardSize: '',
    snakeSpeed: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (id, value) => {
    setValues({ ...values, [id]: value });
  };

  const handleStart = () => {
    dispatch(setSettings(values));
  };

  return (
    <VStack spacing={10}>
      <Heading>Game settings</Heading>
      {settings.map(({ id, label, options }) => (
        <FormControl key={id}>
          <FormLabel fontSize="lg">{label}</FormLabel>
          <RadioGroup value={values[id]} onChange={(value) => handleChange(id, value)}>
            <HStack spacing={5}>
              {options.map(({ id, label, value }) => (
                <Radio key={id} value={value} size="lg" colorScheme="purple">
                  {label}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        </FormControl>
      ))}
      <Button
        colorScheme="teal"
        size="lg"
        isDisabled={Object.values(values).some((value) => !value)}
        onClick={handleStart}
      >
        Start
      </Button>
    </VStack>
  );
};

export default NewGameScreen;
