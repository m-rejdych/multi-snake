import React, { useRef, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Box, useTheme } from '@chakra-ui/react';

import { SocketContext } from '../../context/SocketContext';

const ARROW_KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

const getColor = (colors, selectedColor) => {
  const [color, index] = selectedColor.split('.');
  return colors[color][index];
};

const GameScreen = () => {
  const joinedGame = useSelector((state) => state.game.joinedGame);

  if (!joinedGame) return null;

  const playerId = useSelector((state) => state.player.id);
  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);
  const theme = useTheme();

  const drawCanvas = (ctx) => {
    const canvas = canvasRef.current;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawSnake = (ctx, cellSize, player) => {
    ctx.fillStyle = getColor(theme.colors, player.color);
    player.snake.forEach(({ x, y }) => {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  };

  const drawFood = (ctx, cellSize, { x, y }) => {
    ctx.fillStyle = theme.colors.orange[900];
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
      alert(winner === playerId ? 'You win!' : 'You lost!');
    });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Box borderRadius="md" border="2px">
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default GameScreen;
