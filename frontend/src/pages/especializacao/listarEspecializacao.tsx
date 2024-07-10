import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {
  Container,
  Box, IconButton
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { deletarEspecializacao, listarEspecializacoes } from "../../services/EspecializacaoService";
import { IEspecializacao } from "../../models/IEspecializacao";
import CustomButton from "../../components/CustomButtonListar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

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

  function novaEspecializacao() {
    navigate('/especializacoes/novo');
  }

  const columns: GridColDef[] = [
    {field: 'nome', headerName: 'Nome', width: 400},
    {
      field: 'actions',
      headerName: '',
      width: 40,
      renderCell: (params) => {
        return (
          <IconButton onClick={ () => editarEsp(params.row.id) }>
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
          <IconButton onClick={ () => deletarEsp(params.row.id) }>
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
        <Header userName="Usuário" title={ "Listar Especializações" }/>
        <Container>
          <Box sx={ {display: 'flex', justifyContent: 'flex-end', margin: '20px 0 20px 0'} }>
            <CustomButton text={ "ADICIONAR UMA ESPECIALIZAÇÃO" } onClick={ novaEspecializacao }/>
          </Box>
          <div style={ {height: 600, width: '100%', background: 'white'} }>
            <DataGrid
              rows={ especializacoes }
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

export default ListarEspecializacoes;
