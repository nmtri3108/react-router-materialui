import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Create from "../components/create.component";
import Update from "../components/update.component";
import Login from "../components/login.component";
import Register from "../components/register.component";
import RequireAuth from "./requireAuth";
import VerifyEmail from "../components/verifyEmail.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
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
