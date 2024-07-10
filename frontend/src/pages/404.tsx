import { Box, Container } from "@mui/material";

function Pagina404() {
  return (
    <div style={ {display: 'flex'} }>
      <Box component="main" sx={ {flexGrow: 1, p: 3} }>
        <Container>
          <h1>404 - Página não encontrada</h1>
        </Container>
      </Box>
    </div>
  );
}

export default Pagina404;
