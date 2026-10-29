import axios from 'axios';

const URL_FILMES = 'https://6ae375b6933120ae20f8cc75.mockapi.io/filmes/Filmes';

const api = axios.create({
  baseURL: URL_FILMES
});

export function erroNaoEncontrado(erro) {
  return erro.response?.status === 404;
}

export default api;
