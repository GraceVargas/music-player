import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Login, Dashboard, ArtistPage } from "./pages";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { TracksProvider } from "./context/Tracks";
import { ArtistsProvider } from "./context/Artists";

const code = new URLSearchParams(location.search).get("code"); // pasar a un hook?

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ArtistsProvider>
    <TracksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Outlet />} />

            {code ? (
              <>
                <Route index element={<Dashboard code={code} />} />
                <Route path="ArtistPage/:id" element={<ArtistPage />} />
              </>
            ) : (
              <Route path="login" element={<Login />} />
            )}

            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TracksProvider>
  </ArtistsProvider>
);
