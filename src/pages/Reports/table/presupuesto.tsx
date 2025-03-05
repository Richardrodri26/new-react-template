import React, { useState } from "react";
import { Table, Spin } from "antd";
import { useFindUtilidadRealQuery } from "@/domain/graphql";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from "./marcasVenta";

const PresupuestoTable = () => {
  const [selectedVisitMonth, setSelectedVisitMonth] = useState(`${dayjs().format('MM')}`);

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

  const { data, loading, error, refetch } = useFindUtilidadRealQuery({
    variables: {
      input: {
        startDate: dayjs().startOf("month").format("YYYY-MM-DD") + " 00:00:00",
        endDate: dayjs().endOf("month").format("YYYY-MM-DD") + " 23:59:59",
      },
    },
  });

  const handleVisitMonthChange = (month: string) => {
    setSelectedVisitMonth(month);
    const year = dayjs().year();
    const startDate = `${year}-${month}-01`;
    const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf('month').format('DD');
    const endDate = `${year}-${month}-${lastDayOfMonth}`;

    refetch({
      input: {
        startDate: dayjs(startDate).startOf("month").format("YYYY-MM-DD") + " 00:00:00",
        endDate: dayjs(endDate).endOf("month").format("YYYY-MM-DD") + " 23:59:59",
      },
    });
  };

  if (loading) return <Spin size="large" />;
  if (error) return <div className="text-red-500 text-center">⚠ Error: {error.message}</div>;

  // ✅ Definimos las columnas de la tabla principal
  const columns = [
    {
      title: "Número de Documento",
      dataIndex: "number_document",
      key: "number_document",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Utilidad Real",
      dataIndex: "utilidadReal",
      key: "utilidadReal",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Utilidad Porcentaje",
      dataIndex: "utilidadPorcentaje",
      key: "utilidadPorcentaje",
      render: (value: number) => `${value?.toFixed(2)}%`,
    },
    {
      title: "Venta",
      dataIndex: "totalVendido",
      key: "totalVendido",
      render: (value: number) => formatCurrency(value),
    },
  ];

  // ✅ Subtabla con formateador en cada campo
  const expandedRowRender = (record: any) => {
    const subColumns = [
      {
        title: "Venta",
        dataIndex: "totalVendido",
        key: "totalVendido",
        render: (value: number) => formatCurrency(value),
      },
      {
        title: "Costo",
        dataIndex: "costo",
        key: "costo",
        render: (value: number) => formatCurrency(value),
      },
      {
        title: "Flete",
        dataIndex: "flete",
        key: "flete",
        render: (value: number) => formatCurrency(value),
      },
      {
        title: "Comisión",
        dataIndex: "comision",
        key: "comision",
        render: (value: number) => formatCurrency(value),
      },
      {
        title: "OIP",
        dataIndex: "oip",
        key: "oip",
        render: (value: number) => formatCurrency(value),
      },
    ];

    return (
      <Table
        columns={subColumns}
        dataSource={[record]}
        pagination={false}
        rowKey="number_document"
        size="small"
        bordered
      />
    );
  };

  const tableData = data?.findUtilidadReal.trabajadores || [];

  return (
    <>
      <div className="flex items-center mb-6">
        <Select value={selectedVisitMonth} onValueChange={handleVisitMonthChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mes del año" />
          </SelectTrigger>
          <SelectContent>
            {months.map((item) => (
              <SelectItem key={item.value} value={item.value} defaultChecked={dayjs().format('MM') === item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="number_document"
        expandedRowRender={expandedRowRender}
        pagination={false}
        bordered
      />
    </>
  );
};

export default PresupuestoTable;
