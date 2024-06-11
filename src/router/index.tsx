import { AppGuardLayout, MainLayout } from "@/components/Layouts";
import { ClientsPage, HomePage, LoginPage, ParametersPage, UsersPage, VisitsPage } from "@/pages";
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

    ]
  }
])