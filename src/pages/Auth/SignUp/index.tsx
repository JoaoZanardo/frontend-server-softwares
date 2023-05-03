import { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { InputChangeEvent, UserInput } from "../../../types";
import './style.css';
import { Link } from "react-router-dom";
import { validateSignUpFields } from "../../../helpers";
import { InvalidInputError } from "../../../types/errors";
import { UserDto } from "../../../types/dto";

const SignUpPage = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [error, setError] = useState<InvalidInputError | null>(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    

    const handleNameInput = (event: InputChangeEvent) => {
        setName(event.target.value);
    }
    
    const handleEmailInput = (event: InputChangeEvent) => {
        setEmail(event.target.value);
    }
    
    const handlePasswordInput = (event: InputChangeEvent) => {
        setPassword(event.target.value);     
    }

    const handlePasswordConfirmationInput = (event: InputChangeEvent) => {
        setPasswordConfirmation(event.target.value);    
    }

    const handlerClick = async () => {
        const body = { name, email, password, passwordConfirmation }
        const error = validateSignUpBody(body);
        if (error) return setError(error);
        const success = await auth.signup(body);
        if (success) return navigate('/playlists');
        setError({ message: 'Email já existe', input: '' });
    }

    const validateSignUpBody = (body: UserDto): InvalidInputError | null => {
        const validationError = validateSignUpFields(body);
        let error: InvalidInputError | null = null;
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (password !== passwordConfirmation) error = {
            input: 'passwordConfirmation', message: 'As senhas não são compatíveis'
        };
        if (validationError) error = validationError;
        if (email && !regex.test(email)) error = {
            input: 'email', message: 'Digite um email válido'
        };
        return error;
    }

    return (
        <div className="container">
            <div className="form">
                <h1>SignUp</h1>
                {!!error && (
                    <div className="error-box"><img src="../../src/assets/red-x.png"></img> {error.message}</div>
                )}
                <input type="text" name="name" placeholder="Seu nome" 
                value={name} onChange={handleNameInput}
                className={!!error && error?.input === UserInput.NAME ? "input-error" : ""}/>

                <input type="text" name="email" placeholder="Seu email" 
                value={email} onChange={handleEmailInput}
                className={!!error && error?.input === UserInput.EMAIL ? "input-error" : ""}/>

                <input type="password" name="password" placeholder="Sua senha" 
                value={password} onChange={handlePasswordInput}
                className={!!error && error?.input === UserInput.PASSWORD ? "input-error" : ""}/>

                <input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" 
                value={passwordConfirmation} onChange={handlePasswordConfirmationInput}
                className={!!error && error?.input === UserInput.PASSWORDCONFIRMATION ? "input-error" : ""}/>
                <button onClick={handlerClick}>SEND</button>
                <p className="warning-message">Já tem uma conta? <Link to={'/login'}>Entrar</Link></p>
            </div>
        </div>
    )
}

export default SignUpPage;