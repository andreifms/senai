import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {
  Container,
  Box, IconButton
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { listarUsuarios, deletarUsuario } from "../../services/UsuarioService";
import { IUsuario } from "../../models/IUsuario";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButtonListar";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

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

  function novoUsuario() {
    navigate('/usuarios/novo');
  }

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerName: 'Data',
      width: 130,
      valueGetter: (value, row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',
    },
    {field: 'nome', headerName: 'Nome', width: 220},
    {
      field: 'casaNome',
      headerName: 'Casa',
      width: 100,
      valueGetter: (value, row) => row.casa?.nome || 'N/A',
    },
    {
      field: 'especializacaoNome',
      headerName: 'Especialização',
      width: 200,
      valueGetter: (value, row) => row.especializacao?.nome || 'N/A',
    },
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'celular', headerName: 'Celular', width: 120},
    {
      field: 'actions',
      headerName: '',
      width: 40,
      renderCell: (params) => {
        return (
          <IconButton onClick={ () => editarUsuario(params.row.id) }>
            <EditIcon fontSize="small"/>
          </IconButton>
        );
      },
    },
    {
      field: 'actions2',
      headerName: '',
      width: 40,
      renderCell: (params) => {
        return (
          <IconButton onClick={ () => deletarUsuario(params.row.id) }>
            <CloseIcon fontSize="small"/>
          </IconButton>
        );
      },
    },
  ];


  return (
    <div style={ {display: 'flex', background: '#C6C6C682'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title="RELATÓRIO DE INSCRIÇÕES"/>
        <Container>
          <Box sx={ {display: 'flex', justifyContent: 'flex-end', margin: '20px 0 20px 0'} }>
            <CustomButton text={ "ADICIONAR UMA INSCRIÇÃO" } onClick={ novoUsuario }/>
          </Box>
          <div style={ {height: 600, width: '100%', background: 'white'} }>
            <DataGrid
              rows={ usuarios }
              columns={ columns }
              initialState={ {
                pagination: {
                  paginationModel: {page: 0, pageSize: 5},
                },
              } }
              pageSizeOptions={ [5, 10, 20] }
              checkboxSelection
            />
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default UsuarioListar;
