import React from 'react';
import '../../styles/HomeProfessional.css'; // CSS file for styling

function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <img src="https://www.senac.br/logo.png" alt="Senac logo" className="logo" />
                <h2>Área do Podólogo</h2>
                <p className="login-description">
                    Faça o login para ter acesso ao painel de agendamentos
                </p>
                <form>
                    <label htmlFor="username">Informe o seu usuário *</label>
                    <input type="text" id="username" placeholder="Informe o seu usuário" required />
                    <label htmlFor="password">Senha *</label>
                    <input type="password" id="password" placeholder="Senha" required />
                    <button type="submit" className="login-button">ENTRAR</button>
                </form>
                <a href="#" className="forgot-link">Esqueceu o usuário ou senha?</a>
            </div>
        </div>
    );
}

export default Login;
