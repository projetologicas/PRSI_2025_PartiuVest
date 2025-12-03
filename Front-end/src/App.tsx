import { useState } from 'react'
import './style/App.css'
import Router from './Router'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router/>
  );
}

export default App
