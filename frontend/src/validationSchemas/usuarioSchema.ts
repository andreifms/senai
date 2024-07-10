import * as Yup from 'yup';

export const usuarioSchema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
  CPF: Yup.string().required('O CPF é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
  celular: Yup.string().required('O celular é obrigatório'),
  casaId: Yup.number().required('O id da casa é obrigatório'),
  especializacaoId: Yup.number().required('O id da especialização é obrigatório')
});
