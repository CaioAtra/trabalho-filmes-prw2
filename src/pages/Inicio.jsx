import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

 
  useEffect(() => {
    api.get('')
      .then((res) => setFilmes(res.data))
      .catch(() => setErro('Não foi possível carregar os filmes. Verifique sua internet e a URL da API em src/api.js.'))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="titulo-pagina">Catálogo de Filmes</h1>
          <p className="subtitulo mb-0">Clique em um filme para ver todos os dados.</p>
        </div>
        <Link to="/criar" className="btn btn-primary">+ Novo filme</Link>
      </div>

      <section className="painel">
        {erro && <div className="alert alert-danger">{erro}</div>}
        {carregando && <p className="mb-0">Carregando filmes...</p>}

        {!carregando && !erro && filmes.length === 0 && (
          <p className="text-center py-4 mb-0">Nenhum filme cadastrado.</p>
        )}

        {}
        <div className="list-group">
          {filmes.map((filme) => (
            <Link
              key={filme.id}
              to={`/ler/${filme.id}`}
              className="list-group-item list-group-item-action"
            >
              <strong>Id:</strong> {filme.id}
              <span className="ms-4"><strong>Nome:</strong> {filme.nome}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
