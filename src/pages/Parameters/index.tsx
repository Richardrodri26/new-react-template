import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParametersGrid } from "./Grids";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { ParameterModals } from "./Modals";
import {
  ClipboardList,
  DollarSign,
  Layers,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import { CommissionsConfigPage } from "./comision";
import { ComisionByUserPage } from "../Fletes/comisionByUser";
import { TipoPoryectoPage } from "../typeProyect";
import { MarcaPoryectoPage } from "../marcaProyecto";
import { PresupuestoPage } from "../presupuesto";
import { GroupsUtilidadTable } from "./GroupsUtilidadTable";

// 1️⃣ Definir el tipo para los elementos de navegación
interface NavLink {
  path: string;
  label: string;
  icon: JSX.Element;
  element: JSX.Element;
}

// 5️⃣ `DashboardParameters` tipado
const DashboardParameters: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Parámetros</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-4">
          <SettingsVisitTypes />
          <GroupsUtilidadTable />
        </div>
      </main>
      <ParameterModals />
    </div>
  );
};
// 2️⃣ Tipar el array `navLinks`
const navLinks: NavLink[] = [
  {
    path: "/dashboard/parameters",
    label: "Generales",
    icon: <Settings className="w-5 h-5" />,
    element: <DashboardParameters />,
  },
  {
    path: "/dashboard/parameters-comision",
    label: "Comisiones",
    icon: <DollarSign className="w-5 h-5" />,
    element: <CommissionsConfigPage />,
  },
  {
    path: "/dashboard/comision-by-user",
    label: "Comisión Usuario",
    icon: <Users className="w-5 h-5" />,
    element: <ComisionByUserPage />,
  },
  {
    path: "/dashboard/typeProyect",
    label: "Tipo Proyecto",
    icon: <Layers className="w-5 h-5" />,
    element: <TipoPoryectoPage />,
  },
  {
    path: "/dashboard/marcaProyect",
    label: "Marca Proyecto",
    icon: <Tag className="w-5 h-5" />,
    element: <MarcaPoryectoPage />,
  },
  {
    path: "/dashboard/presupuesto",
    label: "Presupuesto",
    icon: <ClipboardList className="w-5 h-5" />,
    element: <PresupuestoPage />,
  },
];

// 3️⃣ Función para mostrar el componente correspondiente basado en la ruta activa
const SettingsNav: React.FC = () => {
  const location = useLocation(); // Obtener la ruta actual
  const [activeLink, setActiveLink] = useState<NavLink | null>(null);

  // 4️⃣ Usamos useEffect para actualizar el activeLink cuando cambie la ubicación
  useEffect(() => {
    const active = navLinks.find((item) => item.path === location.pathname);
    setActiveLink(active || null); // Si no se encuentra, setea null
  }, [location.pathname]); // Dependemos de la ruta activa

  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="w-full bg-white shadow-md">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-2">
          {navLinks.map((item) => (
            <button
              key={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                location.pathname == item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveLink(item)} // Actualiza el activeLink al hacer clic
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Aquí renderizamos el componente correspondiente */}
      <div className="mt-4">
        {activeLink ? activeLink.element : <div>No hay contenido disponible</div>}
      </div>
    </div>
  );
};


// 6️⃣ `SettingsVisitTypes`
const SettingsVisitTypes: React.FC = () => {
  const [setModalStatus] = useShallowGeneralStore((state) => [
    state.setModalStatus,
  ]);

  const createParameter = () => {
    setModalStatus({
      id: "createParameter",
    });
  };

  return (
    <Card x-chunk="dashboard-04-chunk-3">
      <CardHeader>
        <CardTitle>Parametros</CardTitle>
        <CardDescription>
          Aquí puedes agregar o editar los parámetros <br />
          <br />
          <Button onClick={createParameter}>Agregar</Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ParametersGrid />
      </CardContent>
      <CardFooter className="border-t px-6 py-4"></CardFooter>
    </Card>
  );
};

// 7️⃣ `ParametersPage` ahora solo muestra el `SettingsNav`
export const ParametersPage: React.FC = () => {
  return (
    <>
      <SettingsNav />
    </>
  );
};


