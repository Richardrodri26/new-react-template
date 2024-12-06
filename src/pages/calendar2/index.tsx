import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from 'dayjs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderTypes, VisitComentStatusEnum, VisitComentTypeEnum, useUsersQuery, useVisitComentsQuery } from '@/domain/graphql';
import ModalInfoCalendar from './modal/info.modal';
import DateSelectModal from './modal/DateModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Event {
  id: string;
  idVisit: string;
  title: string;
  date: string; // Formato ISO 8601
  description: string; // Descripción del evento
}

const initialMonth = dayjs(); // Mes inicial actual

const CalendarPage2: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(initialMonth);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de evento
  const [dateModalOpen, setDateModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de fecha
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Estado para almacenar detalles del evento seleccionado
  const [selectedDate, setSelectedDate] = useState<Date>(); // Estado para almacenar la fecha seleccionada

  const getFirstAndLastDayOfMonth = (date: dayjs.Dayjs, initial = false) => {
    const firstDay = date.startOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    const lastDay = date.endOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    return { firstDay, lastDay };
  };

  const [selectedItem, setSelectedItem] = useState<string>("");

  const colorCalendat = (status?: VisitComentStatusEnum | null): string => {
    switch (status) {
      case 'CANCELED':
        return '#ff0000';
      case 'PENDINIG':
        return '#ffa500';
      case 'REALIZED':
        return '#008000';
      default:
        return '#808080';
    }
  };

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(currentMonth, true);

  const { data, loading, refetch } = useVisitComentsQuery({
    variables: {
      where: {
        type: {
          _contains: VisitComentTypeEnum.Commitments
        },
        date: {
          _between: [firstDay, lastDay]
        }
      },
    },
  });

  useEffect(() => {
    if (!loading && data?.visitComents) {
      const formattedEvents = data.visitComents.map((coment) => ({
        id: coment.id,
        idVisit: coment?.visit?.id,
        title: coment.user.name + " - " + coment?.visit?.client?.name || "",
        date: dayjs(coment.date).format("YYYY-MM-DD HH:mm"),
        description: coment.description, // Agrega la descripción del evento si está disponible
        backgroundColor: colorCalendat(coment.status) // Asegurar formato ISO 8601
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

  const handleDateClick = (dateInfo: DateClickArg) => {
    console.log("index", dateInfo.date)
    setSelectedDate(dateInfo.date); // Almacena la fecha seleccionada
    setDateModalOpen(true); // Abre el nuevo modal
  };

  const handleCloseEventModal = () => {
    setModalOpen(false); // Cierra el modal de evento
  };

  const handleCloseDateModal = () => {
    setDateModalOpen(false); // Cierra el modal de fecha
  };

  const refesh = (id: string) => {
    const where = {
      user: {
        _eq: id
      },
      type: {
        _contains: VisitComentTypeEnum.Commitments
      },
      date: {
        _between: [firstDay, lastDay]
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

    return (
      <>
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
        <CardTitle className='text-center text-4xl font-bold'>Calendario de compromisos</CardTitle>
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
          dateClick={handleDateClick} // Utiliza dateClick para manejar el clic en las fechas
          selectable={true}
          events={events}
          datesSet={handleDatesSet}
          locale={'es'}
        />
      </CardContent>
      <CardFooter>
        {/* Puedes agregar contenido adicional al footer si es necesario */}
      </CardFooter>
      <ModalInfoCalendar
        title={selectedEvent?.title || 'Evento'}
        date={selectedEvent?.date || selectedDate?.toDateString() || ''}
        description={selectedEvent?.description || ''}
        onClose={handleCloseEventModal}
        isOpen={modalOpen}
        id={selectedEvent?.idVisit || ""}
      />
      <DateSelectModal
        isOpen={dateModalOpen}
        onClose={handleCloseDateModal}
        selectedDate={selectedDate || new Date()}
      />
    </Card>
  );
};

export default CalendarPage2;
