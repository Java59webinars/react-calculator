import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AUTH_TOKEN_KEY = "authToken";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "admin" && password === "1234") { // Здесь можно заменить на реальную проверку
            localStorage.setItem(AUTH_TOKEN_KEY, "your-secure-token");
            localStorage.setItem("userId", username);
            navigate("/");
        } else {
            alert("Неверный логин или пароль");
        }
    };

    return (
        <Box
            sx={{
        display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "10px",
    }}
>
    <Typography variant="h5">Вход в систему</Typography>
    <TextField
    label="Логин"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    variant="outlined"
    />
    <TextField
        label="Пароль"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    variant="outlined"
    />
    <Button variant="contained" onClick={handleLogin}>Войти</Button>
        </Box>
);
};

export default LoginPage;
