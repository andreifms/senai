import * as Yup from 'yup';

export const casaSchema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
});
