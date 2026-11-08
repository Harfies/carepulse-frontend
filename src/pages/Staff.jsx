import { useEffect, useState } from "react";
import { Mail, ShieldCheck, Stethoscope, UserPlus, Users } from "lucide-react";
import { api, getErrorMessage } from "../api/client";
import { Loading, Notice, PageHeading } from "../components/Ui";
import { useAuth } from "../context/AuthContext";

export default function Staff(){
  const {user}=useAuth();const [staff,setStaff]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
  async function load(){setLoading(true);try{const {data}=await api.get("/auth/users");setStaff(data.data||[]);}catch(e){setError(getErrorMessage(e));}finally{setLoading(false);}}
  useEffect(()=>{load();},[]);
  async function remove(person){if(!window.confirm(`Remove ${person.name}'s staff account?`))return;try{await api.delete(`/auth/users/${person._id}`);setStaff(s=>s.filter(x=>x._id!==person._id));}catch(e){setError(getErrorMessage(e));}}
  return <>
    <PageHeading eyebrow="YOUR CARE TEAM" title="Staff management" description="View the doctors and nurses who have access to CarePulse."/>
    {error&&<Notice>{error}</Notice>}
    <div className="stats-grid staff-stats"><div className="stat-card"><div className="stat-top"><span>Total staff</span><div className="stat-icon blue"><Users/></div></div><strong>{loading?"—":staff.length}</strong><small>Registered care team members</small></div><div className="stat-card"><div className="stat-top"><span>Doctors</span><div className="stat-icon violet"><Stethoscope/></div></div><strong>{loading?"—":staff.filter(s=>s.role==="doctor").length}</strong><small>Doctor accounts</small></div><div className="stat-card"><div className="stat-top"><span>Nurses</span><div className="stat-icon mint"><UserPlus/></div></div><strong>{loading?"—":staff.filter(s=>s.role==="nurse").length}</strong><small>Nurse accounts</small></div></div>
    <section className="panel directory-panel"><div className="panel-heading staff-heading"><div><h3>Care team directory</h3><p>Staff account information and access roles</p></div><span className="permission-note"><ShieldCheck size={15}/> {user?.role==="doctor"?"Doctor access":"Read only"}</span></div>
      {loading?<Loading label="Loading staff directory..."/>:!staff.length?<div className="table-empty">No staff accounts were returned.</div>:<div className="staff-grid">{staff.map(s=><div className="staff-card" key={s._id}><div className="staff-card-top"><div className={`staff-avatar ${s.role}`}>{s.name?.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</div><span className={`role-badge ${s.role}`}>{s.role}</span></div><h3>{s.name}</h3><div className="staff-email"><Mail size={14}/>{s.email}</div><div className="staff-card-bottom"><span>Joined {s.createdAt?new Date(s.createdAt).toLocaleDateString("en-NG",{month:"short",year:"numeric"}):"—"}</span>{user?.role==="doctor"&&s._id!==user.id&&<button className="small-danger" onClick={()=>remove(s)}>Remove</button>}</div></div>)}</div>}
    </section>
    {user?.role==="doctor"&&<div className="security-note"><ShieldCheck size={18}/><div><strong>Staff account permissions</strong><p>Doctors can update and remove staff accounts through the API. Staff registration is intentionally not exposed in this first frontend version because the backend currently allows public registration with a doctor role; that endpoint should be secured before adding an invite/create-staff screen.</p></div></div>}
  </>;
}
