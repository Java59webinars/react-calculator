import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
const AUTH_TOKEN_KEY = "authToken";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return function ProtectedComponent(props: P) {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);
            setIsAuthenticated(!!token);
        }, []);

        if (isAuthenticated === null) {
            return <div>Загрузка...</div>;
        }

        return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
    };
};
export default withAuth;