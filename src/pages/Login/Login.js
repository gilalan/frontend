import React, {useState} from 'react';
import './Login.css';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

function Login({ history }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function _login(name, password){

        try {
            
            const response = await api.post('/login', {name, password});
            console.log('::::RESPONSE:::: %j', response);
            return response.data;

        } catch (error) {
            // console.log('Error: ', error.response);
            console.log('Ocorreu um erro: ', error.response.data.error);
            return error.response.data;
        }
    }

    function handleSubmit(event) {
        
        event.preventDefault();
        
        _login(username, password);

        // console.log('Data: ', data);

        // if (data.error) {

        //     alert('Ocorreu um erro ', data.error);

        // } else 
        // {
        //     alert('Foi tudo ok.');
        // }

        // if (response.status == 200){
        //     console.log("ok, passou pelo login", response.data.success);
        //     history.push('/main');
        // }
        // else if (response.status == 400) {
        //     console.log('ocorreu um erro: ', response.data.error)
        // }

    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src={logo} alt="TOA Games" />
                </div>
                <input 
                    type="text" 
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
    