import { Box, Button, Typography } from "@mui/material";
import { useCalculatorLogic } from "../hooks/useCalculatorLogic";
import Buttons from "../components/Buttons";
import CustomTable from "../components/CustomTable";
import CalculatorInput from "../components/CalculatorInput";
import { logoutUser } from "../services/utils";
import { themeStyles } from "../services/themes.ts";

const CalculatorPage = () => {
    const { inputValue, setInputValue, handleButtonClick, rows, userId, buttonData } = useCalculatorLogic();
    const handleLogout = () => {
        logoutUser();
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
            <CalculatorInput inputValue={inputValue} setInputValue={setInputValue} />
            <Buttons buttonData={buttonData} onButtonClick={handleButtonClick} />
            <CustomTable rows={rows} />
        </Box>
    );
};

export default CalculatorPage;
