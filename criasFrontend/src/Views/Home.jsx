import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h3">¡Bienvenido {cookies.get("nombre")}!</Typography>
    </Box>
  );
}

export default Home;
