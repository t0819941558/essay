import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const handleBtnClick = () => {
    setCount(count + 1);
  };
  const clickCb = () => {
    console.log("clickCb count", count);
  };
  useEffect(() => {
    if (count === 0) {
      handleBtnClick();
    }
    document.addEventListener("click", clickCb);
    return () => document.removeEventListener("click", clickCb);
  }, []);
  return (
    <>
      <button onClick={handleBtnClick}>+1</button>
      <span>count:{count}</span>
    </>
  );
}

export default App
