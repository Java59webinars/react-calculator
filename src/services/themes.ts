// themes.ts

export const themeStyles = {
    app: {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: 400,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        },
        textField: {
            width: "100%",
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "primary.main",
                },
                "&:hover fieldset": {
                    borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "primary.dark",
                },
            },
        }
    },

    buttons: {
        buttonGroup: {
            width: "100%"
        },
        cancelButton: {
            backgroundColor: "red",
            color: "white",
            borderColor: "primary.main",
            "&:hover": {
                backgroundColor: "darkred",
            },
            flex: 1,
        },
        defaultButton: {
            backgroundColor: "white",
            color: "primary.main",
            borderColor: "primary.main",
            "&:hover": {
                backgroundColor: "#f5f5f5",
            },
            flex: 1,
        },
        activeButton: {
            flex: 1
        }
    },

    table: {
        container: {
            border: "1px solid",
            borderColor: "primary.main",
            boxShadow: 2,
        },
        headerCell: {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            fontWeight: "bold",
            textAlign: "center",
        }
    },

    loginPage: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "10px",
        }
    }
};
