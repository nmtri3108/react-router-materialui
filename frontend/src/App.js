import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/nav.component";
import Index from "./components/index.component";
import { Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const location = useLocation();
  return (
    <>
      <GoogleOAuthProvider clientId="986737512699-g62pvnhir58gvr1fhpsp65120pkuqtet.apps.googleusercontent.com">
        <Navigation />
        {location.pathname === "/" ? (
          <Container sx={{ mt: 4, height: "100%" }}>
            <Index />
          </Container>
        ) : (
          <Container sx={{ mt: 4, height: "100%" }}>
            <Outlet />
          </Container>
        )}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
