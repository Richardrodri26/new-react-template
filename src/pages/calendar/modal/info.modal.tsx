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
  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingTop: '50px'
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: '#fefefe',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '60%',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    maxHeight: '80%',
    overflowY: 'auto'
  };

  const modalHeaderStyle: React.CSSProperties = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'right', // Alineación a la derecha
    paddingRight: '20px' // Espaciado derecho
  };

  const modalTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    flex: '1', // El título ocupa el espacio restante
    textAlign: 'left' // Alineación del título a la izquierda
  };

  const modalBodyStyle: React.CSSProperties = {
    marginBottom: '20px',
    lineHeight: '1.6',
    textAlign: 'left',
    paddingLeft: '20px',
    paddingRight: '20px'
  };

  const modalFooterStyle: React.CSSProperties = {
    textAlign: 'center'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '0 10px'
  };

  const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f14668'
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
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <div className="modal-header" style={modalHeaderStyle}>
          <h2 className="modal-title" style={modalTitleStyle}>{title}</h2>
          <span className="close" style={{ cursor: 'pointer', fontSize: '2rem' }} onClick={handleClose}>&times;</span>
        </div>
        <div className="modal-body" style={modalBodyStyle}>
          <p><strong>Fecha:</strong> {date}</p>
          <p><strong>Descripción:</strong> {description}</p>
        </div>
        <div className="modal-footer" style={modalFooterStyle}>
          <button className="button" style={buttonStyle} onClick={handleGo()}>Ir a la visita</button>
          {/* <button className="button" style={closeButtonStyle} onClick={handleClose}>Cerrar</button> */}
        </div>
      </div>
    </div>
  );
};

export default ModalInfoCalendar;
