import { useState } from 'react';
import Card from '../card/Card.js';
import './Hover.css';

const Hover = ({ name, task, index, hoverCallback }) => {
  const [isActive, setIsActive] = useState(false);

  const onMouseOver = () => {
    setIsActive(true);
    hoverCallback(true, index);
  };

  const onMouseOut = () => {
    setIsActive(false);
    hoverCallback(false, index);
  };

  return (
    <div>
      <button
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={`button button${index}`}
      ></button>
      <Card isActive={isActive} name={name} task={task} />
    </div>
  );
};

export default Hover;
