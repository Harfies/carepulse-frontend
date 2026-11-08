import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientForm from "./pages/PatientForm";
import PatientDetail from "./pages/PatientDetail";
import Staff from "./pages/Staff";

export default function App(){
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route element={<ProtectedRoute/>}>
      <Route element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/patients/new" element={<PatientForm/>}/>
        <Route path="/patients/:id" element={<PatientDetail/>}/>
        <Route path="/patients/:id/edit" element={<PatientForm edit/>}/>
        <Route path="/staff" element={<Staff/>}/>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>;
}
