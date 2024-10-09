import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainContext from "./contexts/MainContext.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.tsx";
import FormGenerator from "./components/FormGenerator.tsx";
import ShowForm from "./components/ShowForm.tsx";
import AllForms from "./components/AllForms.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/add-form",
        element: <FormGenerator />,
      },
      {
        path: "/show-form/:id",
        element: <ShowForm />,
      },
      {
        path: "/all-forms",
        element: <AllForms />,
      },
      {
        path: "/",
        element: <Navigate to="/all-forms" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainContext>
      <RouterProvider router={router} />
    </MainContext>
  </StrictMode>
);
