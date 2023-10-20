import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function Formulario() {
  const [cria, setCria] = useState({
    proveedor: "",
    peso: "",
    costo: "",
    nombre: "",
    descripcion: "",
  });

  const actualizarCria = (campo, valor) => {
    setCria({ ...cria, [campo]: valor });
  };

  const enviarDatos = () => {
    if (
      cria.proveedor &&
      cria.peso &&
      cria.costo &&
      cria.nombre &&
      cria.descripcion
    ) {
      console.log(cria);
      axios
        .post("http://127.0.0.1:3010/crias/agregar", cria)
        .then(() => {
          Swal.fire({
            title: "¡Guardado!",
            text: "Los datos se han guardado correctamente.",
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/crias";
            }
          });
        })
        .catch((error) => {
          console.log(error)
          Swal.fire(
            "¡Error!",
            `Ha ocurrido un error al cargar los datos: ${error.response.data.error}`,
            "error"
          );
        });
    } else {
      Swal.fire("¡Error!", "Todos los campos son obligatorios.", "error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      marginTop="10vh"
    >
      <Card style={{ width: "40%" }}>
        <CardHeader title="Agregar Cria" style={{ textAlign: "center" }} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                id="nombre"
                label="Nombre"
                fullWidth
                value={cria.nombre}
                onChange={(e) => actualizarCria("nombre", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                id="proveedor"
                label="Proveedor"
                fullWidth
                value={cria.proveedor}
                onChange={(e) => actualizarCria("proveedor", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                size="small"
                required
                id="peso"
                label="Peso"
                fullWidth
                value={cria.peso}
                onChange={(e) => actualizarCria("peso", e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                size="small"
                required
                id="costo"
                label="Costo"
                fullWidth
                value={cria.costo}
                onChange={(e) => actualizarCria("costo", e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="descripcion"
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                maxRows={3}
                value={cria.descripcion}
                onChange={(e) => actualizarCria("descripcion", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={enviarDatos}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Formulario;

