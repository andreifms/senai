import { IEspecializacao } from './IEspecializacao';
import { ICasa } from './ICasa';

export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  CPF: string;
  celular: string;
  especializacaoId: number;
  especializacao?: IEspecializacao;
  casaId: number;
  casa?: ICasa;
  createdAt?: Date;
  updatedAt?: Date;
}

