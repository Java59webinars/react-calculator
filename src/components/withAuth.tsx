import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../services/utils.ts";

const withAuth = (Component: React.ComponentType) => {
    return function ProtectedComponent() {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);
            setIsAuthenticated(!!token); // Преобразуем наличие токена в булево значение
        }, []);

        if (isAuthenticated === null) {
            return <div>Loading...</div>;
        }

        return isAuthenticated ? <Component  /> : <Navigate to="/login" />;
    };
};

export default withAuth;
