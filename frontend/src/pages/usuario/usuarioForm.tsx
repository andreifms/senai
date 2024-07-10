import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { getUsuarioPorId, cadastrarUsuario, atualizarUsuario } from '../../services/UsuarioService';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { IUsuario } from '../../models/IUsuario';
import { usuarioSchema } from "../../validationSchemas/usuarioSchema";
import { ICasa } from "../../models/ICasa";
import { IEspecializacao } from "../../models/IEspecializacao";
import { listarCasas } from "../../services/CasaService";
import { listarEspecializacoes } from "../../services/EspecializacaoService";

function UsuarioForm() {
  const history = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [casas, setCasas] = useState<ICasa[]>([]);
  const [especializacoes, setEspecializacoes] = useState<IEspecializacao[]>([]);

  const [initialValues, setInitialValues] = useState<IUsuario>({
    nome: '',
    email: '',
    CPF: '',
    celular: '',
    especializacaoId: 0,
    casaId: 0,
  });

  useEffect(() => {
    const fetchDados = async () => {
      const responseCasas = await listarCasas();
      setCasas(responseCasas);
      const responseEsp = await listarEspecializacoes();
      setEspecializacoes(responseEsp);

    };
    fetchDados();

    if (id) {
      getUsuarioPorId(Number(id)).then((usuario) => {
        setInitialValues({
          nome: usuario.nome,
          email: usuario.email,
          CPF: usuario.CPF,
          celular: usuario.celular,
          especializacaoId: usuario.especializacaoId,
          casaId: usuario.casaId,
        });
        console.log('Usuario:', usuario);
      }).catch(error => {
        console.error('Erro ao buscar usuário:', error);
      });
    }
  }, [id]);

  const handleSubmit = async (values: IUsuario, {setSubmitting}: FormikHelpers<IUsuario>) => {
    try {
      if (id) {
        await atualizarUsuario(Number(id), values);
      } else {
        await cadastrarUsuario(values);
      }
      history('/usuarios');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
    setSubmitting(false);
  };

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title="Cadastro de Usuários"/>
        <Container>
          <Formik
            enableReinitialize
            initialValues={ initialValues }
            validationSchema={ usuarioSchema }
            onSubmit={ handleSubmit }
          >
            { ({isSubmitting}) => (
              <Form>
                <Field
                  as={ TextField }
                  label="Nome"
                  id="nome"
                  name="nome"
                  fullWidth
                  margin="normal"
                  helperText={ <ErrorMessage name="nome" component="div" render={ (msg) =>
                    <Box sx={ {color: 'red'} }>{ msg }</Box> }/> }
                />
                <Field
                  as={ TextField }
                  label="E-mail"
                  id="email"
                  name="email"
                  fullWidth
                  margin="normal"
                  helperText={ <ErrorMessage name="email" component="div" render={ (msg) =>
                    <Box sx={ {color: 'red'} }>{ msg }</Box> }/> }
                />
                <Field
                  as={ TextField }
                  label="CPF"
                  id="CPF"
                  name="CPF"
                  fullWidth
                  margin="normal"
                  inputProps={ {maxLength: 11} }
                  helperText={ <ErrorMessage name="CPF" component="div" render={ (msg) =>
                    <Box sx={ {color: 'red'} }>{ msg }</Box> }/> }
                />
                <Field
                  as={ TextField }
                  label="Celular"
                  id="celular"
                  name="celular"
                  fullWidth
                  margin="normal"
                  inputProps={ {maxLength: 11} }
                  helperText={ <ErrorMessage name="celular" component="div" render={ (msg) =>
                    <Box sx={ {color: 'red'} }>{ msg }</Box> }/> }
                />

                <FormControl fullWidth sx={ {marginBottom: '1.5rem', marginTop: '1.5rem'} }>
                  <InputLabel>Especialização</InputLabel>
                  <Field as={ Select } name="especializacaoId">
                    <MenuItem value="0">
                      <em>Clique para selecionar</em>
                    </MenuItem>
                    { especializacoes.map((esp) => (
                      <MenuItem key={ esp.id } value={ esp.id }>{ esp.nome }</MenuItem>
                    )) }
                  </Field>
                </FormControl>
                <ErrorMessage name="especializacaoId" component="div"/>

                <FormControl fullWidth sx={ {marginBottom: '1rem'} }>
                  <InputLabel>Casa</InputLabel>
                  <Field as={ Select } name="casaId">
                    <MenuItem value="0">
                      <em>Clique para selecionar</em>
                    </MenuItem>
                    { casas.map((casa) => (
                      <MenuItem key={ casa.id } value={ casa.id }>{ casa.nome }</MenuItem>
                    )) }
                  </Field>
                </FormControl>
                <ErrorMessage name="casaId" component="div"/>
                <Button type="submit" variant="contained" color="primary" disabled={ isSubmitting }
                        style={ {marginTop: 16} }>
                  Salvar
                </Button>
              </Form>
            ) }
          </Formik>
        </Container>
      </Box>
    </div>
  );
}

export default UsuarioForm;
