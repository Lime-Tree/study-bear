import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../App';
import Room from '../room/Room';
import './Intro.css';

const encouragements = [
  'Keep it up!',
  'Hang in there!',
  'Stay strong!',
  'Keep pushing!',
  'Almost there!',
  'You can do it!',
  "You're awesome!",
  'Believe in yourself!',
  'Keep up the good work!',
  'Great work!',
  'Be proud of yourself!',
  "You're doing great!",
];

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

  const getEncouragement = () => {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  };

  const getOnChange = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };

  const onMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <div onMouseDown={onMouseDown}>
      {!bears && phase === 0 && (
        <div className="intro">
          <div className="prompt">My name is</div>
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
          <div className="prompt">I'm currently</div>
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
      {!bears && phase === 2 && (
        <div className="intro">{getEncouragement()}</div>
      )}
      {bears && <Room bearProps={bears} />}
    </div>
  );
};

export default Intro;
