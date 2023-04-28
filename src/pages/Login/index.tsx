import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { InputChangeEvent } from "../../types";
import { loginValidator } from "./helpers/login-validator";
import { Link } from "react-router-dom";

export const Login = (): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [result, setResult] = useState<string>('');

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
        const validationError = loginValidator(body);
        if (validationError) return setResult(validationError);
        const success = await auth.login(body);
        if (success) return navigate('/playlists');
        setResult('Wrong email or password');
    }

    return (
        <div className="container">
            <div className="form">
                <h1>Login</h1>

                <input type="text" name="email" placeholder="Seu email" 
                value={email} onChange={handleEmailInput}/>

                <input type="password" name="password" placeholder="Sua senha" 
                value={password} onChange={handlePasswordInput}/>

                <button onClick={handlerClick}>SEND</button>
                <p>Novo por aqui? <Link to={'/signup'}>Crie uma conta</Link></p>
                <h2>{result}</h2>
            </div>
        </div>
    )
}