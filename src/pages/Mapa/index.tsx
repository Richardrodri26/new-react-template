import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, Button, Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material'; // Importa los componentes de MUI
import { OrderTypes, StatusVisitEnum, useUsersQuery, useVisitsLazyQuery, useVisitsQuery } from '@/domain/graphql';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpandIcon } from 'lucide-react';
import dayjs from 'dayjs';

// Ícono de trabajador (persona)
const workerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Ícono de cliente (punto de referencia)
const clientIcon = new L.Icon({
  iconUrl: '/mar.png', // Icono de cliente/punto de referencia
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export interface IRouterMapsWorker {
  coordinate: (string | null | undefined)[]; 
  name: string;
}

const MapaApp = () => {
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [loadingChange, setLoadingChange] = useState<boolean>(false)
  const [dates, setDates] = useState<string[]>([])

  const [routers, setRouters] = useState<IRouterMapsWorker[]>([])
  const [visits] = useVisitsLazyQuery()
  const onFilter = async (id: string, date: string[]) => {
    if(date.length < 0) return
    setLoadingChange(true)
    const {data} = await visits({
      variables: {
        where: {
          user: {
            _eq: id
          },
          status: {
            _eq: StatusVisitEnum.Realized
          },
          dateVisit: {
            _between: date
          }
        },
        pagination: {
          skip: 0,
          take: 10
        }
      }
    })
    const routers = data?.visits.map(v => {
      return {
        coordinate: [v.latitude, v.longitude],
        name: v.client.name,
      };
    }) || [] as IRouterMapsWorker[];
    setRouters(routers)
    setLoadingChange(false)
  }
  const onSelectUser = async (id: string) => {
    setSelectedItem(id)
    await onFilter(id, dates)
  }
  const onDateChange = async (date: string) => {
    setSelectedDate(date);
    const startDate = dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    setDates([startDate,endDate])
    await onFilter(selectedItem, dates)

  }
  
  const { data: dataUser, loading: loadingUser } = useUsersQuery({
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
  const users = dataUser?.users || []; 

  return (
    <div>
      <Card>
        <CardHeader
          title="Mapa de Visitas"
          subheader="Visualiza la ruta y los puntos de las visitas"
        />
        <CardContent>
          {/* Acordeón para el filtro de usuarios y mapa */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Seleccionar Usuario</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-start'}}>
                {
                  loadingUser
                  ? <p>Loading...</p>
                  : <Select value={selectedItem} onValueChange={value => { onSelectUser(value) }}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={"TODOS"} value='TODOS'>Seleccionar todos</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {`${user.name} ${user.lastName || ""}`.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                }
                <TextField
                  type="date"
                  label="Seleccionar Fecha"
                  value={selectedDate}
                  onChange={(e) => onDateChange(e.target.value)}
                  sx={{ marginLeft: '15px' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Acordeón para el mapa */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Mapa de Visitas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                loadingChange
                ? <>Cargando mapa...</>
                : <MapContainer
                    center={[11.0043428, -74.800892]}
                    zoom={13}
                    style={{ height: '500px' }}
                  >
                    {/* Capa de fondo del mapa */}
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* Control de zoom */}
                    <ZoomControl position="topright" />

                    {/* Línea de ruta */}
                    {/* <Polyline positions={routers?.map(x => x.coordinate)} color="blue" weight={4} opacity={0.7} /> */}

                    {/* Marcadores de las visitas */}
                    {/* {routers?.map((coordinate, index) => (
                      <Marker key={index} position={coordinate.coordinate}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                          {`Visita  #${index + 1}`}
                        </Tooltip>
                        <Popup>{`${coordinate.name}`}</Popup>
                      </Marker>
                    ))} */}
                  </MapContainer>
              }
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapaApp;
