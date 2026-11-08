import { useEffect, useState } from "react";
import { Activity, ArrowRight, CalendarDays, ClipboardList, Plus, Users, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { api, getErrorMessage } from "../api/client";
import { Loading, Notice, PageHeading } from "../components/Ui";

function initials(name="") { return name.split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase(); }
function formatDate(date) { return date ? new Date(date).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"}) : "—"; }

export default function Dashboard() {
  const [patients,setPatients] = useState([]);
  const [total,setTotal] = useState(0);
  const [staffCount,setStaffCount] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  useEffect(()=>{
    let alive=true;
    Promise.all([api.get("/patients",{params:{page:1,limit:6}}),api.get("/auth/users")])
      .then(([p,s])=>{if(!alive)return;setPatients(p.data.data||[]);setTotal(p.data.total ?? p.data.count ?? 0);setStaffCount(s.data.count ?? s.data.data?.length ?? 0);})
      .catch(e=>{if(alive)setError(getErrorMessage(e));})
      .finally(()=>{if(alive)setLoading(false);});
    return ()=>{alive=false;};
  },[]);
  const today = new Date().toDateString();
  const addedToday = patients.filter(p=>new Date(p.createdAt).toDateString()===today).length;
  return <>
    <PageHeading eyebrow="YOUR HEALTH CENTRE AT A GLANCE" title="Good day 👋" description="Here’s what’s happening across your patient records today." action={<Link className="button primary" to="/patients/new"><Plus size={17}/> Register patient</Link>}/>
    {error && <Notice>{error}</Notice>}
    <div className="stats-grid">
      <div className="stat-card"><div className="stat-top"><span>Total patients</span><div className="stat-icon blue"><Users size={19}/></div></div><strong>{loading?"—":total}</strong><small>Patient records in the system</small></div>
      <div className="stat-card"><div className="stat-top"><span>Staff members</span><div className="stat-icon mint"><UserRound size={19}/></div></div><strong>{staffCount===null?"—":staffCount}</strong><small>Doctors and nurses</small></div>
      <div className="stat-card"><div className="stat-top"><span>Recently added</span><div className="stat-icon violet"><CalendarDays size={19}/></div></div><strong>{loading?"—":addedToday}</strong><small>From the latest 6 records</small></div>
      <div className="stat-card"><div className="stat-top"><span>System status</span><div className="stat-icon mint"><Activity size={19}/></div></div><strong className="status-word">Connected</strong><small><span className="online-dot"/> API responding successfully</small></div>
    </div>
    <div className="dashboard-grid">
      <section className="panel recent-panel">
        <div className="panel-heading"><div><h3>Recent patients</h3><p>Latest patient records added to your centre</p></div><Link className="text-link" to="/patients">View all <ArrowRight size={15}/></Link></div>
        {loading?<Loading label="Loading patient records..."/>:patients.length===0?<div className="table-empty">No patient records yet. Register your first patient to get started.</div>:<div className="recent-list">{patients.slice(0,5).map(p=><Link to={`/patients/${p._id}`} className="recent-row" key={p._id}><div className="patient-avatar">{initials(p.name)}</div><div className="recent-person"><strong>{p.name}</strong><span>{p.gender||"—"} · {p.age} years</span></div><div className="recent-diagnosis"><span>Diagnosis</span><strong>{p.diagnosis||"Not recorded"}</strong></div><div className="recent-date">{formatDate(p.createdAt)} <ArrowRight size={15}/></div></Link>)}</div>}
      </section>
      <aside className="panel quick-panel"><div className="panel-heading"><div><h3>Quick actions</h3><p>Common tasks</p></div></div><Link to="/patients/new" className="quick-action"><div className="quick-icon"><Plus/></div><span><b>Register a patient</b><small>Create a new patient record</small></span><ArrowRight size={16}/></Link><Link to="/patients" className="quick-action"><div className="quick-icon teal"><ClipboardList/></div><span><b>Find a patient</b><small>Search and view records</small></span><ArrowRight size={16}/></Link><Link to="/staff" className="quick-action"><div className="quick-icon purple"><Users/></div><span><b>View staff</b><small>Manage your care team</small></span><ArrowRight size={16}/></Link><div className="tip-card"><strong>A little reminder</strong><p>Keep patient details up to date after every visit so your team can make informed care decisions.</p></div></aside>
    </div>
  </>;
}
