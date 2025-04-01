import { useEffect, useState } from "react";
import { CommissionsHeader } from "./Elements";
import axios from "axios";
import { TypeWorker, useUsersQuery } from "@/domain/graphql";
import Lottie from "lottie-react";
import loadingAnimations from '../../assets/animations/loading.json'
// Componente de carga
export const Loader = () => (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
            <Lottie
                animationData={loadingAnimations}
                loop={true}
                style={{
                    width: '300px',
                    height: '300px',
                    marginBottom: '20px'
                  }}
            />
            <p className="text-lg font-semibold text-gray-700">
                Obteniendo información de la intranet, esto puede demorar unos minutos...
            </p>
        </div>
    </div>
);

export const CommissionsPage = () => {
    const [workersData, setWorkersData] = useState<WorkerData[]>([]);
    const [loadingCommissions, setLoadingCommissions] = useState(true); // Estado para mostrar el loader
    const { data: usersData, loading: loadingUsers } = useUsersQuery({
        variables: {
            pagination: {
                skip: 0,
                take: 999
            },
        }
    });

    useEffect(() => {
        const fetchWorkersData = async () => {
            try {
                setLoadingCommissions(true); // Iniciar la carga de comisiones

                // Obtener datos de la API REST
                const response = await axios.get("https://intranet.cytech.net.co:3002/visit/commisionsDataUser");
                const commissionsData = response.data;

                // Unir datos de GraphQL y la API REST
                if (usersData) {
                    const combinedData = commissionsData
                        .map((worker: any) => {
                            const user = usersData.users.find(
                                (u: any) => u.identificationNumber === worker.DOCUMENTO
                            );
                            if (user) {
                                return {
                                    nombre: `${user.fullName}`,
                                    totalVendido: parseFloat(worker.TOTAL.replace(/,/g, '')),
                                    rentabilidad: worker.RENTABILIDAD,
                                    interno: user.typeWoker === TypeWorker.Interno, // Ajusta el campo según tu lógica
                                };
                            }
                            return null;
                        })
                        .filter((worker: WorkerData | null) => worker !== null); // Filtrar los nulos
                    setWorkersData(combinedData);
                }
            } catch (error) {
                console.error("Error al obtener los datos de comisiones", error);
            } finally {
                setLoadingCommissions(false); // Terminar la carga
            }
        };

        fetchWorkersData();
    }, [usersData]);

    if (loadingUsers || loadingCommissions) {
        return <Loader />; // Mostrar loader mientras cargan los datos
    }

    return (
      <>
        <CommissionsHeader />
        <CommissionsTable workers={workersData} />
      </>
    );
};

type WorkerData = {
    nombre: string;
    totalVendido: number;
    rentabilidad: number;
    totalVisitas: number;
    interno: boolean;
};

// Tabla de comisiones
const CommissionsTable = ({ workers }: { workers: WorkerData[] }) => {
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-7xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Comisiones de Trabajadores</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Nombre del Trabajador</th>
                            <th className="border border-gray-300 px-4 py-2">Tipo</th>
                            <th className="border border-gray-300 px-4 py-2">Total Vendido</th>
                            <th className="border border-gray-300 px-4 py-2">Rentabilidad (%)</th>
                            {/* <th className="border border-gray-300 px-4 py-2">Total de Visitas</th> */}
                            <th className="border border-gray-300 px-4 py-2">Total a Pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map((worker) => {
                            const commissionPercentage = calculateCommission(
                                worker.totalVendido,
                                worker.rentabilidad,
                                worker.interno
                            );

                            const totalPagar = (worker.totalVendido * commissionPercentage) / 100;

                            return (
                                <tr key={worker.nombre}>
                                    <td className="border border-gray-300 px-4 py-2">{worker.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{worker.interno ? 'INTERNO' : 'EXTERNO'}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {worker.totalVendido?.toLocaleString('es-CO') || 0}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{worker.rentabilidad.toFixed(2)}%</td>
                                    {/* <td className="border border-gray-300 px-4 py-2">{worker.totalVisitas}</td> */}
                                    <td className="border border-gray-300 px-4 py-2">
                                        {totalPagar?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) || 0}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Cálculo de comisiones (lo mantengo igual)
const calculateCommission = (totalVendido: number, rentabilidad: number, isInternal: boolean): number => {
    let commissionPercentage = 0;
    // Lógica de cálculo de comisiones
    if (isInternal) {
        if (totalVendido <= 100_000_000) {
            if (rentabilidad < 15) {
                commissionPercentage = 0;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 0;
            } else {
                commissionPercentage = 0.2;
            }
        } else if (totalVendido <= 200_000_000) {
            if (rentabilidad < 15) {
                commissionPercentage = 0.2;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 0.4;
            } else {
                commissionPercentage = 0.5;
            }
        } else {
            if (rentabilidad < 15) {
                commissionPercentage = 0.4;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 0.5;
            } else {
                commissionPercentage = 0.8;
            }
        }
    } else {
        if (totalVendido <= 100_000_000) {
            if (rentabilidad < 15) {
                commissionPercentage = 0;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 0;
            } else {
                commissionPercentage = 0.5;
            }
        } else if (totalVendido <= 200_000_000) {
            if (rentabilidad < 15) {
                commissionPercentage = 1;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 1.2;
            } else {
                commissionPercentage = 1.5;
            }
        } else {
            if (rentabilidad < 15) {
                commissionPercentage = 1.2;
            } else if (rentabilidad <= 25) {
                commissionPercentage = 1.5;
            } else {
                commissionPercentage = 2;
            }
        }
    }
    return commissionPercentage;
};
