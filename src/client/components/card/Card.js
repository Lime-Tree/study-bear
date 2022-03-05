import './Card.css';

const Card = ({ isActive, name, task }) => {
  return isActive ? (
    <div className="card">
      <div className="name">{name}</div>
      <div className="task">{task}</div>
    </div>
  ) : null;
};

export default Card;
