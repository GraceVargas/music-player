import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Login } from "./pages";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Outlet />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
