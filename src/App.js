import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<><Banner /><Movies /></>} />
        <Route path='/favourite' exact element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
