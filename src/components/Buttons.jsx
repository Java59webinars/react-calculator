import{ useState } from "react";
import {Button, ButtonGroup} from "@mui/material";

const Buttons = ({ buttonData, onButtonClick }) => {
    // Состояние для отслеживания индекса последней нажатой кнопки

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <ButtonGroup aria-label="button group"
                     sx={{ width: "100%" }}
        >
            {buttonData.map((button, index) => {
                const isActive = index === activeIndex;
                const isCancel = button.className === "cancel";

                return (
                    <Button
                        key={index}
                        variant={
                            // Если кнопка «cancel», всегда делаем "contained"
                            // (красный фон), иначе используем логику isActive
                            isCancel ? "contained" : isActive ? "contained" : "outlined"
                        }
                        // Если не cancel-кнопка, цвет = "primary",
                        // чтобы сохранялся «синий» основной цвет
                        color={isCancel ? undefined : "primary"}
                        onClick={() => {
                            onButtonClick(button.operation);
                            setActiveIndex(index);
                        }}
                        sx={{

                            ...(isCancel
                                ? {
                                    backgroundColor: "red",
                                    color: "white",
                                    borderColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "darkred",
                                    },
                                }
                                : {
                                    // Стили для обычной кнопки (как раньше)
                                    // «Активная» (isActive) => "contained primary",
                                    // «Неактивная» => "outlined" с белым фоном, синим текстом
                                    backgroundColor: isActive ? undefined : "white",
                                    color: isActive ? undefined : "primary.main",
                                    borderColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: isActive ? "primary.dark" : "#f5f5f5",
                                    },
                                }),
                            flex: 1,
                        }}
                    >
                        {button.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default Buttons;
