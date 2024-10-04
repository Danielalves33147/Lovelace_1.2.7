import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Tool from "../pages/Tool/Tool.jsx";
import Practice from "../pages/Practice/Practice.jsx";
import CreateActivity from "../pages/CreateActivity/CreateActivity.jsx";
import AccessActivity from "../pages/AccessActivity/AccessActivity.jsx";
import Activity from "../pages/Activity/Activity.jsx";
import AccessCode from "../pages/AccessCode/AccessCode.jsx";
import Teste from "../pages/Testes/Teste.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/Lovelace" element={<Teste/>} /> PAGINA DE TESTES
          {/* <Route path="/Lovelace/" element={<Login/>} /> */}
          {/* <Route path="/Lovelace/register" element={<Register/>} /> O REGISTRO ESTA JUNTO DO LOGIN AGORA */}
          <Route path="/Lovelace/tool" element={<Tool/>} />
          <Route path="/Lovelace/practice" element={<Practice/>} />
          <Route path='/Lovelace/createactivity' element={<CreateActivity/>}/>
          <Route path='/Lovelace/access/:id' element={<AccessActivity/>}/>
          <Route path='/Lovelace/activity/:id' element={<Activity/>}/>
          <Route path='/Lovelace/accesscode' element={<AccessCode/>}/>
        </Routes>
    </BrowserRouter>
  );
}
