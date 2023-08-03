import { Route, Routes, useLocation } from "react-router-dom";
import { Detail, Form, Home, LandingPage } from "./views";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
