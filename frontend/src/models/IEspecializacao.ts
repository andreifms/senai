import { IUsuario } from './IUsuario';

export interface IEspecializacao {
  id?: number;
  nome: string;
  usuarios?: IUsuario[];
  createdAt?: Date;
  updatedAt?: Date;
}
