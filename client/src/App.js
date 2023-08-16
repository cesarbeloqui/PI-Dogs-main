import { Route, Routes, useLocation } from "react-router-dom";
import { Detail, Form, Home, LandingPage } from "./views";
import NavBar from "./components/NavBar/NavBar";
import style from "./App.module.css";

function App() {
  const location = useLocation();

  return (
    <div className={style.app}>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:idDog" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
