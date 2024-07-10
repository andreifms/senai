import mongoose, { Schema, Document, Model } from 'mongoose';
import Autor from './autor';

interface ILivro {
  titulo: string;
  editora?: string;
  preco?: number;
  paginas?: number;
}

export default ILivro;
