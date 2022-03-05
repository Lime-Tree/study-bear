import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App.js';
import './Start.css';

const Start = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

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
      <ion-icon onClick={createRoom} name="home" />
      <ion-icon onClick={randomRoom} name="dice" />
    </div>
  );
};

export default Start;
