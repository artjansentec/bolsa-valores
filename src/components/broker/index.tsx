import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Input, FormControl, Typography, MenuItem, Select, InputLabel } from '@mui/material';
import imgLogo from '../../img/XPLogo.jpg'
import { useState } from 'react';
import axios from 'axios';

const acoesNames = [
  "ABEV3", "PETR4", "VALE5", "ITUB4", "BBDC4", "BBAS3", "CIEL3", "PETR3", "HYPE3", "VALE3", "BBSE3", "CTIP3", "GGBR4", "FIBR3", "RADL3"
];

function Broker() {
  const [Acao, setAcao] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Valor, setValor] = useState("");
  const [Quantidade, setQuantidade] = useState("");

  function handleTipo(event) {
    setTipo(event.target.value);
  }

  function handleAcao(event) {
    setAcao(event.target.value);
  }

  function handleValor(event) {
    setValor(event.target.value);
  }

  function handleQuantidade(event) {
    setQuantidade(event.target.value);
  }

  function handleEnvia() {
    if (!Tipo || !Acao || !Valor || !Quantidade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const data = {
      codigoAcao: Acao,
      quantidade: Quantidade,
      valor: Valor,
      corretora: "XPTO"
    };

    axios.post('https://rabbitmq-bolsadevalores.onrender.com/' + Tipo, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro ao enviar mensagem para a fila RabbitMQ:', error);
      });
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <img src={imgLogo} alt="" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Tipo do aporte
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="tipo-aporte-label">Tipo</InputLabel>
            <Select
              labelId="tipo-aporte-label"
              id="tipo-aporte"
              label="Tipo"
              value={Tipo}
              onChange={handleTipo}
            >
              <MenuItem key={'comprar'} value={'comprar'}>
                {'Comprar'}
              </MenuItem>

              <MenuItem key={'vender'} value={'vender'}>
                {'Vender'}
              </MenuItem>
            </Select>
          </FormControl>
          <br /> <br />

          <Typography component="h1" variant="h5">
            Escolha uma Ação
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="escolha-acao-label">Ações</InputLabel>
            <Select
              labelId="escolha-acao-label"
              id="escolha-acao"
              label="Acao"
              value={Acao}
              onChange={handleAcao}
            >
              {acoesNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br /> <br />

          <Typography component="h1" variant="h5">
            Valor Ação
          </Typography>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="valor-acao">Valor</InputLabel>
            <Input id="valor-acao" type={'number'} onChange={handleValor} />
          </FormControl>
          <br /> <br />

          <Typography component="h1" variant="h5">
            Quantidade Ação
          </Typography>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="Quantidade-acao">Quantidade</InputLabel>
            <Input id="Quantidade-acao" type={'number'} onChange={handleQuantidade} />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            onClick={handleEnvia}
            sx={{ mt: 3, mb: 2, width: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Broker;
