import React, {useState} from 'react';

function InputField(props) {

    const [state, setState] = useState('');
    const [stateErrors, setStateErrors] = useState({});
    const validateArray = props.validate;
    //props.validate pode ser um array com os validadores para esse input...

    

    return (
        <div>
            <label>{props.children}</label>
            <input 
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => setState(e.target.value)}                
            />
            <div className="input-error">
                {stateErrors.nameError}
            </div>
        </div>
    )
}

export default InputField;
