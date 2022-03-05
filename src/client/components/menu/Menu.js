import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../App.js';

import './Menu.css';

const songs = [
  'https://archive.org/download/LazyDays/Dancing%20Days-225516546.mp3',
  'https://archive.org/download/LazyDays/Euphoria%20%28summer%20vibes%29-220464909.mp3',
  'https://archive.org/download/LazyDays/Feelinlonely-256845327.mp3',
  'https://archive.org/download/LazyDays/Just%20that.-285534785.mp3',
  'https://archive.org/download/LazyDays/Look%20%40%20me-250100913.mp3',
  'https://archive.org/download/LazyDays/See%20ya...-284566004.mp3',
  'https://archive.org/download/LazyDays/TORIMICHI-212341505.mp3',
  'https://archive.org/download/LazyDays/Time-193318601.mp3',
  'https://archive.org/download/LazyDays/Timeless-295269723.mp3',
  'https://archive.org/download/LazyDays/c%20h%20e%20r%20r%20y-202895115.mp3',
  'https://archive.org/download/LazyDays/darling-245961785.mp3',
  'https://archive.org/download/LazyDays/don%27t%20i%20make%20it%20look%20easy-325154000.mp3',
  'https://archive.org/download/LazyDays/exhale-292776010.mp3',
  'https://archive.org/download/LazyDays/flowerz-296630766.mp3',
  'https://archive.org/download/LazyDays/i%20know%20where%20i%27m%20going-290878588.mp3',
  'https://archive.org/download/LazyDays/im%20closing%20my%20eyes%20%28feat.%20shiloh%29-313534719.mp3',
  'https://archive.org/download/LazyDays/let.go%20%5Bone%20for%20jun%5D-193124657.mp3',
  'https://archive.org/download/LazyDays/piano%20loop-272298067.mp3',
  'https://archive.org/download/LazyDays/s%20w%20e%20e%20t%20.s%20o%20u%20-295693652.mp3',
  'https://archive.org/download/LazyDays/uber%20to%20your%20place-313356371.mp3',
  'https://archive.org/download/LazyDays/whats.left-272376156.mp3',
  'https://archive.org/download/LazyDays/x%20jhfly-273471368.mp3',
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
