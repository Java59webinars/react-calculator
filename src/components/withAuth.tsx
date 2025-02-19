import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {AUTH_TOKEN_KEY} from "./utils.ts";


const withAuth = <P extends object>(Component: React.ComponentType) => {
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