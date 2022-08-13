import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ChatRoom from './pages/ChatRoom';
import Home from 'pages/Home';
import Lobby from 'pages/Lobby';
import Header from 'layout/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video-chat/:id" element={<ChatRoom />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
