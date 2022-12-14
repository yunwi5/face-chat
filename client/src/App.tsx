import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import ChatRoom from './pages/ChatRoom';
import Home from 'pages/Home';
import Lobby from 'pages/Lobby';
import Header from 'layout/header/Header';
import Login from 'pages/auth/Login';
import SignUp from 'pages/auth/SignUp';
import Auth from 'pages/auth/Auth';

function App() {
    const pathname = useLocation().pathname;

    return (
        <div className="App">
            {includeDefaultHeader(pathname) ? <Header /> : null}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video-chat/:id" element={<ChatRoom />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route element={<Auth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}

function includeDefaultHeader(pathname: string) {
    const excludeRoutes = ['/video-chat/'];
    for (const excRoute of excludeRoutes) {
        if (pathname.includes(excRoute)) return false;
    }
    return true;
}

export default App;
