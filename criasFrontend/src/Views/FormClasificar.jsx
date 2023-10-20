import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

function FormClasificar() {
  const [form, setForm] = useState({
    peso: "",
    color: "",
    marmoleo: "",
  });

  const handleOnChange = (event) => {
    const { value, min, max } = event.target;
    const regex = /^\d+$/;
    if (
      value === "" ||
      (regex.test(value) && Number(value) >= min && Number(value) <= max)
    ) {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    } else {
      event.target.value = value.slice(0, -1);
    }
  };

  const handleSubmit = () => {
    console.log(form);

    axios
      .post("http://127.0.0.1:3010/crias/clasificar", form)
      .then((result) => {
        if (result.data.clasificacion !== 0) {
          Swal.fire(
            "¡Clasificación!",
            `La clasificación de la carne es de tipo ${result.data.clasificacion}`,
            "success"
          );
        } else {
          Swal.fire(
            "¡Error!",
            "No se ha podido clasificar la carne",
            "error"
          );
        }
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

  return (
    <Grid container justifyContent="center" marginTop="100px">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 style={{ textAlign: "center" }}>Clasificar Carne</h2>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Peso"
                  type="number"
                  inputProps={{ min: 1, max: 10000 }}
                  name="peso"
                  value={form.peso}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Color del musculo (1-7)"
                  type="number"
                  onChange={handleOnChange}
                  inputProps={{ min: 1, max: 7, pattern: "[0-9]*" }}
                  name="color"
                  value={form.color}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Marmoleo (1-5)"
                  type="number"
                  onChange={handleOnChange}
                  inputProps={{ min: 1, max: 5, pattern: "[0-9]*" }}
                  name="marmoleo"
                  value={form.marmoleo}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FormClasificar;
