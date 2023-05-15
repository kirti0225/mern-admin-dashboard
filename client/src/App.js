import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import { LoginContext } from "./components/ContextProvider/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import AutoComplete from "./components/auto/AutoComplete";
import Imagebar from "./components/imageUploader/Imagebar";
import Slider from './components/Slider/Slider';
import Accordionview  from "./pages/AccordionView/Accordionview";

function App() {

  const cityNames = [
		"India",
		"Amsterdam",
		"Berlin",
		"London",
		"New York",
		"Paris",
		"Rome",
		"San Francisco",
		"Tokyo",
		"Washington DC",
		"Zurich",
		"Copenhagen",
		"Helsinki",
		"Madrid",
		"Reykjavik",
		"Stockholm",
		"Vancouver",
		"Vienna",
		"Zagreb",
		"Budapest",
		"Dublin",
		"Hamburg",
		"Krakow",
		"Lisbon",
		"Ljubljana",
	];

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
            <Route path="/users" element={<Home />} />
            <Route path="/image" element={<Imagebar />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/accordion" element={<Accordionview />} />
            <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />
        <Route path="/auto" element={<AutoComplete options={cityNames} />} />
	
          </Routes>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
