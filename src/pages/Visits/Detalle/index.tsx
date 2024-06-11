import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useVisitQuery } from '@/domain/graphql';


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
              <p className="text-gray-900">{visit.dateVisit}</p>
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
            <button
              onClick={handleStartVisit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Realizar Visita
            </button>
          </div>
        ) : (
          <div className="h-64 w-full mb-6">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={visit.location}
                zoom={15}
              >
                <Marker position={visit.location} />
              </GoogleMap>
            </LoadScript>
          </div>
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
          {/* {visit?.comments?.concat(comments)?.map(comment => (
            <div key={comment.id} className="mb-2">
              <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold text-white ${comment.type === 'A' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {comment.type}
              </span>
              <span className="ml-2 text-gray-700">{comment.text}</span>
            </div>
          ))} */}
          <div className="mt-4">
            <textarea
              className="w-full p-3 border rounded mb-2"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Añadir comentario..."
            />
            <div className="flex items-center mb-4">
              <label className="mr-2">Tipo:</label>
              <select value={commentType} onChange={(e) => setCommentType(e.target.value as 'A' | 'B')} className="p-2 border rounded">
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
              <Button onClick={handleAddComment} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear Comentatio
                </span>
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
