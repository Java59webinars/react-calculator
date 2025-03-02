import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ActionButtons from "../components/Buttons";
import CustomTable from "../components/CustomTable";
import CalculatorInput from "../components/CalculatorInput";
import { logoutUser } from "../services/utils";
import { themeStyles } from "../services/themes.ts";
import { setInputValue, setUserId } from "../redux/calculatorSlice";
import { USER_ID_KEY } from "../services/utils"; // 🔹 Используем константу из utils

const CalculatorPage = () => {
    const dispatch = useAppDispatch();
    const { inputValue, rows } = useAppSelector((state) => state.calculator);

    const [userId, setUserIdState] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem(USER_ID_KEY);
        console.log("🔹 Загруженный userId:", storedUserId);
        setUserIdState(storedUserId);
        dispatch(setUserId(storedUserId));
    }, [dispatch]);

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem(USER_ID_KEY); // 🔹 Используем константу
        setUserIdState(null);
        dispatch(setUserId(null));
        window.location.href = "/login";
    };

    if (!userId) {
        return <Typography variant="h5" color="error">User is not authenticated</Typography>;
    }

    return (
        <Box sx={themeStyles.app.container}>
            <Typography variant="h6">Пользователь: {userId}</Typography>

            <Button variant="outlined" color="error" onClick={handleLogout} sx={{ alignSelf: "flex-end" }}>
                Logout
            </Button>

            <CalculatorInput
                inputValue={inputValue}
                setInputValue={(value) => dispatch(setInputValue(value))}
            />
            <ActionButtons />
            <CustomTable rows={rows} />
        </Box>
    );
};

export default CalculatorPage;
