import { bearSprites } from '../../util/sprites.js';
import './Bear.css';

const Bear = ({ isActive, index, bearEvent }) => {
  return isActive ? (
    <div className={'bear'}>
      <img draggable={false} src={bearSprites[index]} alt="bear" />
    </div>
  ) : null;
};

export default Bear;
