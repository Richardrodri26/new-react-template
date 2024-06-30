import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useVisitQuery } from '@/domain/graphql';
import LocationMap from '@/components/Utils/googelMaps';
import VisitComments from './ComentVisit';
import dayjs from 'dayjs';


export const VisitDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visit, setVisit] = useState<any>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<'A' | 'B'>('A');
  if(!id) return <p>NO GAT ID</p>
  const { loading, error, data } = useVisitQuery({
    variables: { visitId: id },
  });
  useEffect(() => {
    if (data && data.visit) {
      setVisit(data.visit as any);
      setComments([]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const handleAddComment = () => {

  };
  const handleStartVisit = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(`Current location: ${latitude}, ${longitude}`);
          // Aquí puedes usar la ubicación para lo que necesites, por ejemplo, para actualizar la visita

        },
        error => {
          console.error("Error obtaining location: ", error);
          // Manejar error de obtención de ubicación
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Manejar caso en que la geolocalización no está soportada
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">{id}</h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
              <p className="text-gray-900">{dayjs(visit.dateVisit).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
              <p className="text-gray-900">{visit.status}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <p className="text-gray-900">{visit.description}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Cliente</label>
              <p className="text-gray-900">{visit.client?.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Contacto del Cliente</label>
              <p className="text-gray-900">{visit.client?.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Dirección del Cliente</label>
              <p className="text-gray-900">{visit.client?.address}</p>
            </div>
          </div>
        </div>
        {visit.status === 'confirmed' ? (
          <div className="p-6 text-center">
            <button disabled={true}
              // onClick={handleStartVisit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              No ha realizado la visita
            </button>
          </div>
        ) : (
          <div className="h-64 w-full mb-6">
            {
              visit.status === 'realized' 
              ?
              <>
                <p color='blue'><a href='#' color='blue'>!Click Aqui, para ver el marcador!</a></p>
                <LocationMap latitude={visit.latitude} longitude={visit.longitude}></LocationMap>
              </>
              :
              <></>
            }
          </div>
        )}
        <div className="p-6">
          <VisitComments visitId={id}></VisitComments>
        </div>
      </div>
    </div>
  );
};
