// https://blog.logrocket.com/react-router-v6-guide/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CasaListar from "./pages/casa/casaListar";
import UsuarioListar from "./pages/usuario/usuarioListar";
import Pagina404 from "./pages/404";
import CasaForm from "./pages/casa/casaForm";
import UsuarioForm from "./pages/usuario/usuarioForm";
import EspecializacaoForm from "./pages/especializacao/especializacaoForm";
import ListarEspecializacoes from "./pages/especializacao/listarEspecializacao";
import UsuarioFormSenai from "./pages/usuario/usuarioCadastro";


function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ < UsuarioFormSenai/> }/>
        <Route path="/dashboard" element={ <  UsuarioFormSenai/> }/>
        <Route path="/casas" element={ <  CasaListar/> }/>
        <Route path="/casas/novo" element={ <  CasaForm/> }/>
        <Route path="/casas/editar/:id" element={ <  CasaForm/> }/>
        <Route path="/especializacoes" element={ <  ListarEspecializacoes/> }/>
        <Route path="/especializacoes/novo" element={ <  EspecializacaoForm/> }/>
        <Route path="/especializacoes/editar/:id" element={ <  EspecializacaoForm/> }/>
        <Route path="/usuarios" element={ <UsuarioListar/> }/>
        <Route path="/usuarios/novo" element={ <UsuarioForm/> }/>
        <Route path="/usuarios/editar/:id" element={ <UsuarioForm/> }/>

        <Route path="/usuarios/novo2/:id" element={ < UsuarioFormSenai/> }/>
        <Route path="*" element={ < Pagina404/> }/>
      </Routes>
    </Router>
  );
}

export default Rotas;
