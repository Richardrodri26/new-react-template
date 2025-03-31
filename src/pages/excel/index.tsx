import { useCrearConceptoMutation, useEliminarConceptoMutation, useUpdateConceptoMutation } from '@/domain/graphql';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Concepto {
  id: string;
  nombre: string;
  valores: { [mes: string]: number | null };
  esSuma: boolean;
  editable?: boolean;
}

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Función para formatear valores como pesos colombianos
const formatoCOP = (valor: number | null) => {
  if (valor === null || isNaN(valor)) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor);
};

const TablaConceptos: React.FC = () => {
  const [conceptos, setConceptos] = useState<Concepto[]>([]);
  const [nuevoConcepto, setNuevoConcepto] = useState<string>('');
  const [lastMes, setLastMes] = useState<string | null>(null);
  const [total, setTotal] = useState<{ [mes: string]: number }>({});
  const [editando, setEditando] = useState<{ id: string | null; mes: string | null }>({ id: null, mes: null });
  const [crearConecpto] = useCrearConceptoMutation()
  const [updateConcepto] = useUpdateConceptoMutation()
  const [eliminarConceptoMuation] = useEliminarConceptoMutation()
  const fetchData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch(`${import.meta.env.VITE_APP_GRAPH}fletes/getValueDefaultTable`),
        fetch(`${import.meta.env.VITE_APP_GRAPH}conceptos`),
      ]);
  
      if (!response1.ok || !response2.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data1 = await response1.json();
      const data2 = await response2.json();
  
      const conceptosAPI = data1.conceptos.map((concepto: Concepto) => ({
        ...concepto,
        valores: meses.reduce((acc, mes) => ({ ...acc, [mes]: concepto.valores[mes] || 0 }), {}),
      }));
  
      const conceptosBackend = data2.map((concepto: Concepto) => ({
        ...concepto,
        valores: meses.reduce((acc, mes) => ({ ...acc, [mes]: concepto.valores[mes] || 0 }), {}),
      }));
  
      setConceptos([...conceptosAPI,...conceptosBackend]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  // Ejecutar solo una vez al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Calcular el total
  const calcularTotal = () => {
    const nuevosTotales = meses.reduce((acc, mes) => {
      const totalMes = conceptos.reduce((sum, concepto) => {
        const valor = concepto.valores[mes] || 0;
        return sum + (concepto.esSuma ? valor : -valor);
      }, 0);
      return { ...acc, [mes]: totalMes };
    }, {});

    setTotal(nuevosTotales);
  };

  useEffect(() => {
    if (conceptos.length > 0) {
      calcularTotal();
    }
  }, [conceptos]);

  // Agregar un nuevo concepto
  const agregarConcepto = async () => {
    if (nuevoConcepto.trim() === '') return;

    const nuevo = {
      nombre: nuevoConcepto,
      valores: JSON.stringify(meses.reduce((acc, mes) => ({ ...acc, [mes]: 0 }), {})),
      esSuma: false,
      editable: true,
    };

    try {
      const response = await crearConecpto({
        variables: {
          data: {
            ...nuevo
          }
        }
      })
       
      if (response.errors) {
        toast.error('Hubo un erro al actualizar')
        return
      }
      if(response.data?.crearConcepto){
        let conceptoGuardado = response.data?.crearConcepto
        conceptoGuardado.valores = JSON.parse(conceptoGuardado.valores)
        /*@ts-ignore*/
        setConceptos([...conceptos, conceptoGuardado]);
        setNuevoConcepto('');
        toast.success('actualizado con exíto')
      }
    } catch (error) {
      toast.error('Hubo un erro al actualizar')
      console.error('Error:', error);
    }
  };

  // Editar un valor de un concepto
  const editarValor = async (id: string, mes: string, valor: number | null, rest = false) => {
    const conceptoActualizado = conceptos.map((concepto) =>
      concepto.id == id ? { ...concepto, valores: { ...concepto.valores, [mes]: valor } } : concepto
    );

    setConceptos(conceptoActualizado);
    if(!rest) return
    const conceptoAactulizar = conceptos.find((conecpt) => conecpt.id == id) || {} as any
    if(conceptoAactulizar){
      try {
        const response = await updateConcepto({
          variables: {
            actualizarConceptoDto: {
              id: conceptoAactulizar.id,
              valores: JSON.stringify(conceptoAactulizar.valores),
              editable: conceptoAactulizar.editable,
              esSuma: conceptoAactulizar.esSuma,
              nombre: conceptoAactulizar.nombre
            }
          }
        })
  
        if (response.errors) {
          toast.error('Hubo un erro al actualizar')
          return
        }
        toast.success('actualizado con exíto')
      } catch (error) {
        toast.error('Hubo un erro al actualizar')
        console.error('Error:', error);
      }
    } 
    
  };

  // Cambiar entre suma y resta
  const toggleSumaResta = async (id: string) => {
    const conceptoActualizado = conceptos.map((concepto) =>
      concepto.id === id ? { ...concepto, esSuma: !concepto.esSuma } : concepto
    );

    setConceptos(conceptoActualizado);

    const conceptoAactulizar = conceptos.find((conecpt) => conecpt.id == id) || {} as any
    if(conceptoAactulizar){
      try {
        const response = await updateConcepto({
          variables: {
            actualizarConceptoDto: {
              id: conceptoAactulizar.id,
              valores: JSON.stringify(conceptoAactulizar.valores),
              editable: conceptoAactulizar.editable,
              esSuma: conceptoAactulizar.esSuma,
              nombre: conceptoAactulizar.nombre
            }
          }
        })
  
        if (response.errors) {
          toast.error('Hubo un erro al actualizar')
          return
        }
        toast.success('actualizado con exíto')
      } catch (error) {
        toast.error('Hubo un erro al actualizar')
        console.error('Error:', error);
      }
    } 
  };

  // Replicar un valor en todos los meses
  const replicarValor = async (id: string, mes: string | null) => {
    if(!mes) return
    const conceptoActualizado = conceptos.map((concepto) =>
      concepto.id === id
        ? { ...concepto, valores: meses.reduce((acc, m) => ({ ...acc, [m]: concepto.valores[mes] || 0 }), {}) }
        : concepto
    );

    setConceptos(conceptoActualizado);

    const conceptoAactulizar = conceptos.find((conecpt) => conecpt.id == id) || {} as any
    if(conceptoAactulizar){
      try {
        const response = await updateConcepto({
          variables: {
            actualizarConceptoDto: {
              id: conceptoAactulizar.id,
              valores: JSON.stringify(conceptoAactulizar.valores),
              editable: conceptoAactulizar.editable,
              esSuma: conceptoAactulizar.esSuma,
              nombre: conceptoAactulizar.nombre
            }
          }
        })
  
        if (response.errors) {
          toast.error('Hubo un erro al actualizar')
          return
        }
        toast.success('actualizado con exíto')
      } catch (error) {
        toast.error('Hubo un erro al actualizar')
        console.error('Error:', error);
      }
    }
  };

  // Eliminar un concepto
  const eliminarConcepto = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este concepto?')) {
      try {
        const response = await eliminarConceptoMuation({
          variables: {
            eliminarConceptoDto: id
          }
        })

        if (response.errors) {
          toast.error('Error al eliminar el concepto');
          return
        }
        toast.success('Eliminado con exíto')
        setConceptos(conceptos.filter((concepto) => concepto.id !== id));
      } catch (error) {
        toast.error('Error al eliminar el concepto');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={nuevoConcepto}
          onChange={(e) => setNuevoConcepto(e.target.value)}
          placeholder="Nuevo concepto"
          className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={agregarConcepto}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Agregar Concepto
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Concepto</th>
              {meses.map((mes) => (
                <th key={mes} className="py-3 px-4 text-left font-semibold text-gray-700 min-w-[150px]">
                  {mes}
                </th>
              ))}
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {conceptos.map((concepto) => (
              <tr
                key={concepto.id}
                className={`hover:bg-gray-50 transition-colors ${
                  !concepto.editable ? 'bg-gray-100' : ''
                }`}
              >
                <td className="px-2 border-b">
                  <input
                    type="text"
                    value={concepto.nombre}
                    onChange={(e) => {
                      if (concepto.editable) {
                        setConceptos(
                          conceptos.map((c) =>
                            c.id === concepto.id ? { ...c, nombre: e.target.value } : c
                          )
                        );
                      }
                    }}
                    className={`border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !concepto.editable ? 'bg-gray-200 cursor-not-allowed' : ''
                    } ${ concepto.esSuma ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}
                    disabled={!concepto.editable}
                  />
                </td>
                {meses.map((mes) => (
                  <td key={mes} className="py-3 px-4 border-b">
                    {editando.id === concepto.id && editando.mes === mes ? (
                      <input
                        type="number"
                        value={concepto.valores[mes] || 0}
                        onChange={(e) => {
                          editarValor(concepto.id, mes, parseFloat(e.target.value))
                          setLastMes(mes)
                        }}
                        onBlur={(e) => {
                          editarValor(concepto.id, mes, parseFloat(e.target.value), true)
                          setEditando({ id: null, mes: null })}
                        }
                        
                        className={`border ${
                          concepto.esSuma ? 'text-green-500' : 'text-red-500'
                        } ${ concepto.esSuma ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'} border-gray-300 rounded-lg p-1 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => {
                          if (concepto.editable) {
                            setEditando({ id: concepto.id, mes });
                          }
                        }}
                        className={`p-1 w-full text-center cursor-pointer ${
                          !concepto.editable ? 'cursor-not-allowed' : 'hover:bg-gray-200'
                        } ${ concepto.esSuma ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}
                      >
                        {formatoCOP(concepto.valores[mes])}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-2 border-b">
                  {concepto.editable && (
                    <div className="flex flex-row space-y-2">
                      <button
                        onClick={() => toggleSumaResta(concepto.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          concepto.esSuma ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                        } text-white transition-colors`}
                      >
                        {concepto.esSuma ? 'Suma' : 'Resta'}
                      </button>
                      <button
                        onClick={() => replicarValor(concepto.id, lastMes)}
                        className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors"
                      >
                        Replicar
                      </button>
                      <button
                        onClick={() => eliminarConcepto(concepto.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td className="py-3 px-4 font-bold text-gray-700">Total</td>
              {meses.map((mes) => (
                <td key={mes} className="py-3 px-4 font-bold text-gray-700">
                  {formatoCOP(total[mes] || 0)}
                </td>
              ))}
              <td className="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TablaConceptos;