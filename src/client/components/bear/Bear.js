import { bearSprites } from '../../util/sprites.js';
import './Bear.css';

const Bear = ({ isActive, index, bearEvent, isHovered }) => {
  return isActive ? (
    <div className={`bear bear${index} ${isHovered ? 'hover' : ''}`}>
      <img draggable={false} src={bearSprites[index]} alt="bear" />
    </div>
  ) : null;
};

export default Bear;
