import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login/Login";
import "./master.scss";
import ClientsList from "./Pages/ClientsList/ClientsList";
import Form from "./Pages/Form/Form";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function Navigation() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setrole(localStorage.getItem("role"));
    } else {
      setrole(null);
      navigate("/");
    }
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  const [role, setrole] = useState(null);

  const [Links, setLinks] = useState({
    LoggedIn: [
      <Route path="/clientlist" element={<ClientsList />} strict exact />,
      <Route path="/form/:name" element={<Form />} strict exact />,
    ],
  });

  return (
    <Routes>
      <Route path="/" element={<Login />} strict exact />,
      <Route path="*" element={<PageNotFound />} strict exact />,
      {role && Links[role].map((item) => item)}
    </Routes>
  );
}

export default Navigation;
