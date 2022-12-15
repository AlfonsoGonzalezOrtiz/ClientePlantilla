import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Household from "./pages/Household";
import CreateHousehold from "./pages/CreateHousehold";
import EditHousehold from "./pages/EditHousehold";
import { Map } from "./pages/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wrapper } from "./AppWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/household/:id" element={<Household />} />
          <Route path="/createHousehold" element={<CreateHousehold />} />
          <Route path="/editHousehold/:id" element={<EditHousehold />} />
          <Route path="/myHouseholds/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
