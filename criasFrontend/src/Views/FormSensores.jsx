import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  CardHeader,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function FormularioSensores() {
  const [sensor, setSensor] = useState({
    frecuencia_cardiaca: "",
    presion_sanguinea: "",
    frecuencia_respiratoria: "",
    temperatura: "",
    id_cria: "",
  });

  const [crias, setCrias] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3010/crias/listado").then((result) => {
      console.log(result.data);
      setCrias(result.data);
    });
  },[]);

  const actualizarSensor = (campo, valor) => {
    setSensor({ ...sensor, [campo]: valor });
  };

  const enviarDatos = () => {
    if (
      sensor.frecuencia_cardiaca &&
      sensor.presion_sanguinea &&
      sensor.frecuencia_respiratoria &&
      sensor.temperatura &&
      sensor.id_cria
    ) {
      console.log(sensor);
      axios
        .post("http://127.0.0.1:3010/sensores/agregar", sensor)
        .then(() => {
          Swal.fire({
            title: "¡Guardado!",
            text: "Los datos se han guardado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          console.log(error);
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
        <CardHeader title="Agregar Sensor" style={{ textAlign: "center" }} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                id="id_cria"
                label="Cria"
                fullWidth
                value={sensor.id_cria}
                onChange={(e) => actualizarSensor("id_cria", e.target.value)}
                select
              >
                {crias.map((cria) => {
                  return (
                    <MenuItem key={cria.id} value={cria.id}>
                      {`${cria.id}-${cria.nombre}`}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                id="frecuencia_cardiaca"
                label="Frecuencia Cardiaca"
                type="number"
                fullWidth
                value={sensor.frecuencia_cardiaca}
                onChange={(e) =>
                  actualizarSensor("frecuencia_cardiaca", e.target.value)
                }
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                id="presion_sanguinea"
                label="Presion Sanguinea"
                fullWidth
                type="number"
                value={sensor.presion_sanguinea}
                onChange={(e) =>
                  actualizarSensor("presion_sanguinea", e.target.value)
                }
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                size="small"
                required
                id="frecuencia_respiratoria"
                label="Frecuencia Respiratoria"
                fullWidth
                value={sensor.frecuencia_respiratoria}
                onChange={(e) =>
                  actualizarSensor("frecuencia_respiratoria", e.target.value)
                }
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                size="small"
                required
                id="temperatura"
                label="Temperatura"
                fullWidth
                value={sensor.temperatura}
                onChange={(e) =>
                  actualizarSensor("temperatura", e.target.value)
                }
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

export default FormularioSensores;
