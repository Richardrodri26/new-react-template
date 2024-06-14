import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';

export default function CalendarPage() {
  const [events, setEvents] = useState([
    // Ejemplo de eventos iniciales
    { title: 'Evento 1', date: '2024-06-15' },
    { title: 'Evento 2', date: '2024-06-17' },
  ]);
function eventClick(a: EventClickArg){
    console.log(a)
    alert('Evento clicado: ' + a.event.title);
}
const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Por favor, introduce el título del evento:');
    if (title) {
      setEvents([
        ...events,
        {
          title,
          date: selectInfo.start.toDateString()
        },
      ]);
    }
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
      {/* Data table */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto" // ajustar la altura automáticamente según el contenido
        eventClick={eventClick}
        events={events}
        selectable={true}
        select={handleDateSelect}
      />
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>
  );
}
