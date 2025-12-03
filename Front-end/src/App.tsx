import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UploadProva from "./UploadProva";
import HomeAluno from "./HomeAluno";
import HomeADM from "./HomeADM";
import Dados from "./Dados";
import QuestionPage from './QuestionPage';

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
              <Route path="/fazerProva" element={<QuestionPage/>} />
              <Route path="/dados" element={<Dados/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
