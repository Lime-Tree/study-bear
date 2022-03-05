import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './components/start/Start.js';
import Queue from './components/queue/Queue.js';
import io from 'socket.io-client';

const SocketContext = React.createContext();
const socket = io(
  window.location.href.includes('localhost') ? 'http://localhost:8080' : null
);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route path="/:roomKey" element={<Queue />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
export { SocketContext };
