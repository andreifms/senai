import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAutor extends Document {
  nome: string;
  nacionalidade?: string;
}

export default IAutor;
