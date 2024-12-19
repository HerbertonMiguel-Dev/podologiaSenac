import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Agendamentos from "./pages/Agendamentos";
import Cadastro from "./pages/Cadastro";
import { AuthProvider } from "../src/context/AuthContext";
import { Header } from "./components/Agendamentos/Header"; // Importando o Header

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/Agendamentos" element={<Agendamentos />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;