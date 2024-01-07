Certainly! To dynamically add, delete, and update columns along with the table contents in React, you can extend the example. Below is an updated version that allows dynamic column manipulation as well:

jsx
import React, { useState } from 'react';

const DynamicTable = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', age: 30, email: 'jane@example.com' },
  ]);

  const [columns, setColumns] = useState(['id', 'name', 'age', 'email']);

  const addRow = () => {
    const newId = tableData.length + 1;
    const newRow = { id: newId };
    columns.forEach((column) => (newRow[column] = ''));
    setTableData([...tableData, newRow]);
  };

  const updateCell = (id, column, value) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    );
  };

  const deleteRow = (id) => {
    setTableData((prevData) => prevData.filter((row) => row.id !== id));
  };

  const addColumn = (columnName) => {
    setColumns((prevColumns) => [...prevColumns, columnName]);
    setTableData((prevData) =>
      prevData.map((row) => ({ ...row, [columnName]: '' }))
    );
  };

  const deleteColumn = (columnName) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col !== columnName));
    setTableData((prevData) => {
      const newData = [...prevData];
      newData.forEach((row) => delete row[columnName]);
      return newData;
    });
  };

  return (
    <div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={() => addColumn(prompt('Enter column name'))}>
        Add Column
      </button>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column}
                <button onClick={() => deleteColumn(column)}>Delete</button>
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column}`}>
                  <input
                    type="text"
                    value={row[column]}
                    onChange={(e) => updateCell(row.id, column, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
```

In this updated example:

- `columns` state manages the dynamic columns of the table.
- Functions `addColumn` and `deleteColumn` allow adding and deleting columns.
- The column names are displayed in the table header, and you can delete columns dynamically.
- The "Add Column" button prompts the user for a new column name and adds it to the table.

This example provides a basic structure for dynamic manipulation of both rows and columns in a React table. You can further enhance and customize it based on your specific needs.