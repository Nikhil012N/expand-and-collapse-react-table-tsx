import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Hookedform from "./Components/Hookform";

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="Home" element={<Home/>} />
    <Route path="Hookform" element={<Hookedform />} />
   </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
