import React, {useState} from 'react';
import './Login.css';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

function Login({ history }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stateErrors, setStateErrors] = useState({});

    function validate(){

        //let [errors]
        let nameError = "";
        let passwordError = "";

        if (!username || username === '') {
            console.log('entrou no usuário vazio');
            nameError = "É necessário preencher o nome do usuário.";
        }

        if (!password || password === ''){
            console.log('entrou no password vazio');
            passwordError = "É necessário preencher a senha do usuário.";
        }

        if (nameError || passwordError){
            setStateErrors({nameError, passwordError});
            return false;   
        }
        else
            return true;
    }

    async function handleSubmit(event) {
        
        try {
            
            event.preventDefault();
            if (validate()){
                console.log("formulário validado");
                console.log("Solicitar serviço...");
                const response = await api.post('/login', {name: username, password});
                console.log('response: ', response);
                //const { status, data } = await _login(username, password);
                
                if (response) {
                    
                    switch(response.status) {
                        case 200:
                            console.log("data: ", JSON.stringify(response.data));

                        break;
                        case 400: 
                            console.log('Erro: ', response.data.msg);
                            setStateErrors({responseError: `Erro: ${response.data.msg}`});
                        break;
                        case 401:
                            console.log('Erro: ', response.data.msg);
                            setStateErrors({responseError: `Não autorizado: ${response.data.msg}`});
                        break;
                        default:
                            console.log('Erro: ', response.data.msg);
                            setStateErrors({responseError: `Erro: ${response.data.msg}`});
                        break;
                    }                    

                } else {

                    console.log("Response sem dados...");
                    setStateErrors({responseError: 'Sem resposta do servidor...'});    

                }
                
            }
            else {
                console.log("erros apresentados em tela...");
            }

        } catch (error) {
            
            console.log("calma, não dê aquela tela feiosa ", JSON.stringify(error, null, 4));
            
            if (error.message === "Network Error"){

                console.log("Há um problema com a conexão entre o cliente e o servidor");
                setStateErrors({responseError: 'Há um problema na conexão, verifique sua internet e tente novamente'});

            } else {

                console.log("Há um problema NÃO MAPEADO com a conexão entre o cliente e o servidor");
                setStateErrors({responseError: 'Ocorreu um problema, tente novamente'});

            }
        }

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
            <div className="logo-container">
                <img src={logo} alt="TOA Games" />
            </div>
            <form onSubmit={handleSubmit}>
                <h2>
                    Entre na sua conta
                </h2>
                
                {
                    stateErrors.responseError ? (<div className="response-error showResError"> {stateErrors.responseError} </div>) 
                    : 
                    (<div className="response-error hideResError"/>)
                }                
                <label htmlFor="">Usuário</label>
                <input 
                    type="text" 
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <div className="name-error">
                    {stateErrors.nameError}
                </div>
                <label htmlFor="">Senha</label>
                <input 
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="name-error">
                    {stateErrors.passwordError}
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
    