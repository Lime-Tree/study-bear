import { useEffect, useState } from 'react';
import './Clock.css';

const Clock = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  }, []);

  const getTime = (seconds) => {
    return new Date(1000 * seconds).toISOString().slice(11, 19);
  };

  return <div className="clock">{getTime(seconds)}</div>;
};

export default Clock;
