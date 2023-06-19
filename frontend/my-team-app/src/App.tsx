import React from 'react';
import ApiComponent from './ApiComponent';

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <div>
      <h1>My App</h1>
      <p>API URL: {apiUrl}</p> 
      <ApiComponent />
    </div>
  );
};

export default App;