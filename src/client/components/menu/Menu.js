import './Menu.css';

const Menu = () => {
  return (
    <div className="overlay">
      <div className="menu">
        <div className="back">
          <ion-icon name="arrow-back" />
        </div>
        <div className="share">
          <ion-icon name="share-social" />
        </div>
        <div className="mute">
          <ion-icon name="volume-mute"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Menu;
