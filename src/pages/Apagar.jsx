import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { erroNaoEncontrado } from '../api';

export default function Apagar() {
  const [idDigitado, setIdDigitado] = useState('');

  const [etapa, setEtapa] = useState('procurar');
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [apagando, setApagando] = useState(false);
  const navigate = useNavigate();

  function procurarFilme(event) {
    event.preventDefault();
    const id = idDigitado.trim();
    if (!id) return;

    setErro('');
    setBuscando(true);

    api.get(`/${encodeURIComponent(id)}`)
      .then((res) => {
        setFilme(res.data);
        setEtapa('confirmar');
      })
      .catch((err) => {
        if (erroNaoEncontrado(err)) {
          setEtapa('naoEncontrado');
        } else {
          setErro('Não foi possível acessar a API. Verifique sua internet e tente novamente.');
        }
      })
      .finally(() => setBuscando(false));
  }

  function handleDelete() {
    const confirmar = window.confirm(`Tem certeza que deseja apagar "${filme.nome}"?`);
    if (!confirmar) return;

    setApagando(true);
    setErro('');
    // DELETE remove o registro da API.
    api.delete(`/${encodeURIComponent(filme.id)}`)
      .then(() => navigate('/'))
      .catch(() => {
        setErro('Não foi possível apagar o filme. Tente novamente.');
        setApagando(false);
      });
  }

  return (
    <section className="painel">
      <h1 className="titulo-pagina">Apagar filme</h1>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {etapa === 'procurar' && (
        <>
          <p className="subtitulo">Digite o ID do filme que deseja apagar.</p>
          <form onSubmit={procurarFilme}>
            <div className="mb-3">
              <label htmlFor="idFilme" className="form-label">ID do filme</label>
              <input id="idFilme" className="form-control" value={idDigitado}
                onChange={(e) => setIdDigitado(e.target.value)} required />
            </div>
            <button className="btn btn-primary" disabled={buscando}>
              {buscando ? 'Procurando...' : 'Procurar'}
            </button>
            <Link to="/" className="btn btn-secondary ms-2">Cancelar</Link>
          </form>
        </>
      )}

      {etapa === 'confirmar' && (
        <>
          <p className="subtitulo">Confira os dados antes de apagar.</p>
          <div className="alert alert-danger">
            <strong>Este filme será apagado:</strong>
            <div>ID: {filme.id}</div>
            <div>Nome: {filme.nome}</div>
            <div>Gênero: {filme.genero}</div>
            <div>Ano: {filme.ano}</div>
          </div>
          <button className="btn btn-danger" onClick={handleDelete} disabled={apagando}>
            {apagando ? 'Apagando...' : 'Apagar'}
          </button>
          <Link to="/" className="btn btn-secondary ms-2">Cancelar</Link>
        </>
      )}

      {etapa === 'naoEncontrado' && (
        <>
          <div className="alert alert-warning">
            Não encontramos nenhum filme com o ID <strong>{idDigitado.trim()}</strong>.
          </div>
          <Link to="/" className="btn btn-primary">Voltar para o início</Link>
          <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => setEtapa('procurar')}>
            Procurar outro ID
          </button>
        </>
      )}
    </section>
  );
}
