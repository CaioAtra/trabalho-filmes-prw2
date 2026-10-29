import { Link, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Ler from './pages/Ler';
import Criar from './pages/Criar';
import Alterar from './pages/Alterar';
import Apagar from './pages/Apagar';

function Cabecalho() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🎬 CineCatálogo</Link>
        <div className="navbar-nav flex-row flex-wrap gap-2">
          <Link className="nav-link" to="/">Início</Link>
          <Link className="nav-link" to="/criar">Criar</Link>
          <Link className="nav-link" to="/alterar">Alterar</Link>
          <Link className="nav-link" to="/apagar">Apagar</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Cabecalho />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ler/:id" element={<Ler />} />
          <Route path="/criar" element={<Criar />} />
          <Route path="/alterar" element={<Alterar />} />
          <Route path="/apagar" element={<Apagar />} />
        </Routes>
      </main>
      <footer className="text-center text-secondary py-4">
        PRW2 — Catálogo de Filmes
      </footer>
    </>
  );
}
