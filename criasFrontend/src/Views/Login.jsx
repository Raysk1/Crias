import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Container } from "@mui/system";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";

const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    if (this.state.form.username === "" || this.state.form.password === "") {
      Swal.fire("¡Error!", "Por favor, complete todos los campos", "error");
      return;
    }
    await axios
      .post("http://127.0.0.1:3010/login", {
        username: this.state.form.username,
        password: this.state.form.password,
      })
      .then((response) => {
        console.log(response)
        cookies.set("id", response.data.id, { path: "/" });
        cookies.set("nombre", response.data.nombre ,{ path: "/" });
        cookies.set("id_tipo_usuario", response.data.id_tipo_usuario, { path: "/" });
        cookies.set("username", response.data.username, { path: "/" });
        
        Swal.fire(
          "¡Bienvenido!",
          `${response.data.nombre}`,
          "success"
        ).then(() => {
          window.location.href = "/";
        });
        
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "¡Error!",
          `Ha ocurrido un error: ${error.response.data.error}`,
          "error"
        );
      });
  };


  render() {
    return (
      <Container maxWidth="sm">
        <Box mt={10}>
          <Card variant="outlined">
            <CardContent>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Usuario"
                      name="username"
                      size="small"
                      autoComplete="username"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => this.iniciarSesion()}
                    >
                      Iniciar Sesión
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }
}

export default Login;
