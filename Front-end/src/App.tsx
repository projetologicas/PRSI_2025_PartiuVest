import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UploadProva from "./UploadProva";

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/homeAluno" element={<HomeAluno/>} />
              <Route path="/homeADM" element={<HomeADM/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/uploadProva" element={<UploadProva />} />
              <Route path="/dados" elemet={<Dados/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
