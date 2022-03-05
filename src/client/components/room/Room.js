import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Bear from '../bear/Bear.js';
import { SocketContext } from '../../App';
import { roomSprite } from '../../util/sprites';
import './Room.css';

const Room = ({ bearProps }) => {
  const socket = useContext(SocketContext);
  const [bears, setBears] = useState(bearProps);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('bearEvent', (bears) => {
      setBears(bears);
    });
  }, []);

  const onBack = () => {
    navigate('/');
  };

  const onShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <div className="container">
        <div className="buttons">
          <div className="left">
            <ion-icon onClick={onBack} name="arrow-back" />
            <ion-icon onClick={onShare} name="share-social" />
          </div>
          <div className="right"></div>
        </div>
        <img className={'room'} src={roomSprite} alt="room" />
        <Bear isActive={bears[0]} index={0} bearEvent={bears[0]?.bearEvent} />
        <Bear isActive={bears[1]} index={1} bearEvent={bears[1]?.bearEvent} />
        <Bear isActive={bears[2]} index={2} bearEvent={bears[2]?.bearEvent} />
        <Bear isActive={bears[3]} index={3} bearEvent={bears[3]?.bearEvent} />
        <Bear isActive={bears[4]} index={4} bearEvent={bears[4]?.bearEvent} />
        <Bear isActive={bears[5]} index={5} bearEvent={bears[5]?.bearEvent} />
        <Bear isActive={bears[6]} index={6} bearEvent={bears[6]?.bearEvent} />
      </div>
    </div>
  );
};

export default Room;
