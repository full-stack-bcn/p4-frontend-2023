import React from "react";
import Title from "./components/Title";
import TeamDetails from "./components/TeamDetails";
import { BrowserRouter as Router } from 'react-router-dom';
  
const App: React.FC = () => {
  return (
    <Router>
      <Title />
      <TeamDetails teamId={4} />
    </Router>
  );
};

export default App;
