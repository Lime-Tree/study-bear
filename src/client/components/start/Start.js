import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App.js';
import './Start.css';

const Start = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [isCreateRoomHovered, setIsCreateRoomHovered] = useState(false);
  const [isRandomRoomHovered, setIsRandomRoomHovered] = useState(false);

  useEffect(() => {
    socket.on('roomKey', (roomKey) => {
      navigate(`/${roomKey}`);
    });
  }, []);

  const createRoom = () => {
    socket.emit('createRoom');
  };

  const randomRoom = () => {
    socket.emit('randomRoom');
  };

  return (
    <div className="start">
      <div className="hidden padding">Padding</div>
      <div
        className={`create-room-text button-info ${
          isCreateRoomHovered ? '' : 'hidden'
        }`}
      >
        Make a room
      </div>
      <div className="start-buttons">
        <ion-icon
          onMouseOver={() => {
            setIsCreateRoomHovered(true);
          }}
          onMouseOut={() => {
            setIsCreateRoomHovered(false);
          }}
          onClick={createRoom}
          name="home"
        />
        <ion-icon
          onMouseOver={() => {
            setIsRandomRoomHovered(true);
          }}
          onMouseOut={() => {
            setIsRandomRoomHovered(false);
          }}
          onClick={randomRoom}
          name="dice"
        />
      </div>
      <div
        className={`random-room-text button-info ${
          isRandomRoomHovered ? '' : 'hidden'
        }`}
      >
        Visit a room
      </div>
      <div className="hidden padding">Padding</div>
    </div>
  );
};

export default Start;
