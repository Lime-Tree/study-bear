import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../App';
import Room from '../room/Room';
import './Intro.css';

const Intro = () => {
  const socket = useContext(SocketContext);
  const [phase, setPhase] = useState(0);
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [bears, setBears] = useState();

  useEffect(() => {
    socket.on('bears', (bears) => {
      setBears(bears);
    });
  }, []);

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (phase === 1) {
        setTimeout(() => {
          socket.emit('joinRoom', { name, task });
        }, 3000);

        setPhase(phase + 1);
      } else {
        setPhase(phase + 1);
      }
    }
  };

  const getOnChange = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };

  return (
    <div>
      {!bears && phase === 0 && (
        <div className="intro">
          <div className="prompt">What's your name?</div>
          <input
            onKeyPress={onKeyPress}
            onChange={getOnChange(setName)}
            type="text"
            maxLength={20}
            spellCheck={false}
            autoFocus={true}
          ></input>
        </div>
      )}
      {!bears && phase === 1 && (
        <div className="intro">
          <div className="prompt">What are you working on?</div>
          <input
            onKeyPress={onKeyPress}
            onChange={getOnChange(setTask)}
            type="text"
            maxLength={100}
            spellCheck={false}
            autoFocus={true}
          ></input>
        </div>
      )}
      {!bears && phase === 2 && <div className="intro">Good luck!</div>}
      {bears && <Room bearProps={bears} />}
    </div>
  );
};

export default Intro;
