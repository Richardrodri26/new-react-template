import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderTypes, StatusVisitEnum, useUsersQuery, useVisitsQuery } from '@/domain/graphql';
import ModalInfoCalendar from './modal/info.modal';
import { UserSelect } from '../Clients/Modals/CreateClient';
import { BasicFormProviderZod } from '@/components';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string; // Formato ISO 8601
  description: string; // Descripción del evento
}

const initialMonth = dayjs(); // Mes inicial actual

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(initialMonth);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Estado para almacenar detalles del evento seleccionado

  const getFirstAndLastDayOfMonth = (date: dayjs.Dayjs, initial = false) => {
    const firstDay = date.startOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    const lastDay = date.endOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    return { firstDay, lastDay };
  };

  const colorCalendat = (status: StatusVisitEnum): string => {
    switch (status) {
      case 'canceled':
        return '#ff0000';
      case 'confirmed':
        return '#0000ff';
      case 'programmed':
        return '#ffa500';
      case 'realized':
        return '#008000';
      case 'reprogrammed':
        return '#800080';
      default:
        return '#808080';
    }
  };

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(currentMonth, true);

  const { data, loading, refetch } = useVisitsQuery({
    variables: {
      where: {
        dateVisit: {
          _between: [firstDay, lastDay]
        }
      },
      pagination: {
        skip: 0,
        take: 999999
      }
    },
  });

  useEffect(() => {
    if (!loading && data?.visits) {
      const formattedEvents = data.visits.map((visit) => ({
        id: visit.id,
        title: visit.client.name + " / " + visit.user.name,
        date: dayjs(visit.dateVisit).format('YYYY-MM-DD'),
        description: visit.description, // Agrega la descripción del evento si está disponible
        backgroundColor: colorCalendat(visit.status) // Asegurar formato ISO 8601
      }));
      setEvents(formattedEvents);
    } else {
      setEvents([]);
    }
  }, [data, loading]);

  const handleDatesSet = (dateInfo: any) => {
    const start = dayjs(dateInfo.start);
    setCurrentMonth(start);
  };

  const eventClick = (arg: any) => {
    const clickedEvent = events.find(event => event.id === arg.event.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setModalOpen(true); // Abre el modal después de seleccionar el evento
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  const handleGo = (id: string) => {

    // Lógica para redirigir o realizar alguna acción cuando se hace clic en "Ir"
  };

  const refesh = (id: string) => {
    refetch({
      where: {
        dateVisit: {
          _between: [firstDay, lastDay]
        },
        user: {
          _eq: id
        }
      },
      pagination: {
        skip: 0,
        take: 999999
      }
    });
  };

  const UserSelect = () => {
    const { data, loading } = useUsersQuery({
      variables: {
        pagination: {
          skip: 0,
          take: 999999
        },
        orderBy: {
          createdAt: OrderTypes.Desc
        }
      }
    });

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>No data available</p>;

    const users = data.users; // Ajusta según la estructura real de tu respuesta GraphQL

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedUserId = event.target.value;
      refesh(selectedUserId);
    };

    return (
      <div>
        <label>Select a User:</label>
        <select onChange={handleChange}>
          <option value="">Select a user...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
        <CardDescription>
          <UserSelect />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          eventClick={eventClick}
          events={events}
          selectable={true}
          datesSet={handleDatesSet}
        />
      </CardContent>
      <CardFooter>
        {/* Puedes agregar contenido adicional al footer si es necesario */}
      </CardFooter>
      <ModalInfoCalendar
        title={selectedEvent?.title || ''}
        date={selectedEvent?.date || ''}
        description={selectedEvent?.description || ''}
        onClose={handleCloseModal}
        isOpen={modalOpen}
        id={selectedEvent?.id || ""}
      />
    </Card>
  );
};

export default CalendarPage;
