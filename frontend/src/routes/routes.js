import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Create from "../components/create.component";
import Update from "../components/update.component";
import Login from "../components/login.component";
import Register from "../components/register.component";
import RequireAuth from "./requireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "create", element: <Create /> },
          { path: "update/:id", element: <Update /> },
        ],
      },
    ],
  },
]);
