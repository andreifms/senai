import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { listarCasas } from "../../services/CasaService";
import { ICasa } from "../../models/ICasa";
import { IEspecializacao } from "../../models/IEspecializacao";
import { listarEspecializacoes } from "../../services/EspecializacaoService";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { usuarioSchema } from "../../validationSchemas/usuarioSchema";
import { atualizarUsuario, cadastrarUsuario } from "../../services/UsuarioService";
import { useNavigate } from "react-router-dom";
import { IUsuario } from "../../models/IUsuario";

function UsuarioFormSenai() {

  const navigate = useNavigate();
  const [casas, setCasas] = useState<ICasa[]>([]);
  const [especializacoes, setEspecializacoes] = useState<IEspecializacao[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      const responseCasas = await listarCasas();
      setCasas(responseCasas);
      const responseEsp = await listarEspecializacoes();
      setEspecializacoes(responseEsp);

    };
    fetchDados();
  }, []);

  const initialValues = {
    CPF: '',
    nome: '',
    email: '',
    celular: '',
    especializacaoId: 0,
    casaId: 0
  };

  const handleSubmit = async (values: IUsuario, {setSubmitting}: FormikHelpers<IUsuario>) => {
    try {
      console.log("Submitting form", values);
      await cadastrarUsuario(values);
      navigate('/usuarios');
    } catch
      (error: any) {
      console.error('Erro ao salvar autor:', error);
    }
    setSubmitting(false);
  };

  return (
    <Container sx={ {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    } }>
      <Box sx={ {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '290px'
      } }>
        <Box sx={ {textAlign: 'center', marginBottom: '0.1rem'} }>
          <img src={ require("../../assets/logo.png") } alt="Logo"
               style={ {width: '200px', height: '200x', marginBottom: '0.1rem'} }/>
        </Box>
        <Typography
          sx={ {textAlign: 'center', marginBottom: '1rem', color: '#212427', fontSize: '1rem', fontWeight: '400'} }>
          Formulário de Inscrição de Voluntário na Campanha MS Pela Vida
        </Typography>
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
                label="CPF"
                name="CPF"
                placeholder="000.000.000-00"
                fullWidth
                inputProps={{ maxLength: 11 }}
                sx={ {marginBottom: '1rem'} }
              />
              <ErrorMessage name="CPF" component="div" render={(msg) =>
                <Box sx={{ color: 'red', marginBottom: '0.8rem'}}>{msg}</Box>} />

              <Field
                as={ TextField }
                label="Nome completo"
                name="nome"
                placeholder="Informe seu nome"
                fullWidth
                sx={ {marginBottom: '1rem'} }
              />
              <ErrorMessage name="nome" component="div" render={(msg) =>
                <Box sx={{ color: 'red', marginBottom: '0.8rem'}}>{msg}</Box>} />

              <Field
                as={ TextField }
                label="E-mail"
                name="email"
                placeholder="Informe seu e-mail institucional"
                fullWidth
                sx={ {marginBottom: '1rem'} }
              />
              <ErrorMessage name="email" component="div" render={(msg) =>
                <Box sx={{ color: 'red', marginBottom: '0.8rem'}}>{msg}</Box>} />

              <Field
                as={ TextField }
                label="Celular"
                name="celular"
                inputProps={{ maxLength: 11 }}
                placeholder="(67) 99999-9999"
                fullWidth
                sx={ {marginBottom: '1rem'} }
              />
              <ErrorMessage name="celular" component="div" render={(msg) =>
                <Box sx={{ color: 'red', marginBottom: '0.8rem'}}>{msg}</Box>} />

              <FormControl fullWidth sx={ {marginBottom: '1rem'} }>
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

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={ {marginTop: '1rem', backgroundColor: '#1976d2', color: 'white'} }
                disabled={ isSubmitting }
              >
                REALIZAR INSCRIÇÃO
              </Button>
            </Form>
          ) }
        </Formik>
      </Box>
    </Container>
  );
}

export default UsuarioFormSenai;
