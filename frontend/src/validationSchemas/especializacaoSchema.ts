import * as Yup from 'yup';

export const especializacaoSchema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
});
