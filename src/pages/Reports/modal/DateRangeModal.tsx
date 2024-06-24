import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (startDate: Date, endDate: Date) => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleConfirm = () => {
    if (startDate && endDate) {
      onConfirm(startDate, endDate);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Selecciona un rango de fechas"
      ariaHideApp={false} // Necesario para evitar problemas de accesibilidad
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-lg shadow-md max-w-screen-sm w-full max-h-4/5 overflow-y-auto"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
    >
      <h2 className="text-center text-lg font-bold mb-4">Selecciona un rango de fechas</h2>
      <div className="flex justify-between items-center mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de inicio"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
        <span className="mx-4">hasta</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date as Date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de fin"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
          
        />
      </div>
      <div className="text-center">
        <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
          Confirmar
        </button>
        <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default DateRangeModal;
