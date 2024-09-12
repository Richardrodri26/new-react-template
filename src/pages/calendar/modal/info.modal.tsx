import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  title: string;
  date: string;
  description: string;
  onClose: () => void;
  isOpen: boolean;
  id: string;
}

const ModalInfoCalendar: React.FC<ModalProps> = ({ title, date, description, id,onClose, isOpen }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '0 10px'
  };

  const handleClose = () => {
    onClose();
  };
  const handleGo = () =>{
    handleClose()
    const navigate = useNavigate(); 
    let path = `/dashboard/visit/${id}`; 
    navigate(path);
  }
  if(id == "") return
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <p><strong>Fecha:</strong> {dayjs(date).format("YYYY-MM-DD HH:mm")}</p><br />
        <p><strong>Descripción:</strong> <br />{description}</p><br />
        <Button className="button" style={buttonStyle} onClick={()=>    window.location.href = `/dashboard/visit/${id}`}>Ir a la visita</Button>
      </ModalBody>
      <ModalFooter>
        <button onClick={handleClose}>Cerrar</button>
      </ModalFooter>
    </Modal>
         
  );
};

export default ModalInfoCalendar;
