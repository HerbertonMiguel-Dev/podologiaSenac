import Logo from "../../components/Login/Logo";
import LoginTitle from "../../components/Login/LoginTitle";
import CadastroDescription from "../../components/Cadastro/CadastroDescription";
import CadastroForm from "../../components/Cadastro/CadastroForm";
import CadastroLink from "../../components/Cadastro/CadastroLink";
import ForgotPasswordLink from "../../components/Login/ForgotPasswordLink";

const Login = () => (
	<div className="min-h-screen flex items-center justify-center bg-gray-50">
		<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
			<Logo className="mx-auto"/>
			<LoginTitle />
			<CadastroDescription />
            <CadastroForm />
			
		</div>
	</div>
);

export default Login;