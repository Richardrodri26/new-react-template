import React from 'react';
import { useVisitComentsQuery } from '@/domain/graphql';
import { format } from 'date-fns';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'; // Importamos componentes de React Tabs
import 'react-tabs/style/react-tabs.css'; // Estilos básicos de React Tabs
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

// Definimos los nombres en español para los tipos y estados
const tipoComentario = {
  COMMITMENTS: 'Compromisos',
  RESULTS: 'Resultados',
};

const estadoComentario = {
  CANCELED: { label: 'Cancelado', color: '#ff0000' },
  PENDING: { label: 'Pendiente', color: '#ffa500' },
  REALIZED: { label: 'Realizado', color: '#008000' },
};

interface VisitComment {
  type: keyof typeof tipoComentario; // Tipo de comentario como una de las claves de tipoComentario
  createdAt: Date;
  id: string;
  user: {
    name: string;
  };
  description: string;
  status: keyof typeof estadoComentario; // Estado de comentario como una de las claves de estadoComentario
}

interface VisitCommentsProps {
  visitId: string;
}

const VisitComments: React.FC<VisitCommentsProps> = ({ visitId }) => {
  const { data, loading, error } = useVisitComentsQuery({
    variables: {
      where: {
        visit: {
          _eq: visitId,
        },
      },
    },
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>:(</div>;
  const { visitComents } = data;

  // Agrupamos los comentarios por tipo
  const groupedComments: { [key in keyof typeof tipoComentario]: VisitComment[] } = {
    COMMITMENTS: [],
    RESULTS: [],
  };

  visitComents.forEach((comment) => {
    groupedComments[comment.type].push(comment as any);
  });

  return (
    <Tabs>
      <TabList>
        {Object.keys(tipoComentario).map((key) => (
          <Tab key={key}>{tipoComentario[key as keyof typeof tipoComentario]}</Tab>
        ))}
      </TabList>

      {Object.keys(tipoComentario).map((key, index) => (
        <TabPanel key={key}>
          <div className="flex flex-col gap-4">
            {groupedComments[key as keyof typeof tipoComentario].map((comment) => (
              <Card
                key={comment.id}
                className="border border-gray-200 rounded-lg shadow-md"
                style={{ borderColor: estadoComentario[comment.status]?.color || '' }}
              >
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="font-bold text-lg">{comment.user.name}</CardTitle>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                  <CardDescription className="text-gray-700 mb-2">{estadoComentario[comment.status]?.label || ''}</CardDescription>
                  <CardDescription className="text-gray-600">{comment.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default VisitComments;
