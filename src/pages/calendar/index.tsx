import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useVisitsQuery } from '@/domain/graphql';

interface Event {
  title: string;
  date: string; // Formato ISO 8601
  id: string;
}

const initialMonth = dayjs(); // Mes inicial actual

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(initialMonth);

  const getFirstAndLastDayOfMonth = (date: dayjs.Dayjs, initial = false) => {
    const firstDay = date.startOf( initial ? 'years' : 'month').format('YYYY-MM-DD');
    const lastDay = date.endOf(initial ? 'years' : 'month').format('YYYY-MM-DD');
    return { firstDay, lastDay };
  };

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(currentMonth, true);

  const { data, loading } = useVisitsQuery({
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
        title: visit.description,
        date: dayjs(visit.dateVisit).format('YYYY-MM-DD'),
        backgroundColor: 'black' // Asegurar formato ISO 8601
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
    console.log(arg);
    alert('Evento clicado: ' + arg.event.title);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
        <CardDescription>
          Gestiona las visitas.
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
    </Card>
  );
};

export default CalendarPage;
