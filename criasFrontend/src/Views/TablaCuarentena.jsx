import { useState, useEffect } from "react";
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

export default function TablaCriasEnfermasYEnCuarentena() {
  const [criasEnfermas, setCriasEnfermas] = useState([]);
  const [criasEnCuarentena, setCriasEnCuarentena] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3010/crias/enfermas").then((result) => {
      setCriasEnfermas(result.data);
    });
    axios.get("http://127.0.0.1:3010/crias/cuarentena").then((result) => {
      console.log(result.data)
      setCriasEnCuarentena(result.data);
    });
  },[]);

  const ponerEnCuarentena = (id) => {
    axios.post(`http://127.0.0.1:3010/crias/cuarentena/${id}`).then((result) => {
      console.log(result.data)
      setCriasEnfermas(criasEnfermas.filter((cria) => cria.id !== id));
      setCriasEnCuarentena([...criasEnCuarentena, result.data]);
    });
  }

  return (
    <>
      <Box display="flex" justifyContent="center" height="40vh" marginTop="12vh">
        <Box width="60%" height={"50%"}>
          <TableContainer sx={{ maxHeight: 350, overflowY:"auto" }} component={Paper}>
            <Table aria-label="tabla de crías enfermas">
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
                  <TableCell style={{ width: "16.66%" }} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criasEnfermas.map((cria) => (
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
                    <TableCell style={{ width: "16.66%" }} align="center">
                      <Button variant="contained" onClick={() => ponerEnCuarentena(cria.id)}>Poner en cuarentena</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" height="40vh" >
        <Box width="60%">
          <TableContainer sx={{ maxHeight: "50vh", overflowY:"auto" }} component={Paper}>
            <Table aria-label="tabla de crías en cuarentena">
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
                {criasEnCuarentena.map((cria) => (
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
        </Box>
      </Box>
    </>
  );
}

