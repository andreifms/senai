import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { IEspecializacao } from "../../models/IEspecializacao";
import {
  atualizarEspecializacao,
  cadastrarEspecializacao,
  getEspecializacaoPorId
} from "../../services/EspecializacaoService";
import { especializacaoSchema } from "../../validationSchemas/especializacaoSchema";

function EspecilizacaoForm() {
  const [initialValues, setInitialValues] = useState<IEspecializacao>({
    nome: ''
  });

  const history = useNavigate();
  const {id} = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      // Fetch the book data if in edit mode
      getEspecializacaoPorId(Number(id)).then((casa) => {
        setInitialValues({
          nome: casa.nome
        });
      }).catch(error => {
        console.error('Erro ao buscar especialização:', error);
      });
    }
  }, [id]);

  async function handleSubmit(values: IEspecializacao, {setSubmitting}: FormikHelpers<IEspecializacao>) {
    console.log("Submitting form", values);
    try {
      if (id) {
        await atualizarEspecializacao(Number(id), values);
      } else {
        await cadastrarEspecializacao(values);
      }
      history('/especializacoes');
    } catch (error) {
      console.error('Erro ao salvar especialização:', error);
    }
    setSubmitting(false);
  }

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title="Cadastro de Especialização"/>
        <Container>
          <Formik
            enableReinitialize
            initialValues={ initialValues }
            validationSchema={ especializacaoSchema }
            onSubmit={ handleSubmit }
          >
            { ({isSubmitting}) => (
              <Form>
                <Field as={ TextField } label="Nome" name="nome" fullWidth margin="normal"
                       helperText={ <ErrorMessage name="nome"/> }/>
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

export default EspecilizacaoForm;
