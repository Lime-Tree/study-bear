import { useState, useEffect, useContext } from 'react';
import Bears from '../bears/Bears.js';
import Menu from '../menu/Menu.js';
import Clock from '../clock/Clock.js';
import { SocketContext } from '../../App';
import { roomSprite } from '../../util/sprites';
import './Room.css';

const Room = ({ bearProps }) => {
  const socket = useContext(SocketContext);
  const [bears, setBears] = useState(bearProps);

  useEffect(() => {
    socket.on('bearEvent', (bears) => {
      setBears(bears);
    });
  }, []);

  return (
    <div className="screen">
      <div className="container">
        <Menu />
        <img className={'room'} src={roomSprite} alt="room" />
        <Bears bears={bears} />
        <Clock />
      </div>
    </div>
  );
};

export default Room;
