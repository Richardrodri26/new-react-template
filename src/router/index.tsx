import { MainLayout } from "@/components/Layouts";
import { HomePage, LoginPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [
      {
        path: "home",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element:<HomePage />
          }
        ]
      }
    ]
  }
])