import React from "react";
// Компоненты таблицы из MUI
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const CustomTable = ({ rows }) => {
    // Если нет данных, выводим надпись
    if (!rows || rows.length === 0) {
        return <Typography>No operations to display</Typography>;
    }

    return (
        // TableContainer + Paper придают «материальную» карточку
        <TableContainer component={Paper}
                        sx={{
                            // По желанию добавим синюю рамку, чтобы стилизовать под ваши кнопки
                            border: "1px solid",
                            borderColor: "primary.main",
                            boxShadow: 2,
                        }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Operation</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.operation}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
