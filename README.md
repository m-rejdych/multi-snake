# Multi Snake

A multiplayer snake game based on websockets.

## Demo

https://multi-snake-app.herokuapp.com

## Tech Stack

**Client:** react, redux, react-router-dom, socket.io-client

**Server:** node, express, socket.io

## Run Locally

Clone the project

```bash
  git clone https://github.com/m-rejdych/multi-snake
```

Go to the project directory

```bash
  cd multi-snake
```

Install dependencies

```bash
  npm run install:all
```

Start the server

```bash
  npm run start:dev
```

The app will run on http://localhost:3000 by default.

## Environment Variables

To run this project, should add the following environment variables to your .env file for both client and server directories.

`SERVER_URL` ex: "localhost"

`PORT` ex: 3000
