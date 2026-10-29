import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Criar() {
  const [valores, setValores] = useState({ nome: '', genero: '', ano: '' });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const navigate = useNavigate();

  function atualizarCampo(event) {

    setValores({ ...valores, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);


    api.post('', valores)
      .then(() => navigate('/'))
      .catch(() => setErro('Não foi possível criar o filme. Verifique sua internet e a URL da API em src/api.js.'))
      .finally(() => setSalvando(false));
  }

  return (
    <section className="painel">
      <h1 className="titulo-pagina">Criar filme</h1>
      <p className="subtitulo">Preencha os dados para cadastrar um novo filme.</p>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nome">Nome</label>
          <input id="nome" name="nome" className="form-control" value={valores.nome} onChange={atualizarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="genero">Gênero</label>
          <input id="genero" name="genero" className="form-control" value={valores.genero} onChange={atualizarCampo} required />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="ano">Ano</label>
          <input id="ano" name="ano" className="form-control" value={valores.ano} onChange={atualizarCampo} required />
        </div>
        <button className="btn btn-primary" disabled={salvando}>{salvando ? 'Salvando...' : 'Criar'}</button>
        <Link to="/" className="btn btn-secondary ms-2">Cancelar</Link>
      </form>
    </section>
  );
}
