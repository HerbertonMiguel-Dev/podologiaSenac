import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Agendamentos from "./pages/Agendamentos";
import Cadastro from "./pages/Cadastro";
import { AuthProvider } from "../src/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/Agendamentos" element={<Agendamentos />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
