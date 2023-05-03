import { Link } from "react-router-dom";
import './style.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";

export const Header = ({ children }: { children: JSX.Element }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleHamburguer = () => {
        setIsOpen(!isOpen);
    }

    const auth = useContext(AuthContext);

    const handleLogout = async () => {
        auth.logout();
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                <Link to={'/'} className="navbar-brand"><img src="../../src/assets/logo.png"/></Link>
                <div className="navbar-toggle" id="navbar-toggle" onClick={handleHamburguer}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`navbar-menu ${isOpen ? 'show' : ''}`} id="navbar-menu">
                    <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/'}>Home</Link></li>
                    {!!auth.token && <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/playlists'}>Playlists</Link></li>}
                    {!!auth.token && <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/playlists/add'}>Create playlist</Link></li>}
                    {!auth.token && <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/login'}>Login</Link></li>}
                    {!!auth.token && <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/'}>{auth.user!.name}</Link></li>}
                    {!!auth.token && <li className="navbar-item"
                    onClick={handleHamburguer}><Link to={'/'} onClick={handleLogout}>Logout</Link></li>}
                </ul>
                </div>
            </nav>
            {children}
        </>
    )
}