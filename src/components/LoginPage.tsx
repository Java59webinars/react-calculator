import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AUTH_TOKEN_KEY} from "./utils.ts";

const LoginPage =() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            localStorage.setItem(AUTH_TOKEN_KEY, "success_secure_code");
            localStorage.setItem("userId", username);
            navigate("/");
        }else {
            alert("Invalid username or password");
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
            <Typography variant="h4">Enter to calculator</Typography>
            <TextField
                label="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
            />
            <Button variant="contained" onClick={handleLogin}>Enter</Button>
        </Box>
    );
};
export default LoginPage;