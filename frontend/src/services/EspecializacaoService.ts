import api from '../api';

import { IEspecializacao } from "../models/IEspecializacao";


export const listarEspecializacoes = async () => {
  try {
    const response = await api.get('especializacoes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEspecializacaoPorId = async (id: number) => {
  try {
    const response = await api.get(`/especializacoes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastrarEspecializacao = async (Livro: IEspecializacao) => {
  try {
    // const url = `${api.defaults.baseURL}autores`;
    // console.log('URL completa:', url);
    // console.log('Livro:', Livro)
    const response = await api.post('especializacoes', Livro);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const atualizarEspecializacao = async (id: number, Especializacao: IEspecializacao) => {
  try {
    const response = await api.put(`/especializacoes/${id}`, Especializacao);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletarEspecializacao = async (id: number | undefined) => {
  try {
    const response = await api.delete(`/especializacoes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
