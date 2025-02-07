import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from 'dayjs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderTypes, StatusVisitEnum, useUpdateVisitMutation, useUsersQuery, useVisitsQuery } from '@/domain/graphql';
import ModalInfoCalendar from './modal/info.modal';
import { UserSelect } from '../Clients/Modals/CreateClient';
import { BasicFormProviderZod } from '@/components';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ToastyErrorGraph } from '@/lib/utils';
import { toast } from 'sonner';

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
  const [updateDateVisit] = useUpdateVisitMutation();
  const getFirstAndLastDayOfMonth = (date: dayjs.Dayjs, initial = false) => {
    const firstDay = date.startOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    const lastDay = date.endOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    return { firstDay, lastDay };
  };

  const [selectedItem, setSelectedItem] = useState<string>("")

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
        title: visit.user.name + " - " + visit.client.name,
        date: dayjs(visit.dateVisit).format('YYYY-MM-DDTHH:mm:ss'),
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
  const handleEventDrop =  (info: any) => {
    const newDate = dayjs(info.event.start); // La nueva fecha seleccionada
    const currentDate = dayjs();
  
    // Validar si la nueva fecha es pasada
    // if (newDate.isBefore(currentDate)) {
    //   alert("No puedes seleccionar una fecha pasada.");
    //   info.revert(); // Revertir el evento a su fecha original
    //   return;
    // }
    try {
      updateDateVisit({
        variables: {
          updateInput: {
            id: info.event.id,
            dateVisit: newDate,
            status: StatusVisitEnum.Reprogrammed
          }
        }
      }).then(() => {
        toast.success("Actualizado con éxito");
      }).catch((err) => {
        ToastyErrorGraph(err as any);
      });
    }catch(error){
      ToastyErrorGraph(error as any)
      return
    } 
  
    // Actualizar el estado o hacer cualquier lógica de guardado
    const updatedEvents = events.map(event => 
      event.id === info.event.id 
        ? { ...event, date: newDate.format('YYYY-MM-DDTHH:mm:ss') } 
        : event
    );
    setEvents(updatedEvents);
  };
  const handleCloseModal = () => {
    setModalOpen(false); // Cierra el modal
  };

  const handleGo = (id: string) => {

    // Lógica para redirigir o realizar alguna acción cuando se hace clic en "Ir"
  };

  const refesh = (id: string) => {
    const where =  {
      dateVisit: {
        _between: [firstDay, lastDay]
      },
      user: {
        _eq: id
      }
    }
    /*@ts-ignore*/
    if(id == "TODOS") delete where.user
    refetch({
      where
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
      <>
        {/* <div>
          <label>Select a User:</label>
          <select onChange={handleChange}>
            <option value="">Select a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div> */}

        <Label htmlFor='user' className='text-center text-2xl font-bold'>Selecciona un usuario:</Label>
        <Select value={selectedItem} onValueChange={value => {setSelectedItem(value); refesh(value)}}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="usuario" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem key={"TODOS"} value='TODOS'>Seleccionar todos</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>{`${user.name} ${user.lastName || ""}`.toLocaleUpperCase()}</SelectItem>
            ))}

          </SelectContent>
        </Select>
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center text-4xl font-bold'>Calendario de visitas</CardTitle>
        <CardDescription>
          <UserSelect />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // Agrega los plugins necesarios
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Configura las vistas disponibles
          }}
          height="auto"
          eventClick={eventClick}
          editable={true}
          events={events}
          selectable={true}
          locale={'es'}
          datesSet={handleDatesSet}
          eventDrop={handleEventDrop} 
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
