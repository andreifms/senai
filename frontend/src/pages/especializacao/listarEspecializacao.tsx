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
import { deletarEspecializacao, listarEspecializacoes } from "../../services/EspecializacaoService";
import { IEspecializacao } from "../../models/IEspecializacao";
import CustomButton from "../../components/CustomButtonListar";

function ListarEspecializacoes() {

  const [especializacoes, setEspecializacoes] = useState<IEspecializacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarEspecializacoes().then((response) => {
      console.log(response);
      setEspecializacoes(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  async function editarEsp(id: number | undefined) {
    console.log('Editando especialização com id:', id);
    navigate(`/especializacoes/editar/${ id }`);
  }

  async function deletarEsp(id: number | undefined) {
    console.log('Deletando especializacao com id:', id);
    await deletarEspecializacao(id).then(() => {
      listarEspecializacoes().then((response) => {
        setEspecializacoes(response);
      });
    });
  }

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title={ "Listar Especializações" }/>
        <Container>
          <Link to={ '/especializacoes/novo' }>
            <Button variant="contained" color="primary" style={ {margin: '20px 0'} }>
              Adicionar Especialização
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
                { especializacoes.map((esp) => (
                  <TableRow key={ esp.id }>
                    <TableCell>{ esp.nome }</TableCell>
                    <TableCell>
                      <Box display="flex" gap={ 1 }>
                        <CustomButton text={ 'Editar' } color={ 'secondary' } onClick={ () => editarEsp(esp.id) }/>
                        <CustomButton text={ 'Deletar' } color={ 'secondary' } onClick={ () => deletarEsp(esp.id) }/>
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

export default ListarEspecializacoes;
