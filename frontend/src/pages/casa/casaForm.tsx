import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { getCasaPorId, cadastrarCasa, atualizarCasa } from '../../services/CasaService';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { ICasa } from "../../models/ICasa";
import { casaSchema } from "../../validationSchemas/casaSchema";

function CasaForm() {
  const [initialValues, setInitialValues] = useState<ICasa>({
    nome: ''
  });

  const history = useNavigate();
  const {id} = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getCasaPorId(Number(id)).then((casa) => {
        setInitialValues({
          nome: casa.nome
        });
      }).catch(error => {
        console.error('Erro ao buscar casa:', error);
      });
    }
  }, [id]);

  async function handleSubmit(values: ICasa, {setSubmitting}: FormikHelpers<ICasa>) {
    console.log("Submitting form", values);
    try {
      if (id) {
        // console.log("dsada")
        await atualizarCasa(Number(id), values);
      } else {
        await cadastrarCasa(values);
      }
      history('/casas');
    } catch (error) {
      console.error('Erro ao salvar casa:', error);
    }
    setSubmitting(false);
  }

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title="Cadastro de Casa"/>
        <Container>
          <Formik
            enableReinitialize
            initialValues={ initialValues }
            validationSchema={ casaSchema }
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

export default CasaForm;
