import React from "react";
import { Box } from "@mui/material";
import { Layout } from "../../components";
import { LoginForm } from "./components/LoginForm";

const Login = () => {
  return (
    <Layout hideHeader hideFooter>
      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "10%" }}>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export { Login };
