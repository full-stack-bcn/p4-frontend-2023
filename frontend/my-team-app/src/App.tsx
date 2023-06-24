import React from "react";
import Title from "./components/Title";
import Teams from "./components/Teams";
import { BrowserRouter as Router } from 'react-router-dom';
  
const App: React.FC = () => {
  return (
    <Router>
      <Title />
      <Teams />
    </Router>
  );
};

export default App;
