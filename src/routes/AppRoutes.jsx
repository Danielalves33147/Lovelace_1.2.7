import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Tool from "../pages/Tool/Tool.jsx";
import Practice from "../pages/Practice/Practice.jsx";
import CreateActivity from "../pages/CreateActivity/CreateActivity.jsx";
import AccessActivity from "../pages/AccessActivity/AccessActivity.jsx";
import Activity from "../pages/Activity/Activity.jsx";
import AccessCode from "../pages/AccessCode/AccessCode.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/Lovelace_1.2.4" element={<Login/>} />
          <Route path="/Lovelace_1.2.4/register" element={<Register/>} />
          <Route path="/Lovelace_1.2.4/tool" element={<Tool/>} />
          <Route path="/Lovelace_1.2.4/practice" element={<Practice/>} />
          <Route path='/Lovelace_1.2.4/createactivity' element={<CreateActivity/>}/>
          <Route path='/Lovelace_1.2.4/access/:id' element={<AccessActivity/>}/>
          <Route path='/Lovelace_1.2.4/activity/:id' element={<Activity/>}/>
          <Route path='/Lovelace_1.2.4/accesscode' element={<AccessCode/>}/>
        </Routes>
    </BrowserRouter>
  );
}
