import { Button, ButtonGroup } from "@mui/material";
import { useAppDispatch, } from "../redux/hooks";
import { executeOperation, resetCalculator } from "../redux/calculatorSlice";
import { themeStyles } from "../services/themes.ts";
import { Calculator } from "../services/Calculator.ts";

const Buttons = () => {
    const dispatch = useAppDispatch();
    const calculator = new Calculator(); // 📌 Создаем экземпляр для получения кнопок
    const buttonData = calculator.getActions();

    return (
        <ButtonGroup sx={themeStyles.buttons.buttonGroup}>
            {buttonData.map((button, index) => {
                const isCancel = button.className === "cancel";

                return (
                    <Button
                        key={index}
                        variant={isCancel ? "contained" : "outlined"}
                        color={isCancel ? "error" : "primary"}
                        onClick={() => {
                            if (button.operation === "reset") {
                                dispatch(resetCalculator());
                            } else {
                                dispatch(executeOperation({ operation: button.operation }));
                            }
                        }}
                        sx={isCancel ? themeStyles.buttons.cancelButton : themeStyles.buttons.defaultButton}
                    >
                        {button.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default Buttons;
