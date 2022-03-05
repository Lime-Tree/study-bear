import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Intro from '../intro/Intro.js';
import { SocketContext } from '../../App';

const Queue = () => {
  const { roomKey } = useParams();
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('isValidRoomKey', (isValidRoomKey) => {
      if (isValidRoomKey) {
        setIsLoading(false);
      } else {
        navigate('/');
      }
    });

    socket.emit('validateRoomKey', roomKey);
  }, []);

  return !isLoading && <Intro />;
};

export default Queue;
