import api from '../api';

import { ICasa } from "../models/ICasa";

export const listarCasas = async () => {
  try {
    const response = await api.get('/casas/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCasaPorId = async (id: number) => {
  try {
    const response = await api.get(`/casas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastrarCasa = async (Casa: ICasa) => {
  try {
    // const url = `${api.defaults.baseURL}autores`;
    // console.log('URL completa:', url);
    // console.log('Livro:', Livro)
    const response = await api.post('/casas/', Casa);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const atualizarCasa = async (id: number, Livro: ICasa) => {
  try {
    const response = await api.put(`/casas/${id}`, Livro);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletarCasa = async (id: number | undefined) => {
  try {
    const response = await api.delete(`/casas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
