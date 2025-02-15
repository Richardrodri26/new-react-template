import { formatCurrency } from "@/pages/Reports/table/marcasVenta";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type TableData = {
  id: string;
  min: string;
  max: string;
  [key: string]: string; // Permite columnas dinámicas
};

type ColumnData = {
  id: string;
  name: string;
  minProfit: string;
  maxProfit: string;
};

export const CommissionsConfigPage = () => {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [data, setData] = useState<TableData[]>([]);
  const [saleAmount, setSaleAmount] = useState(""); // Monto de venta a validar
  const [comment, setComment] = useState(""); // Monto de venta a validar
  const [profitPercentage, setProfitPercentage] = useState(""); // Porcentaje de utilidad a validar
  const [result, setResult] = useState<string | null>(null); // Resultado de validación
  const [loading, setLoading] = useState(false); // Estado de carga
  const [type, setType] = useState<string>(); // Tipo (Interno / Externo)
  const [month, setMonth] = useState<string>(dayjs().locale('es').format('MMMMM')); // Mes seleccionado
  const saveData = async () => {
    const tableState = { 
      tipo: type,
      mes: month,
      comment,
      columns, 
      data 
    };
    try {
      setLoading(true);
      // Configuración de la solicitud POST
      const response = await fetch(`${import.meta.env.VITE_APP_GRAPH}commissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableState), // Convertimos el objeto a JSON
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar los datos.");
      }
  
      const result = await response.json();
      console.log("Datos guardados correctamente:", result);
      toast.success("Datos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      toast.error("Hubo un error al guardar los datos.");
    }finally {
      setLoading(false);
    }
  };
    // Cargar datos cuando cambia el tipo o mes
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_GRAPH}commissions/getConfigurationByTypeMonth/${type}/${month}`);
          const result = await response.json();
          if(result.error) {
            toast.info('Informacion vacia')
            setColumns([]);
            setData([]);
            return
          }
          const data = JSON.parse(result.jsonData);
          setColumns(data.columns);
          setData(data.data);
          setComment(data.comment)
          if (!type) setType(data.tipo); // Solo se actualiza si 'type' está vacío
          if (!month) setMonth(data.mes); // Solo se actualiza si 'month' está vacío
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        } finally {
          setLoading(false);
        }
      };
      if(type && month){
        fetchData();
      }
    }, [type,month]); // Agregar dependencia de 'type' y 'month'
  

  // Agregar una nueva columna con mínimo y máximo de porcentaje
  const addColumn = () => {
    const newColumn: ColumnData = { 
      id: uuidv4(), 
      name: "Nuevo % Utilidad", 
      minProfit: "", 
      maxProfit: "" 
    };
    setColumns([...columns, newColumn]);
    setData((prevData) =>
      prevData.map((row) => ({ ...row, [newColumn.id]: "" }))
    );
  };

  // Agregar una nueva fila con rangos vacíos
  const addRow = () => {
    const newRow: TableData = { id: uuidv4(), min: "", max: "", ...Object.fromEntries(columns.map(col => [col.id, ""])) };
    setData([...data, newRow]);
  };

  // Actualizar celdas
  const updateCell = (id: string, column: string, value: string) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    );
  };

  // Actualizar datos de la columna (nombre, min, max)
  const updateColumnData = (id: string, field: keyof ColumnData, value: string) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, [field]: value } : col)));
  };

  // Buscar porcentaje de ganancia según el monto de venta y el porcentaje de utilidad
  const findCommission = () => {
    if (!saleAmount || !profitPercentage) {
      setResult("Por favor ingresa valores para buscar.");
      return;
    }

    const sale = parseFloat(saleAmount);
    const profit = parseFloat(profitPercentage);

    // Buscar la fila correcta según el monto de venta
    const row = data.find((row) => {
      const min = parseFloat(row.min);
      const max = row.max === "adelante" ? Infinity : parseFloat(row.max);
      return sale >= min && sale <= max;
    });

    if (!row) {
      setResult("No se encontró un rango válido para el monto de venta.");
      return;
    }

    // Buscar la columna que tiene el porcentaje dentro del rango permitido
    const column = columns.find((col) => {
      const minProfit = parseFloat(col.minProfit);
      const maxProfit = col.maxProfit === "adelante" ? Infinity : parseFloat(col.maxProfit);
      return profit >= minProfit && profit <= maxProfit;
    });

    if (!column) {
      setResult("El porcentaje de utilidad está fuera del rango permitido.");
      return;
    }

    const commissionValue = row[column.id] || "0";
    console.log(saleAmount, commissionValue);
    setResult(`Porcentaje de ganancia: ${commissionValue} total a pagar ${formatCurrency(Number(saleAmount) * Number(commissionValue) / 100)}`);
  };

  // Cargar datos desde el servicio
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_APP_GRAPH}commissions`);
  //       const result = await response.json();
  //       const data = JSON.parse(result.jsonData)
  //       setColumns(data.columns); // Suponiendo que la API devuelve un objeto con 'columns' y 'data'
  //       setData(data.data);
  //       setType(data.tipo)
  //       setMonth(data.mes)
  //     } catch (error) {
  //       console.error("Error al cargar los datos:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuración de Comisiones</h2>

      <div className="flex gap-2 mb-4">
        <button onClick={addRow} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Agregar Rango (Fila)
        </button>
        <button onClick={addColumn} className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Agregar % Utilidad (Columna)
        </button>
        <button onClick={saveData} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          {loading ? 'Enviando...' : 'Guardar Datos'}
        </button>
      </div>
      <div className="flex w-full">
        {/* Selector para tipo (Interno / Externo) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="border border-gray-300 p-2 rounded-md w-1/3"
          >
            <option value="" selected >SELECIONE UNA OPCIÓN</option>
            <option value="interno">Interno</option>
            <option value="externo">Externo</option>
          </select>
        </div>

        {/* Selector para mes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mes</label>
          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            className="border border-gray-300 p-2 rounded-md w-1/3"
          >
            <option value="" selected >SELECIONE UNA OPCIÓN</option>
            {["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"].map((m, index) => (
              <option key={index} value={index + 1}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <button className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-not-allowed" disabled>
          Cargando...
        </button>
      ) : null}

      <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Mínimo</th>
              <th className="border border-gray-300 px-4 py-2">Máximo</th>
              {columns.map((col) => (
                <th key={col.id} className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => updateColumnData(col.id, "name", e.target.value)}
                    placeholder="Nombre"
                    className="w-full text-center"
                  />
                  <input
                    type="text"
                    value={col.minProfit}
                    onChange={(e) => updateColumnData(col.id, "minProfit", e.target.value)}
                    placeholder="Min %"
                    className="w-full text-center"
                  />
                  <input
                    type="text"
                    value={col.maxProfit}
                    onChange={(e) => updateColumnData(col.id, "maxProfit", e.target.value)}
                    placeholder="Max %"
                    className="w-full text-center"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center py-4 text-gray-500">
                  Agrega rangos y columnas para comenzar
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td><input type="text" value={row.min} onChange={(e) => updateCell(row.id, "min", e.target.value)} /></td>
                  <td><input type="text" value={row.max} onChange={(e) => updateCell(row.id, "max", e.target.value)} /></td>
                  {columns.map((col) => (
                    <td key={col.id}><input type="text" value={row[col.id] ?? ""} onChange={(e) => updateCell(row.id, col.id, e.target.value)} /></td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="verflow-x-auto bg-gray-100 p-4 rounded-lg shadow">
        <textarea 
          placeholder="Comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      {/* Validación del porcentaje de ganancia */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
        <h3 className="text-lg font-semibold mb-2">Buscar Porcentaje de Ganancia</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Monto de Venta"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-1/3"
          />
          <input
            type="number"
            placeholder="% Utilidad"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-1/3"
          />
          <button onClick={findCommission} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Calcular
          </button>
        </div>
        {result && <p className="mt-2 text-gray-700">{result}</p>}
      </div>
    </div>
  );
};
