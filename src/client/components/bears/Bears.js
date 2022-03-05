import { useState } from 'react';
import Bear from '../bear/Bear.js';
import Hover from '../hover/Hover.js';
import './Bears.css';

const Bears = ({ bears }) => {
  const [bearHoverIndex, setBearHoverIndex] = useState();

  const hoverCallback = (isMouseOverEvent, index) => {
    setBearHoverIndex(isMouseOverEvent ? index : null);
  };

  return (
    <div>
      {bears.map((bear, index) => {
        return (
          <Bear
            isActive={bear}
            index={index}
            bearEvent={bear?.bearEvent}
            isHovered={index === bearHoverIndex}
          />
        );
      })}
      <div className="overlay">
        {bears.map((bear, index) => {
          return bear ? (
            <Hover
              name={bear.name}
              task={bear.task}
              index={index}
              hoverCallback={hoverCallback}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Bears;
