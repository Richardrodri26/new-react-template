import React, { useState, useEffect } from 'react';

interface Column {
  id: string;
  name: string;
  minProfit: string;
  maxProfit: string;
}

interface DataRow {
  id: string;
  min: string;
  max: string;
  [key: string]: string; // Propiedades dinámicas que coinciden con los ids de las columnas
}

interface TableProps {
  jsonString: string;
}

const DataTable: React.FC<TableProps> = ({ jsonString }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    try {
      const parsedData = JSON.parse(jsonString); // Convertir JSON string a objeto
      setData(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [jsonString]);

  if (!data) return <div>Loading...</div>;

  const { columns, data: tableData } = data;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-4">{data.mes} - {data.tipo}</h3>
      <p className="text-lg font-bold mb-4 red">{data.comment}</p>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Min</th>
            <th className="border px-4 py-2">Max</th>
            {columns.map((column: Column) => (
              <th key={column.id} className="border px-4 py-2">{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: DataRow) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.min}</td>
              <td className="border px-4 py-2">{row.max}</td>
              {columns.map((column: Column) => (
                <td key={column.id} className="border px-4 py-2">{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
