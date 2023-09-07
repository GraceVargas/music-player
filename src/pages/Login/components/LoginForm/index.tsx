import React, { useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&scope=${Global.scopes}`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const spotyCode = urlParams.get("code");

  //   if (spotyCode) {
  //     autenticateUser(spotyCode);
  //   }
  // });

  // const autenticateUser = (spotyCode: string) => {
  //   try {
  //     const searchParams = new URLSearchParams({
  //       code: spotyCode,
  //       grant_type: "authorization_code",
  //       redirect_uri: Global.redirect_uri,
  //       client_id: Global.client_id,
  //       client_secret: Global.client_secret,
  //       state: state,
  //     });

  //     axios
  //       .post("https://accounts.spotify.com/api/token", searchParams)
  //       .then((res) => {
  //         localStorage.setItem("access_token", res.data.access_token);
  //         localStorage.setItem("refresh_token", res.data.refresh_token);
  //         navigate("/playlists");
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const login = () => {
    window.location.replace(AUTH_URL);
  };

  return (
    <Box m={"auto"} textAlign={"center"}>
      <GraphicEqIcon sx={{ fontSize: 115 }} />
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

//http://127.0.0.1:5173/?
//code=AQCC0f10GMGEnUqV_zj39vheROssuLAEbNOanWsaHubhTEc2kLXL8RNET0yZUJKV2wZ0wD_Rbg6R6cQ6Y7V200eM2edyt1r4Igu5tZvIbenaySR5vSU5zXEMuo--HxpQc8aPOJA1H689iL9EWtLLuUu-dS6848caJvM
