import { useContext } from "react";
import { AuthContext } from ".";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element  }) => {
    const auth = useContext(AuthContext);
    console.log({ token: auth.token }, 'KKK')
    if (!auth.token) return <Navigate to={'/login'} />;
    return children;
}