import { IUsuario } from './IUsuario';

export interface ICasa {
  id?: number;
  nome: string;
  usuarios?: IUsuario[];
}
