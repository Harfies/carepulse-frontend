import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Download, Edit3, FileText, HeartPulse, Trash2, UserRound } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, getErrorMessage } from "../api/client";
import { Loading, Notice, PageHeading } from "../components/Ui";
import { useAuth } from "../context/AuthContext";

export default function PatientDetail(){
  const {id}=useParams();const navigate=useNavigate();const {user}=useAuth();
  const [patient,setPatient]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  useEffect(()=>{let alive=true;api.get(`/patients/${id}`).then(({data})=>{if(alive)setPatient(data.data);}).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));return()=>{alive=false;};},[id]);
  async function remove(){if(!window.confirm(`Delete the patient record for ${patient.name}? This cannot be undone.`))return;setBusy(true);try{await api.delete(`/patients/${id}`);navigate("/patients",{replace:true});}catch(e){setError(getErrorMessage(e));setBusy(false);}}
  async function exportPdf(){setBusy(true);try{const response=await api.get(`/patients/${id}/export`,{responseType:"blob"});const url=URL.createObjectURL(new Blob([response.data],{type:"application/pdf"}));const a=document.createElement("a");a.href=url;a.download=`patient-${id}.pdf`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}catch(e){setError(getErrorMessage(e));}finally{setBusy(false);}}
  if(loading)return <Loading label="Loading patient profile..."/>;
  if(!patient)return <><Notice>{error||"Patient not found."}</Notice><Link to="/patients" className="back-link"><ArrowLeft size={16}/> Back to patients</Link></>;
  const dates=(patient.dateOfVisits||[]).map(d=>new Date(d).toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"}));
  return <>
    <Link to="/patients" className="back-link"><ArrowLeft size={16}/> Back to patient directory</Link>
    <PageHeading eyebrow="PATIENT PROFILE" title={patient.name} description={`Patient record · ${patient._id}`} action={<div className="heading-actions"><button className="button secondary" onClick={exportPdf} disabled={busy}><Download size={16}/> Export PDF</button><Link className="button primary" to={`/patients/${id}/edit`}><Edit3 size={16}/> Edit record</Link></div>}/>
    {error&&<Notice>{error}</Notice>}
    <div className="detail-grid">
      <section className="panel profile-card"><div className="profile-hero"><div className="profile-avatar">{patient.name?.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</div><div><h2>{patient.name}</h2><span className="profile-status"><i/> Patient record</span></div></div><div className="profile-facts"><div><span>Age</span><strong>{patient.age} years</strong></div><div><span>Gender</span><strong className="capitalize">{patient.gender}</strong></div><div><span>Patient ID</span><strong className="id-text">{patient._id}</strong></div><div><span>Registered</span><strong>{patient.createdAt?new Date(patient.createdAt).toLocaleDateString("en-NG"):"—"}</strong></div></div><div className="profile-actions"><button className="button danger-outline" onClick={remove} disabled={busy}><Trash2 size={16}/> Delete patient</button></div></section>
      <section className="panel detail-panel"><div className="panel-heading"><div><h3>Clinical information</h3><p>Recorded diagnosis and care details</p></div><div className="clinical-icon"><HeartPulse/></div></div><div className="clinical-block"><span>Diagnosis</span><p>{patient.diagnosis||"No diagnosis recorded."}</p></div><div className="clinical-block"><span>Treatment</span><p>{patient.treatment||"No treatment recorded."}</p></div><div className="clinical-block"><span>Additional notes</span><p className="notes-text">{patient.notes||"No additional notes."}</p></div></section>
      <section className="panel visits-panel"><div className="panel-heading"><div><h3>Visit history</h3><p>Dates recorded for this patient</p></div><CalendarDays size={20} className="muted-icon"/></div>{dates.length?<div className="visit-timeline">{dates.map((d,i)=><div className="visit-item" key={`${d}-${i}`}><div className="visit-dot"/><div><strong>{d}</strong><span>{i===0?"Recorded visit":"Additional visit"}</span></div></div>)}</div>:<p className="muted-copy">No visit dates have been recorded.</p>}</section>
      <section className="panel visits-panel"><div className="panel-heading"><div><h3>Attachments</h3><p>Files associated with this record</p></div><FileText size={20} className="muted-icon"/></div>{patient.attachments?.length?<div className="attachment-list">{patient.attachments.map((f,i)=><div key={i}><FileText size={16}/><span>{String(f).split("/").pop()}</span></div>)}</div>:<p className="muted-copy">No attachments on this record.</p>}</section>
    </div>
  </>;
}
