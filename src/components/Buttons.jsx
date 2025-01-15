import React from "react";

const Buttons = ({ buttonData, onButtonClick }) => {
    return (
        <div id="button-container">
            {buttonData.map((button, index) => (
                <button
                    key={index}
                    className={button.className || ""}
                    onClick={() => onButtonClick(button.operation)}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default Buttons;