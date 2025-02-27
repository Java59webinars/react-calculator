import {useState} from "react";
import {Button, ButtonGroup} from "@mui/material";
import {Calculator} from "../services/Calculator.ts";
import {themeStyles} from "../services/themes.ts";

const Buttons = ({buttonData, onButtonClick}: ButtonsProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <ButtonGroup aria-label="button group" sx={themeStyles.buttons.buttonGroup}>
            {buttonData.map((button, index) => {
                const isActive = index === activeIndex;
                const isCancel = button.className === "cancel";

                return (
                    <Button
                        key={index}
                        variant={isCancel ? "contained" : isActive ? "contained" : "outlined"}
                        color={isCancel ? undefined : "primary"}
                        onClick={() => {
                            onButtonClick(button.operation as keyof Calculator);
                            setActiveIndex(index);
                        }}
                        sx={isCancel ? themeStyles.buttons.cancelButton : isActive ? themeStyles.buttons.activeButton : themeStyles.buttons.defaultButton}
                    >
                        {button.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default Buttons;
