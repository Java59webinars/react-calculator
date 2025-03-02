import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ActionButtons from "../components/Buttons";
import CustomTable from "../components/CustomTable";
import CalculatorInput from "../components/CalculatorInput";
import { logoutUser } from "../services/utils";
import { themeStyles } from "../services/themes.ts";
import { setInputValue } from "../redux/calculatorSlice";

const CalculatorPage = () => {
    const dispatch = useAppDispatch();
    const { inputValue, rows } = useAppSelector((state) => state.calculator);

    const [userId, setUserId] = useState<string | null>(null);

    // Проверяем наличие userId в localStorage при монтировании
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        console.log("🔹 Загруженный userId:", storedUserId); // 👀 Проверяем консоль
        if (storedUserId && storedUserId.trim() !== "") {
            setUserId(storedUserId);
        }
    }, []);

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("userId"); // Очистка userId
        setUserId(null);
        window.location.href = "/login";
    };

    if (!userId) {
        return <Typography variant="h5" color="error">User is not authenticated</Typography>;
    }

    return (
        <Box sx={themeStyles.app.container}>
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
