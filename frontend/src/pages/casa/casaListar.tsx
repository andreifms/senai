import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { deletarCasa, listarCasas } from "../../services/CasaService";
import { ICasa } from "../../models/ICasa";
import CustomButton from "../../components/CustomButtonListar";

function CasaListar() {

  const [casas, setCasas] = useState<ICasa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarCasas().then((response) => {
      console.log(response);
      setCasas(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  async function editarCasa(id: number | undefined) {
    console.log('Editando casa com id:', id);
    navigate(`/casas/editar/${ id }`);
  }

  async function excluirCasa(id: number | undefined) {
    console.log('Deletando livro com id:', id);
    await deletarCasa(id).then(() => {
      listarCasas().then((response) => {
        setCasas(response);
      });
    });
  }

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title={ "Listar Casas" }/>
        <Container>
          <Link to={ '/casas/novo' }>
            <Button variant="contained" color="primary" style={ {margin: '20px 0'} }>
              Adicionar Casa
            </Button>
          </Link>
          <TableContainer component={ Paper }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { casas.map((casa) => (
                  <TableRow key={ casa.id }>
                    <TableCell>{ casa.nome }</TableCell>
                    <TableCell>
                      <Box display="flex" gap={ 1 }>
                        <CustomButton text={ 'Editar' } color={ 'secondary' } onClick={ () => editarCasa(casa.id) }/>
                        <CustomButton text={ 'Deletar' } color={ 'secondary' } onClick={ () => excluirCasa(casa.id) }/>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
}

export default CasaListar;
