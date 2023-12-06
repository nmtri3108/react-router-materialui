import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/nav.component";
import Index from "./components/index.component";
import { Container } from "@mui/material";

function App() {
  const location = useLocation();
  return (
    <>
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
    </>
  );
}

export default App;
