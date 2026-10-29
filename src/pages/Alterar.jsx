import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { erroNaoEncontrado } from '../api';

export default function Alterar() {
  const [idDigitado, setIdDigitado] = useState('');

  const [etapa, setEtapa] = useState('procurar');
  const [filme, setFilme] = useState(null);
  const [valores, setValores] = useState({ nome: '', genero: '', ano: '' });
  const [erro, setErro] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [salvando, setSalvando] = useState(false);
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
        setValores({
          nome: res.data.nome || '',
          genero: res.data.genero || '',
          ano: res.data.ano || ''
        });
        setEtapa('editar');
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

  function atualizarCampo(event) {
    setValores({ ...valores, [event.target.name]: event.target.value });
  }

  function handleUpdate(event) {
    event.preventDefault();
    setSalvando(true);
    setErro('');


    api.put(`/${encodeURIComponent(filme.id)}`, valores)
      .then(() => navigate('/'))
      .catch(() => {
        setErro('Não foi possível atualizar o filme. Tente novamente.');
        setSalvando(false);
      });
  }

  return (
    <section className="painel">
      <h1 className="titulo-pagina">Alterar filme</h1>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {etapa === 'procurar' && (
        <>
          <p className="subtitulo">Digite o ID do filme que deseja alterar.</p>
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

      {etapa === 'editar' && (
        <>
          <p className="subtitulo">Edite os dados e clique em Alterar.</p>
          <form onSubmit={handleUpdate}>
            <p className="text-success">Filme encontrado — ID {filme.id}</p>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input id="nome" name="nome" className="form-control" value={valores.nome} onChange={atualizarCampo} required />
            </div>
            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Gênero</label>
              <input id="genero" name="genero" className="form-control" value={valores.genero} onChange={atualizarCampo} required />
            </div>
            <div className="mb-4">
              <label htmlFor="ano" className="form-label">Ano</label>
              <input id="ano" name="ano" className="form-control" value={valores.ano} onChange={atualizarCampo} required />
            </div>
            <button className="btn btn-primary" disabled={salvando}>{salvando ? 'Salvando...' : 'Alterar'}</button>
            <Link to="/" className="btn btn-secondary ms-2">Cancelar</Link>
          </form>
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
