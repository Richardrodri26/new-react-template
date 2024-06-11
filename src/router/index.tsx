import { MainLayout } from "@/components/Layouts";
import { ClientsPage, HomePage, LoginPage, ParametersPage, UsersPage, VisitsPage } from "@/pages";
import { VisitDetailPage } from "@/pages/Visits/Detalle";
import { createBrowserRouter } from "react-router-dom";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,

  },
  {
    path: "/dashboard",
    element: <MainLayout />,
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
        path: "visit/:id", // Ruta para el detalle de la visita con su ID
        element: <VisitDetailPage />,
      },
    ]
  }
])