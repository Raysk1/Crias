import React, { useEffect } from "react";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

function TablaCrias() {
  const [crias, setCrias] = React.useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3010/crias/listado").then((result) => {
      console.log(result.data)
      setCrias(result.data);
    });
  },[]);

  return (
    <Box display="flex" justifyContent="center" height="88vh" marginTop="12vh">
      <Box width="60%">
        <TableContainer sx={{ maxHeight: "80%", overflowY:"auto" }} component={Paper}>
          <Table aria-label="tabla de crías">
            <TableHead stickyHeader>
              <TableRow>
                <TableCell style={{ width: "16.66%" }} align="center">ID</TableCell>
                <TableCell style={{ width: "16.66%" }} align="center">
                Proveedor
                </TableCell>
                <TableCell style={{ width: "16.66%" }} align="center">
                  Peso
                </TableCell>
                <TableCell style={{ width: "16.66%" }} align="center">
                  Costo
                </TableCell>
                <TableCell style={{ width: "16.66%" }} align="center">
                  Nombre
                </TableCell>
                <TableCell style={{ width: "16.66%" }} align="center">
                  Descripción
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crias.map((cria) => (
                <TableRow key={cria.identificador}>
                  <TableCell
                    style={{ width: "16.66%" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {cria.id}
                  </TableCell>
                  <TableCell style={{ width: "16.66%" }} align="center">
                    {cria.proveedor}
                  </TableCell>
                  <TableCell style={{ width: "16.66%" }} align="center">
                    {cria.peso}
                  </TableCell>
                  <TableCell style={{ width: "16.66%" }} align="center">
                    {cria.costo}
                  </TableCell>
                  <TableCell style={{ width: "16.66%" }} align="center">
                    {cria.nombre}
                  </TableCell>
                  <TableCell style={{ width: "16.66%" }} align="center">
                    {cria.descripcion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button fullWidth variant="contained" href="/crias/agregar">
          Agregar Cria
        </Button>
      </Box>
    </Box>
  );
}

export default TablaCrias;
