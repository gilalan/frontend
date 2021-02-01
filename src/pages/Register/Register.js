import React, {useState} from 'react';

import './Register.css';

function Register() {

    const [state, setState] = useState({});
    const [stateErrors, setStateErrors] = useState({});

    async function handleSubmit(event) {
        
        try {
            
            event.preventDefault();
            if (validate()){
                console.log("formulário validado");
                console.log("Solicitar serviço...");
                const response = await api.post('/login', {name: username, password});
                //const { status, data } = await _login(username, password);
                
                if (response.data) {
                    
                    console.log("data: ", JSON.stringify(response.data));

                } else {

                    console.log("Response sem dados...");

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
            }
        }
    }

    return (
        <div className="register-container">
            <div className="logo-container">
                <img src={logo} alt="TOA Games" />
            </div>
            <form onSubmit={handleSubmit}>
                <h2>
                    Registre-se, é grátis
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
    )
}

export default Register;
