import React from "react";
import "./App.css";
import UserRegistration from "./Components/UserRegistration";
import GreenLightRedLightGame from "./Components/GreenLightRedLightGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/game" element={<GreenLightRedLightGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
