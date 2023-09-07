import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Login, Dashboard } from "./pages";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const code = new URLSearchParams(location.search).get("code"); // pasar a un hook?

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Outlet />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard code={code} />} />{" "}
        {/* Acceder solo si el code existe */}
      </Route>
    </Routes>
  </BrowserRouter>
);
