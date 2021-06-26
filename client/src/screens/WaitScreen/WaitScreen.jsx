import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Text, VStack } from '@chakra-ui/react';

import { SocketContext } from '../../context/SocketContext';
import { addPlayer } from '../../store/actions/game';
import ROUTES from '../../shared/constants/routes';

const WaitScreen = () => {
  const [count, setCount] = useState(null);
  const connectedPlayers = useSelector((state) => state.game.joinedGame?.players.length);
  const numOfPlayers = useSelector((state) => state.game.joinedGame?.numOfPlayers);
  const gameCode = useSelector((state) => state.game.joinedGame?.gameCode);
  const history = useHistory();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('new-player', (player) => {
      dispatch(addPlayer(player));
    });

    socket.on('start-counter', (count) => {
      setCount(count);
    });

    socket.on('game-start', () => {
      history.push(ROUTES.GAME);
    });
  }, [socket]);

  return (
    <VStack spacing={10}>
      <Heading>{count === null ? 'Waiting for others to join...' : 'Game is starting!'}</Heading>
      {count === null ? (
        <>
          <Text fontSize="4xl">Game code</Text>
          <Text fontSize="4xl" fontWeight="bold">
            {gameCode}
          </Text>
          <Text fontSize="3xl">
            Players: {connectedPlayers}/{numOfPlayers}
          </Text>
        </>
      ) : (
        <>
          <Text fontSize="4xl">Get ready!</Text>
          <Text fontSize="5xl" fontWeight="bold">
            {count || 'GO!'}
          </Text>
        </>
      )}
    </VStack>
  );
};

export default WaitScreen;
