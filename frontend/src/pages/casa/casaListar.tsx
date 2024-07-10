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
  Box, IconButton
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { deletarCasa, listarCasas } from "../../services/CasaService";
import { ICasa } from "../../models/ICasa";
import CustomButton from "../../components/CustomButtonListar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

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

  function novaCasa() {
    navigate('/casas/novo');
  }

  const columns: GridColDef[] = [
    {field: 'nome', headerName: 'Nome', width: 500},
    {
      field: 'actions',
      headerName: '',
      width: 40,
      renderCell: (params) => {
        return (
          <IconButton onClick={ () => editarCasa(params.row.id) }>
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
          <IconButton onClick={ () => deletarCasa(params.row.id) }>
            <CloseIcon fontSize="small"/>
          </IconButton>
        );
      },
    },
  ];

  return (
    <div style={ {display: 'flex'} }>
      <Sidebar/>
      <Box component="main" sx={ {flexGrow: 1, p: 0, marginLeft: 30} }>
        <Header userName="Usuário" title={ "Listar Casas" }/>
        <Container>
          <Box sx={ {display: 'flex', justifyContent: 'flex-end', margin: '20px 0 20px 0'} }>
            <CustomButton text={ "ADICIONAR UMA CASA" } onClick={ novaCasa }/>
          </Box>
          <div style={ {height: 600, width: '100%', background: 'white'} }>
            <DataGrid
              rows={ casas }
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
}

export default CasaListar;
