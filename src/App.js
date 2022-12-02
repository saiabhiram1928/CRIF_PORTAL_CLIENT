import React from "react";
import "./styles/App/App.css";
import "./styles/Custom.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/Authenticate/AuthContext";
import ManagedRouter from "./components/Authenticate/ManagedRouter";
const App = () => {
  return (
    <AuthProvider>
      <ManagedRouter />
    </AuthProvider>
  );
};

export default App;
