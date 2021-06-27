import React, { useRef, useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, useTheme, useColorMode, Heading, Text, Center, Button } from '@chakra-ui/react';

import { SocketContext } from '../../context/SocketContext';
import ROUTES from '../../shared/constants/routes';

const ARROW_KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

const getColor = (colors, selectedColor) => {
  const [color, index] = selectedColor.split('.');
  return colors[color][index];
};

const GameScreen = () => {
  const joinedGame = useSelector((state) => state.game.joinedGame);

  if (!joinedGame) return null;

  const [winner, setWinner] = useState(null);
  const playerId = useSelector((state) => state.player.id);
  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);
  const { colorMode } = useColorMode();
  const history = useHistory();
  const theme = useTheme();

  const drawCanvas = (ctx) => {
    const canvas = canvasRef.current;

    ctx.fillStyle = colorMode === 'dark' ? theme.colors.blackAlpha[500] : theme.colors.grey[600];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawSnake = (ctx, cellSize, { color, snake, name, position }) => {
    ctx.fillStyle = getColor(theme.colors, color);

    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });

    ctx.fillStyle = colorMode === 'dark' ? theme.colors.white : theme.colors.black;
    ctx.font = `${theme.fontSizes.md} ${theme.fonts.body}`;
    ctx.fillText(name, position.x * cellSize - name.length * 2.5, position.y * cellSize - 10);
  };

  const drawFood = (ctx, cellSize, { x, y }) => {
    ctx.fillStyle = theme.colors.orange[700];
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  const gameLoop = (game, ctx, cellSize) => {
    const canvas = canvasRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCanvas(ctx);

    game.players
      .filter(({ isAlive }) => isAlive)
      .forEach((player) => {
        drawSnake(ctx, cellSize, player);
      });

    drawFood(ctx, cellSize, game.food);
  };

  const handleKeyDown = (e) => {
    if (!ARROW_KEYS.includes(e.key)) return;

    socket.emit('keydown', e.key);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    drawCanvas(ctx);

    socket.on('game-loop', (gameState) => {
      requestAnimationFrame(() => {
        gameLoop(gameState, ctx, Math.floor(canvas.width / gameState.size));
      });
    });

    socket.on('game-finished', (winner) => {
      setWinner({
        id: winner,
        name: joinedGame.players.find(({ id }) => id === winner)?.name || '',
      });
    });

    socket.on('game-restarted', () => {
      history.push(ROUTES.WAIT);
    });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      socket.off('game-loop');
      socket.off('game-finished');
      socket.off('game-restarted');
    };
  }, []);

  const handleRestart = () => {
    setWinner(null);
    socket.emit('game-restart', joinedGame.gameCode);
  };

  return (
    <Box borderRadius="md" border="2px" position="relative">
      <canvas ref={canvasRef} />
      {winner && (
        <>
          <Center
            position="absolute"
            bottom="calc(100% + 16px)"
            flexDirection="column"
            width="100%"
          >
            <Heading textAlign="center" colorScheme="teal">
              {winner.id === playerId ? 'You won!' : 'You lost!'}
            </Heading>
            <Text colorScheme="purple" fontSize="xl">
              Winner: {winner.name}
            </Text>
          </Center>
          <Center position="absolute" top="calc(100% + 16px)" width="100%">
            <Button size="lg" colorScheme="teal" onClick={handleRestart}>
              Restart
            </Button>
          </Center>
        </>
      )}
    </Box>
  );
};

export default GameScreen;
