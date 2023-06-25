import React from "react";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Teams />} />
        <Route path="/TeamDetails/:teamId" element={<TeamDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
