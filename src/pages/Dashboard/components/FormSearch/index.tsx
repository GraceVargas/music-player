import { Stack, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const FormSearch = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <Stack
      component="form"
      sx={{
        p: "2px 4px",
        m: "25px auto",
        display: "flex",
        flexDirection: "row",
        width: 800,
        backgroundColor: "#FFF",
        borderRadius: "15px",
        padding: "7px",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "#000",
        }}
        placeholder="Search song or artist"
        inputProps={{ "aria-label": "search song or artist" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        type="button"
        sx={{ p: "2px", color: "#000" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Stack>
  );
};

export { FormSearch };
