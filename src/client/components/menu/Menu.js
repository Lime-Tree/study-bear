import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App.js';

import './Menu.css';

const songs = [
  'https://archive.org/download/LazyDays/Dancing%20Days-225516546.mp3',
  'https://archive.org/download/LazyDays/See%20ya...-284566004.mp3',
  'https://archive.org/download/LazyDays/TORIMICHI-212341505.mp3',
  'https://archive.org/download/LazyDays/Timeless-295269723.mp3',
  'https://archive.org/download/LazyDays/c%20h%20e%20r%20r%20y-202895115.mp3',
  'https://archive.org/download/LazyDays/darling-245961785.mp3',
  'https://archive.org/download/LazyDays/flowerz-296630766.mp3',
  'https://archive.org/download/LazyDays/piano%20loop-272298067.mp3',
  'https://archive.org/download/LazyDays/x%20jhfly-273471368.mp3',
  'https://ia904505.us.archive.org/3/items/lofi-wn9vy8/PZA%20-%20%E3%82%BC%E3%83%AB%E3%83%80%E3%81%AE%20lofi%20-%2002%20%E3%82%AA%E3%83%A9%E3%82%AF%E3%83%AB%E3%83%BB%E3%82%AA%E3%83%96%E3%83%BB%E3%82%B7%E3%83%BC%E3%82%BA%E3%83%B3%E3%82%BA.mp3',
  'https://ia804505.us.archive.org/3/items/lofi-wn9vy8/PZA%20-%20%E3%82%BC%E3%83%AB%E3%83%80%E3%81%AE%20lofi%20-%2005%20%E5%B9%B4%E4%BB%A3%E3%81%AE%E3%82%AA%E3%83%A9%E3%82%AF%E3%83%AB.mp3',
];

let audios = [];
let currentAudio;
for (let i = 0; i < songs.length; i++) {
  const audio = new Audio(songs[i]);
  if (i === songs.length - 1) {
    audio.onended = () => {
      audios[0].play();
      currentAudio = audios[0];
    };
  } else {
    audio.onended = () => {
      audios[i + 1].play();
      currentAudio = audios[i + 1];
    };
  }
  audios.push(audio);
}
currentAudio = audios[0];

const Menu = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onBack = () => {
    currentAudio.fastSeek(0);
    currentAudio.pause();
    socket.emit('byeBear');
    navigate('/');
  };

  const onShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
  };

  const onSound = () => {
    console.log(currentAudio);
    if (isMuted) {
      currentAudio.muted = false;
      if (!isPlaying) {
        setIsPlaying(true);
        currentAudio.play();
      }
    } else {
      currentAudio.muted = true;
    }
    setIsMuted(currentAudio.muted);
  };

  return (
    <div className="overlay">
      <div className="menu">
        <div className="back" onClick={onBack}>
          <ion-icon name="arrow-back" />
        </div>
        <div className="share" onClick={onShare}>
          {isShared ? (
            <ion-icon name="share-social-sharp" />
          ) : (
            <ion-icon name="share-social" />
          )}
        </div>
        <div className="mute" onClick={onSound}>
          {isMuted ? (
            <ion-icon name="volume-mute"></ion-icon>
          ) : (
            <ion-icon name="volume-high"></ion-icon>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
