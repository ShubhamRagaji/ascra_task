import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
// import { encryptStorage } from "./Helper/Storage";
// import "./master.scss";
// import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Pages/Login/Login";
import "./master.scss";
import ClientsList from "./Pages/ClientsList/ClientsList";
import Form from "./Pages/Form/Form";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setrole(localStorage.getItem("role"));
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [location]);

  const [role, setrole] = useState(localStorage.getItem("role"));

  const [Links, setLinks] = useState({
    LoggedIn: [
      <Route path="/clientlist" element={<ClientsList />} strict exact />,
      <Route path="/form/:name" element={<Form />} strict exact />,
      <Route path="*" element={<PageNotFound />} strict exact />,
    ],
  });

  return (
    <Routes>
      <Route path="/" element={<Login />} strict exact />,
      {role && Links[role].map((item) => item)}
    </Routes>
  );
}

export default Navigation;
