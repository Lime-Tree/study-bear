const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');

const server = express()
  .use(express.static(path.join(__dirname, '../../build')))
  .get('*', (req, res, next) =>
    res.sendFile(path.join(__dirname, '../../build/index.html'))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server, {
  cors: true,
});
const crypto = require('crypto');

const rooms = {};

const createRoom = () => {
  const roomKey = crypto.randomBytes(8).toString('hex');
  rooms[roomKey] = {
    bears: [null, null, null, null, null, null, null],
  };
  return roomKey;
};

const randomRoom = () => {
  for (const roomKey in rooms) {
    const room = rooms[roomKey];
    for (let i = 0; i < room.bears.length; i++) {
      if (!room.bears[i]) {
        return roomKey;
      }
    }
  }
  return createRoom();
};

const validateRoomKey = (roomKey) => {
  return rooms[roomKey];
};

const hiBear = (bears, bearKey) => {
  const newBears = [...bears];
  newBears[bearKey].bearEvent.isJoinEvent = true;
  return newBears;
};

const byeBear = (bears, bearKey) => {
  if (bears && bearKey >= 0) {
    bears[bearKey] = null;
    return bears;
  }
  return null;
};

io.on('connection', (socket) => {
  let connectionRoomKey;
  let connectionBearKey;

  console.log('received connection');

  socket.on('createRoom', () => {
    console.log('received createRoom');
    const roomKey = createRoom();
    socket.emit('roomKey', roomKey);
    console.log(`emitted ${roomKey}`);
  });

  socket.on('randomRoom', () => {
    console.log('received randomRoom');
    const roomKey = randomRoom();
    socket.emit('roomKey', roomKey);
    console.log(`emitted ${roomKey}`);
  });

  socket.on('validateRoomKey', (roomKey) => {
    console.log('received validateRoomKey');
    const isValidRoomKey = validateRoomKey(roomKey);
    if (isValidRoomKey) {
      connectionRoomKey = roomKey;
    }
    socket.emit('isValidRoomKey', isValidRoomKey);
    console.log(`emitted ${isValidRoomKey} for ${roomKey}`);
  });

  socket.on('joinRoom', ({ name, task }) => {
    console.log(`received joinRoom with ${name} and ${task}`);
    const bears = rooms[connectionRoomKey].bears;
    for (let i = 0; i < bears.length; i++) {
      if (!bears[i]) {
        bears[i] = {
          name,
          task,
          bearEvent: {},
        };
        connectionBearKey = i;
        break;
      }
    }

    socket.join(connectionRoomKey);
    socket.emit('bears', bears);
    socket
      .to(connectionRoomKey)
      .emit('bearEvent', hiBear(bears, connectionBearKey));
    console.log(`emitted ${bears}`);
  });

  socket.on('getBears', (roomKey) => {
    console.log(`received getBears for ${roomKey}`);
    const bears = rooms[roomKey].bears;
    socket.emit('bears', bears);
    console.log(`emitted ${bears} for ${roomKey}`);
  });

  socket.on('disconnect', () => {
    console.log('received disconnect');
    const bears = rooms[connectionRoomKey]?.bears;
    const bearEvent = byeBear(bears, connectionBearKey);
    if (bearEvent) {
      socket.to(connectionRoomKey).emit('bearEvent', bearEvent);
    }
  });

  socket.on('byeBear', () => {
    console.log('received byeBear');
    const bears = rooms[connectionRoomKey]?.bears;
    const bearEvent = byeBear(bears, connectionBearKey);
    if (bearEvent) {
      console.log(socket.rooms);
      for (const socketRoomId in socket.rooms) {
        if (socket.id !== socketRoomId) {
          socket.leave(socketRoomId);
        }
      }
      socket.to(connectionRoomKey).emit('bearEvent', bearEvent);
    }
  });
});
