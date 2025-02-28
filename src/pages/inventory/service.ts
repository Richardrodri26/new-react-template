// src/services/api.ts
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_MICRO_GRAPH}`;
const TRM_API_URL = 'https://www.datos.gov.co/resource/mcec-87by.json';

interface ApiResponse {
  success: boolean;
  number: string;
  data: {
    DistLoc: string;
    DistLocCountry: string;
    CommScopePart: string;
    PartDesc: string;
    UOM: string | null;
    Qty: number;
    ExtendedValuesUSD: number;
    Currency: string;
    ReportedMo: number;
  }[];
}

interface TRMResponse {
  vigenciahasta: string;
  valor: string;
}

export const obtenerDatos = async (fini: string, ffin: string, trm: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(API_URL + 'brute-force', {
      params: { fini, ffin, trm },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export const obtenerTRM = async (): Promise<string> => {
  try {
    const response = await axios.get(TRM_API_URL, {
      params: {
        vigenciahasta: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      },
    });
    const trmData = response.data[0];
    return (trmData.valor);
  } catch (error) {
    console.error('Error al obtener la TRM:', error);
    throw error;
  }
};