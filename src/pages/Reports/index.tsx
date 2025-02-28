import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReportsHeader } from './Elements';
import { GridPendingVisit } from './table/PendingTable';
import { useFindUtilidadRealQuery } from '@/domain/graphql';
import PresupuestoTable from './table/presupuesto';
import VentasTable from './table/marcasVenta';
import { BarChart, BarChart2, Brain, Map, Percent, ShoppingCart, Users } from 'lucide-react';
import VentasCharts from './statistic';
import ResumenCards from './components/ResumenCards';
import EstadisticasVentas from './statistic/zona-vendedor';
import TablaIVA from './table/ivaIdeaBimestre';
import FacturasTable from './table/comisionTotal';

const ReportsPage: React.FC = () => {
  const [visitData, setVisitData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [selectedVisitMonth, setSelectedVisitMonth] = useState(`${dayjs().format('MM')}`);
  const [selectedCommentMonth, setSelectedCommentMonth] = useState(`${dayjs().format('MM')}`);
  const [utilidad, setUtilidad] = useState(0)
  const [activeTab, setActiveTab] = useState("progress");
  const months = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  const fetchVisitData = async (startDate: string, endDate: string) => {
    try {
      const url = `https://intranet.cytech.net.co:3002/visit/countStatusVisitByDate/${startDate}/${endDate}`;
      const response = await axios.get(url);
      setVisitData(response.data);
    } catch (error) {
      console.error('Error fetching visit data:', error);
    }
  };

  const fetchCommentData = async (startDate: string, endDate: string) => {
    try {
      const url = `https://intranet.cytech.net.co:3002/visit/countStatusVisitComentStatic/${startDate}/${endDate}`;
      const response = await axios.get(url);
      setCommentData(response.data);
    } catch (error) {
      console.error('Error fetching comment data:', error);
    }
  };

  const handleVisitMonthChange = (month: string) => {
    setSelectedVisitMonth(month);
    const year = dayjs().year()
    const startDate = `${year}-${month}-01`;
    const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf('month').format('DD');
    const endDate = `${year}-${month}-${lastDayOfMonth}`;
    fetchVisitData(startDate, endDate);
  };

  const handleCommentMonthChange = (month: string) => {
    setSelectedCommentMonth(month);
    const year = dayjs().year()
    const startDate = `${year}-${month}-01`;
    const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf('month').format('DD');
    const endDate = `${year}-${month}-${lastDayOfMonth}`;
    fetchCommentData(startDate, endDate);
  };

  useEffect(() => {
    const year = dayjs().year()
    // Load data for initial months (if needed)
    if (selectedVisitMonth) {
      const startDate = `${year}-${selectedVisitMonth}-01`;
      const lastDayOfMonth = dayjs(`${year}-${selectedVisitMonth}-01`).endOf('month').format('DD');
      const endDate = `${year}-${selectedVisitMonth}-${lastDayOfMonth}`;
      fetchVisitData(startDate, endDate);
    }
    if (selectedCommentMonth) {
      const startDate = `${year}-${selectedCommentMonth}-01`;
      const lastDayOfMonth = dayjs(`${year}-${selectedCommentMonth}-01`).endOf('month').format('DD');
      const endDate = `${year}-${selectedCommentMonth}-${lastDayOfMonth}`;
      fetchCommentData(startDate, endDate);
    }
  }, [selectedVisitMonth, selectedCommentMonth]);
  const SellerTabas = () => {
    return (
      <>
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Reporte de Visitas</h2>
            <div className="flex items-center mb-6">
              <Select value={selectedVisitMonth} onValueChange={handleVisitMonthChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mes del año" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((item) => (
                    <SelectItem key={item.value} value={item.value} defaultChecked={dayjs().format('MM') == item.value ? true : false}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Programadas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Realizadas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Canceladas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Confirmadas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimo de Visitas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porcentaje Visitas</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visitData?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{item["name"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalProgramadas"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalRealizadas"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalCancelada"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalConfirmada"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["minimiVisit"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full h-4 bg-gray-200 rounded-md">
                            <div
                              className={`h-full ${calculatePercentageColor(
                                (item["totalRealizadas"] / item["minimiVisit"]) * 100
                              )} rounded-md`}
                              style={{ width: `${(item["totalRealizadas"] / item["minimiVisit"]) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Reporte de tareas</h2>
            <div className="flex items-center mb-6">
              <Select value={selectedCommentMonth} onValueChange={handleCommentMonthChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Mes del año" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tareas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Realizadas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pendientes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Canceladas</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {commentData?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{item["name"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalComentarios"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalRealizadas"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalPendientes"]}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item["totalCancelada"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Visitas sin responder</h2>
          <GridPendingVisit></GridPendingVisit>
        </div>
      </div>
      </>
    )
  }
  const AnaliticaTabs = () => {
    return (
      <>
       <VentasCharts/>
      </>
    )
  }
  const VentasXmarcasTabs = () => {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ventas por Marca</h2>
          <VentasTable />
        </div>
      </div>
    )
  }
  const IvaIdealBiMestre = () => {
    return (
      <>
        <TablaIVA/>
      </>
    )
  }
  const tabs = [
    { id: "progress", label: "Progresos Ventas", icon: BarChart },
    { id: "seller", label: "Seller", icon: Users },
    { id: "brands", label: "Ventas por Marcas", icon: ShoppingCart },
    { id: "statisc", label: "Estadistica", icon: BarChart2},
    { id: "zona", label: "Zona", icon: Map},
    { id: "iva", label: "BI.", icon: Brain},
  ];
  
  return (
    <>
      <ReportsHeader/>
      <ResumenCards utilidad={utilidad} />
      <div className="flex items-end gap-1 bg-gray-100 p-1 rounded-t-lg">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border border-b-0 transition-all duration-300 ${
              activeTab === id
                ? "bg-white border-gray-300 text-blue-500 shadow-sm"
                : "bg-gray-200 border-transparent text-gray-600 hover:bg-gray-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      {activeTab === "progress" && <FacturasTable />}
      {activeTab === "seller" && <SellerTabas />}
      {activeTab === "brands" && <VentasXmarcasTabs/>}
      {activeTab === "statisc" && <AnaliticaTabs/>}
      {activeTab === "zona" && <EstadisticasVentas/>}
      {activeTab === "iva" && <IvaIdealBiMestre/>}
    </>
  );
};

export default ReportsPage;

export function calculatePercentageColor(percentage: number): string {
  if (percentage >= 80) {
    return 'bg-green-500';
  } else if (percentage >= 60) {
    return 'bg-yellow-500';
  } else if (percentage >= 40) {
    return 'bg-orange-500';
  } else {
    return 'bg-red-500';
  }
}
