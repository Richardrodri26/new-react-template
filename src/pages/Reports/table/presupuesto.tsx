import React from "react";
import { Table, Spin } from "antd";
import { useFindUtilidadRealQuery } from "@/domain/graphql";
import dayjs from "dayjs";

const PresupuestoTable = () => {
  const { data, loading, error } = useFindUtilidadRealQuery({
    variables: {
      input: {
        startDate: dayjs().startOf("month").format("YYYY-MM-DD") + " 00:00:00",
        endDate: dayjs().endOf("month").format("YYYY-MM-DD") + " 23:59:59",
      },
    },
  });

  if (loading) return <Spin size="large" />;
  if (error) return <div>Error: {error.message}</div>;

  // Definimos las columnas para la tabla principal
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
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: "Utilidad Porcentaje",
      dataIndex: "utilidadPorcentaje",
      key: "utilidadPorcentaje",
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
        title: "Venta",
        dataIndex: "venta",
        key: "venta",
        render: (value: number) => value.toLocaleString(),
      },
  ];

  // Definir el render de la subtabla
  const expandedRowRender = (record: any) => {
    const subColumns = [
      { title: "Venta", dataIndex: "venta", key: "venta" },
      { title: "Costo", dataIndex: "costo", key: "costo" },
      { title: "Flete", dataIndex: "flete", key: "flete" },
      { title: "Comisión", dataIndex: "comision", key: "comision" },
      { title: "OIP", dataIndex: "oip", key: "oip" },
    ];

    // Aquí renderizas una subtabla con más detalles
    return (
      <Table
        columns={subColumns}
        dataSource={[record]} // Puedes incluir más datos si es necesario
        pagination={false} // Si no quieres paginación en la subtabla
        rowKey="number_document"
        size="small"
      />
    );
  };

  const tableData = data?.findUtilidadReal.trabajadores || [];

  const handleExpand = (record: any) => {
    // Puedes hacer alguna acción aquí si necesitas hacer algo cuando el usuario haga clic en el enlace
  };

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey="number_document"
      expandedRowRender={expandedRowRender} // Agregamos el render de la subtabla
      pagination={false}
      bordered
    />
  );
};

export default PresupuestoTable;
