import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardIcon } from '../../components/ui/report-cards';
import DateRangeModal from './modal/DateRangeModal';
import axios from 'axios';
import dayjs from 'dayjs';

const ReportsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const openModal = (reportType: string) => {
    setSelectedReport(reportType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const handleGenerateReport = async (startDate: Date, endDate: Date) => {
    if (!selectedReport) return;

    let url = '';
    switch (selectedReport) {
      case 'countStatusVisitByDate':
        url = `http://localhost:3002/visit/countStatusVisitByDate/${dayjs(startDate).format('YYYY-MM-DD')}/${dayjs(endDate).format('YYYY-MM-DD')}`;
        break;
      // Add more cases for different report types
      default:
        break;
    }

    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `report-${dayjs().unix()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card onClick={() => openModal('countStatusVisitByDate')}>
          <CardHeader>
            <CardIcon/>
            <CardTitle>Reporte de visitas por trabajadores</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Genera un reporte del total de visitas realizadas por los trabajadores agrupado por estados estados en un rango de fechas.
            </CardDescription>
          </CardContent>
        </Card>
        {/* Add more ReportCards for different reports */}
      </div>
      <DateRangeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleGenerateReport}
      />
    </div>
  );
};

export default ReportsPage;
