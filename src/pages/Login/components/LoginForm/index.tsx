import React from "react";
import {
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import Global from "../../../../../server/Global/Global";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&scope=${Global.scopes}`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const login = () => {
    window.location.replace(AUTH_URL);
  };

  return (
    <Box m={"auto"} textAlign={"center"}>
      <img
        src="./assets/spotclone_logo.png"
        alt="Logo SpotClone"
        width={"340px"}
      />
      <form>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value=""
          onChange={(e) => console.log(e)}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" color="primary" fullWidth onClick={login}>
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export { LoginForm };
