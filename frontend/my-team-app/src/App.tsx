import React from "react";
import Title from "./components/Title";
//import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import { BrowserRouter as Router } from "react-router-dom";
//      <TeamDetails />
  
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Title />
        <TeamDetails teamId={4} />
      </div>
    </Router>
  );
};

export default App;
