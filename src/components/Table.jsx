import React from "react";

const Table = ({ rows }) => {
    if (!rows || rows.length === 0) {
        return <p>No operations to display</p>; // Сообщение, если операций нет
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Operation</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    <td>{row.operation}</td>
                    <td>{row.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;