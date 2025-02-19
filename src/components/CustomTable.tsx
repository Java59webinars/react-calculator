import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {themeStyles} from "./themes.ts";

const CustomTable = ({rows}: CustomTableProps) => {
    if (!rows || rows.length === 0) {
        return <Typography>No operations to display</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={themeStyles.table.container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={themeStyles.table.headerCell}>Operation</TableCell>
                        <TableCell sx={themeStyles.table.headerCell}>Value</TableCell>
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
