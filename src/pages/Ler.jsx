import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { erroNaoEncontrado } from '../api';

export default function Ler() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get(`/${encodeURIComponent(id)}`)
      .then((res) => setFilme(res.data))
      .catch((err) => {
        if (erroNaoEncontrado(err)) {
          setErro('Filme não encontrado. Confira o ID e tente novamente.');
        } else {
          setErro('Não foi possível acessar a API. Verifique sua internet e tente novamente.');
        }
      });
  }, [id]);

  return (
    <section className="painel">
      <h1 className="titulo-pagina">Dados do filme</h1>
      <p className="subtitulo">Informações completas do registro selecionado.</p>
      {erro && <div className="alert alert-warning">{erro}</div>}
      {!filme && !erro && <p>Buscando filme...</p>}
      {filme && (
        <dl className="row">
          <dt className="col-sm-3">ID</dt><dd className="col-sm-9">{filme.id}</dd>
          <dt className="col-sm-3">Nome</dt><dd className="col-sm-9">{filme.nome}</dd>
          <dt className="col-sm-3">Gênero</dt><dd className="col-sm-9">{filme.genero}</dd>
          <dt className="col-sm-3">Ano</dt><dd className="col-sm-9">{filme.ano}</dd>
        </dl>
      )}
      <Link to="/" className="btn btn-secondary mt-3">Cancelar</Link>
    </section>
  );
}
