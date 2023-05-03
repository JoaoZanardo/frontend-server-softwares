import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/Auth";
import { InputChangeEvent, UserInput } from "../../../types";
import { validateLoginFields } from "../../../helpers";
import { Link } from "react-router-dom";
import { InvalidInputError } from "../../../types/errors";

export const LoginPage = (): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<InvalidInputError | null>(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();;
    
    const handleEmailInput = (event: InputChangeEvent) => {
        setEmail(event.target.value);
    }
    
    const handlePasswordInput = (event: InputChangeEvent) => {
        setPassword(event.target.value);     
    }
    
    const handlerClick = async () => {
        const body = { email, password }
        const validationError = validateLoginFields(body);
        if (validationError) return setError(validationError);
        const success = await auth.login(body);
        if (success) return navigate('/playlists');
        setError({ message: 'Email e/ou senha estão incorretos', input: '' });
    }

    return (
        <div className="container">
            <div className="form">
                <h1>Login</h1>
                {!!error && (
                    <div className="error-box"><img src="../../src/assets/red-x.png"></img> {error.message}</div>
                )}
                <input type="text" name="email" placeholder="Seu email" 
                value={email} onChange={handleEmailInput} 
                className={!!error && error?.input === UserInput.EMAIL ? "input-error" : ""}/>

                <input type="password" name="password" placeholder="Sua senha" 
                value={password} onChange={handlePasswordInput}
                className={!!error && error.input === UserInput.PASSWORD ? "input-error" : ""}/>

                <button onClick={handlerClick}>ENTRAR</button>
                <p className="warning-message">Novo por aqui? <Link to={'/signup'}>Crie uma conta</Link></p>
            </div>
        </div>
    )
}