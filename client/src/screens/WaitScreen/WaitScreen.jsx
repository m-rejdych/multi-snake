import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Text, VStack } from '@chakra-ui/react';

import { SocketContext } from '../../context/SocketContext';
import { addPlayer } from '../../store/actions/game';

const WaitScreen = () => {
  const connectedPlayers = useSelector((state) => state.game.joinedGame?.players.length);
  const numOfPlayers = useSelector((state) => state.game.joinedGame?.numOfPlayers);
  const gameCode = useSelector((state) => state.game.joinedGame?.gameCode);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('new-player', (player) => {
      dispatch(addPlayer(player));
    });
  }, [socket]);

  return (
    <VStack spacing={10}>
      <Heading>Waiting for others to join</Heading>
      <Text fontSize="4xl">
        Your game code is:
        <Text fontSize="4xl" fontWeight="bold" display="inline-block">
          {gameCode}
        </Text>
      </Text>
      <Text fontSize="3xl">
        Players: {connectedPlayers}/{numOfPlayers}
      </Text>
    </VStack>
  );
};

export default WaitScreen;
