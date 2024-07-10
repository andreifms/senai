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
import { listarUsuarios, deletarUsuario } from "../../services/UsuarioService";
import { IUsuario } from "../../models/IUsuario";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButtonListar";

function UsuarioListar() {

  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarUsuarios().then((response) => {
      console.log(response);
      setUsuarios(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  async function editarUsuario(id: number | undefined) {
    console.log('Editando usuário com id:', id);
    navigate(`/usuarios/editar/${ id }`);

  }

  async function deletarUsuario(id: number | undefined) {
    console.log('Deletando usuário com id:', id);
    await deletarUsuario(id).then(() => {
      listarUsuarios().then((response) => {
        setUsuarios(response);
      });
    });
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title={ "Listar Usuários" }/>
        <Container>
          <Link to={ "/usuarios/novo" }>
            <Button variant="contained" color="primary" style={ {margin: '20px 0'} }>
              Adicionar Usuário
            </Button>
          </Link>
          <TableContainer component={ Paper }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { usuarios.map((usuario) => (
                  <TableRow key={ usuario.id }>
                    <TableCell>{ usuario.nome }</TableCell>
                    <TableCell>{ usuario.CPF }</TableCell>
                    <TableCell>{ usuario.email }</TableCell>
                    <TableCell>{ usuario.celular }</TableCell>
                    <TableCell>
                      <Box display="flex" gap={ 1 }>
                        <CustomButton text={ 'Editar' } color={ 'secondary' } onClick={ () => editarUsuario(usuario.id) }/>
                        <CustomButton text={ 'Deletar' } color={ 'secondary' } onClick={ () => deletarUsuario(usuario.id) }/>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </div>
  );
}

export default UsuarioListar;
