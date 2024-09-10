// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import DrawingPage from './pages/DrawingPage';
import LandingPage from "./pages/LandingPage";
import CreateRoom from "./components/Forms/CreateRoom";
import RoomPage from "./pages/RoomPage"




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-room" element={<CreateRoom />} />
        {/* <Route path="/join-room" element={<JoinRoom socket={socket} setUser={setUser} />} /> */}
        <Route path="/:roomid" element={<RoomPage />} />
      </Routes>
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/new-drawing" element={<DrawingPage />} />
        <Route path="/drawing/:id" element={<DrawingPage />} />
      </Routes> */}
    </Router>
  );
}

export default App;
