import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout.js";
import Cadastro from './pages/index.js';
import Pessoas from './pages/pessoas/index.js';
import UFs from './pages/ufs/index.js';
import Municipios from './pages/municipios/index.js';
import Bairros from './pages/bairros/index.js';
import NotFound from './pages/NotFound.js';
import Navbar from './Layouts/Navbar.js';
import './App.css';
import UFsEdit from './pages/ufs/components/UFs-Edit.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes path="/" element={<Layout />}>
              <Route index element={<Cadastro />}/>
              <Route path="pessoas" element={<Pessoas />} />
              <Route path="ufs" element={<UFs />} />
              <Route path="ufs/*" element={<UFsEdit />} />
              <Route path="municipios" element={<Municipios />} />
              <Route path="bairros" element={<Bairros />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
