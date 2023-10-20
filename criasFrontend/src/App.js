import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import { AppBar, Toolbar, Button, CssBaseline } from "@mui/material";

import Formulario from "./Views/FormCrias";
import TablaCrias from "./Views/TablaCrias";
import FormularioSensores from "./Views/FormSensores";
import Login from "./Views/Login";
import FormClasificar from "./Views/FormClasificar";
import Cookies from "universal-cookie";
import TablaCriasEnfermasYEnCuarentena from "./Views/TablaCuarentena";

function App() {
  const cookies = new Cookies();
  const handleLogout = () => {
    cookies.remove("id");
    cookies.remove("nombre");
    cookies.remove("id_tipo_usuario");
    cookies.remove("username");
    window.location.href = "/";
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <div style={{ width: "100%", display: "flex" }}>
            <Button color="inherit" href="/">
              Home
            </Button>
            {cookies.get("id_tipo_usuario") === 1 ? (
              <Button color="inherit" href="/clasificar">
                Clasificar
              </Button>
            ) : null}

            <Button color="inherit" href="/cuarentena">
              Cuarentena
            </Button>
            {cookies.get("id_tipo_usuario") === 1 ||
            cookies.get("id_tipo_usuario") === 2 ||
            cookies.get("id_tipo_usuario") === 3 ? (
              <Button color="inherit" href="/crias">
                Crias
              </Button>
            ) : null}

            {cookies.get("id_tipo_usuario") === 4 ? (
              <Button color="inherit" href="/sensores/agregar">
                Sensores
              </Button>
            ) : null}

            {cookies.get("id") ? (
              <Button
                color="inherit"
                onClick={handleLogout}
                style={{ marginLeft: "auto" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                href="/login"
                style={{ marginLeft: "auto" }}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        {cookies.get("id_tipo_usuario") === 1 ? (
          <Route
            path="/cuarentena"
            element={<TablaCriasEnfermasYEnCuarentena />}
          />
        ) : null}

        <Route path="/clasificar" element={<FormClasificar />} />
        {cookies.get("id") ? "" : <Route path="/login" element={<Login />} />}

        {cookies.get("id_tipo_usuario") === 4 ? (
          <Route path="/sensores/agregar" element={<FormularioSensores />} />
        ) : null}

        {cookies.get("id_tipo_usuario") === 1 ||
        cookies.get("id_tipo_usuario") === 2 ||
        cookies.get("id_tipo_usuario") === 3 ? (
          <Route path="/crias" element={<TablaCrias />} />
        ) : null}
        {cookies.get("id_tipo_usuario") === 1 ||
        cookies.get("id_tipo_usuario") === 2 ||
        cookies.get("id_tipo_usuario") === 3 ? (
          <Route path="/crias/agregar" element={<Formulario />} />
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
