import { TextField } from "@mui/material";
import { themeStyles } from "../services/themes.ts";

interface CalculatorInputProps {
    inputValue: string | number;
    setInputValue: (value: string | number) => void;
}

const CalculatorInput = ({ inputValue, setInputValue }: CalculatorInputProps) => {
    return (
        <TextField
            label="Enter a number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant="outlined"
            sx={themeStyles.app.textField}
        />
    );
};

export default CalculatorInput;
