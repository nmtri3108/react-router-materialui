import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Create from "../components/create.component";
import Update from "../components/update.component";
import Login from "../components/login.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "create", element: <Create /> },
      { path: "update/:id", element: <Update /> },
    ],
  },
]);
