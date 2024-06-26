import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useMutation, gql } from '@apollo/client'; // Importamos useMutation y gql desde Apollo Client
import acceptAnimation from '../../../assets/animations/accept.json';
import rejectAnimation from '../../../assets/animations/reject.json';
import { StatusVisitEnum, useAcceptOrDeclineVisitMutation, useUpdateVisitMutation } from '@/domain/graphql';


export const ConfirmEmailPage: React.FC = () => {
  const { state, id, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationStatus, setConfirmationStatus] = useState<boolean | null>(null);


  const [confirmVisitMutation] = useAcceptOrDeclineVisitMutation()

  let animationData;
  let message;
  let subtitle;
  let date = new Date().toLocaleDateString();
  let statusEmun: StatusVisitEnum

  if (state === 'confirmed') {
    statusEmun = StatusVisitEnum.Confirmed
    animationData = acceptAnimation;
    message = "¡La visita ha sido CONFIRMADA!";
    subtitle = "Gracias por confirmar tu cita. Te esperamos el día programado.";
  } else if (state === 'canceled') {
    statusEmun = StatusVisitEnum.Canceled
    animationData = rejectAnimation;
    message = "La visita ha sido CANCELADA.";
    subtitle = "Lamentamos la cancelación. Por favor, contáctanos para reprogramar.";
  } else {
    return <div>Estado desconocido</div>;
  }

  useEffect(() => {
    const confirmVisit = async () => {
      try {
        if(!id) return <></>
        const resMutation = await confirmVisitMutation({
          variables: {
            updateStatusInput: {
                id: id,
                status: statusEmun,
                token: token || ""
            }
          }
        });
        if (resMutation) {
          const { data, errors } = resMutation;
          if (!errors) {
            setConfirmationStatus(statusEmun == StatusVisitEnum.Confirmed);
          } else {
            setConfirmationStatus(false);
            setError(errors[0].message || 'Error desconocido al confirmar la visita.');
          }
        } else {
          setError('No se recibió una respuesta válida del servidor.');
        }
      } catch (error: any) {
        setError(`Error al conectar con el servidor. Por favor, intenta de nuevo más tarde. (${error["message"]})`);
      } finally {
        setLoading(false);
        setTimeout(()=>{
            window.close()
        }, 15000)
      }
    };

    confirmVisit();
  }, [confirmVisitMutation, state, id, token]);

  const containerStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f5f7fa'
  };

  const animationStyle: React.CSSProperties = {
    width: '300px',
    height: '300px',
    marginBottom: '20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    color: state === 'confirmed' ? '#4caf50' : '#f44336',
    margin: '10px 0'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px'
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px'
  };

  const contactStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#777'
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: state === 'confirmed' ? '#4caf50' : '#f44336',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  return (
    <div style={containerStyle}>
      {
        error ? 
        <></> 
        :
        <>
        <Lottie
            animationData={animationData}
            loop={true}
            style={animationStyle}
        />
        <h1 style={titleStyle}>{message}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        <p style={dateStyle}>Fecha de hoy: {date}</p>
        {/* {confirmationStatus !== null && (
        <p style={{ color: confirmationStatus ? 'green' : 'red' }}>
          {confirmationStatus ? 'La visita ha sido confirmada correctamente.' : 'Hubo un problema al confirmar la visita.'}
        </p>
      )} */}
      <p style={contactStyle}>Por favor, ponte en contacto con nosotros si tienes alguna pregunta.</p>
      <a href="/" style={{ ...buttonStyle, backgroundColor: '#2196f3', marginTop: '10px' }}>Volver a la página principal</a>
        </>
      }
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
