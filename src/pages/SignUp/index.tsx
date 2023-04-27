import { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { InputChangeEvent } from "../../types";
import './style.css';
import { Link } from "react-router-dom";
import { signUpValidator } from "./helpers/signUp-validator";

const SignUp = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [result, setResult] = useState<string>('');

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
        const validationError = signUpValidator(body);
        if (validationError) return setResult(validationError);
        const success = await auth.signup(body);
        if (success) {
            console.log({ token: auth.token }, 'from SIGNUP');
            return navigate('/playlists');
        }
        setResult('Email already exists');
    }

    return (
        <div className="container">
            <div className="form">
                <h1>SignUp</h1>

                <input type="text" name="name" placeholder="Type your name" 
                value={name} onChange={handleNameInput}/>

                <input type="text" name="email" placeholder="Type your email" 
                value={email} onChange={handleEmailInput}/>

                <input type="password" name="password" placeholder="Type your password" 
                value={password} onChange={handlePasswordInput}/>

                <input type="password" name="passwordConfirmation" placeholder="Confirm your password" 
                value={passwordConfirmation} onChange={handlePasswordConfirmationInput}/>
                <button onClick={handlerClick}>SEND</button>
                <p>Already hava an account? <Link to={'/login'}>Login</Link></p>
                <h2>{result}</h2>
            </div>
        </div>
    )
}

export default SignUp;