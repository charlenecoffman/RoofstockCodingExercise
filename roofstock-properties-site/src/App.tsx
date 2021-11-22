import React from "react";
import "./Styles/App.css";
import PropertiesGrid from "./Componenets/PropertiesGrid";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Properties</h1>
      <PropertiesGrid />
    </div>
  );
};

export default App;
