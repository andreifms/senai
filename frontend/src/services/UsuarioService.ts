import api from '../api';
import { IUsuario } from "../models/IUsuario";

export const listarUsuarios = async () => {
  try {
    // const url = `${api.defaults.baseURL}autores`;
    // console.log('URL completa:', url);
    const response = await api.get('usuarios');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsuarioPorId = async (id: number) => {
  try {
    const response = await api.get<IUsuario>(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastrarUsuario = async (Usuario: any) => {
  try {
    const response = await api.post('/usuarios', Usuario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const atualizarUsuario = async (id: number, Usuario: IUsuario) => {
  try {
    const response = await api.put(`/usuarios/${id}`, Usuario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletarUsuario = async (id: number | undefined) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
