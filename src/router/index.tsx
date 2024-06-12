import { AppGuardLayout, MainLayout } from "@/components/Layouts";
import { ClientsPage, HomePage, LoginPage, ParametersPage, UsersPage, VisitsPage } from "@/pages";
import { VisitDetailPage } from "@/pages/Visits/Detalle";
import CalendarPage from "@/pages/calendar";
import { TypeVistPage } from "@/pages/typeVisit";
import { createBrowserRouter } from "react-router-dom";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,

  },
  {
    path: "/dashboard",
    element: <AppGuardLayout />,
    children: [
      // {
      //   path: "",
      //   element: <HomePage />
      // }
      {
        path: "",
        element: <VisitsPage />
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
        path: "parameters",
        element: <ParametersPage />
      },
      {
        path: "clients",
        element: <ClientsPage />
      },
      {
        path: "typeVisit",
        element: <TypeVistPage/>
      },
      {
        path: "calendar",
        element: <CalendarPage/>
      },
      {
        path: "visit/:id", // Ruta para el detalle de la visita con su ID
        element: <VisitDetailPage />,
      },
    ]
  }
])