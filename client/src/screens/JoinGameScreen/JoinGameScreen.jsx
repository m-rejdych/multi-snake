import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormLabel, Input, FormHelperText, Button, VStack } from '@chakra-ui/react';

import { setJoinedGame } from '../../store/actions/game';
import { setId } from '../../store/actions/player';
import { SocketContext } from '../../context/SocketContext';
import ROUTES from '../../shared/constants/routes';

const JoinGameScreen = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const name = useSelector((state) => state.player.name);
  const color = useSelector((state) => state.player.color);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('joined-game', ({ game, playerId }) => {
      dispatch(setJoinedGame(game));
      dispatch(setId(playerId));

      history.push(ROUTES.WAIT);
    });
  }, [socket]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handlePlay = () => {
    if (!value.trim().length) {
      setError(true);
    } else {
      socket.emit('join-game', { gameCode: value, player: { name, color } });
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
