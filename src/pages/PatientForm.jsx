import { useEffect, useState } from "react";
import { ArrowLeft, CalendarPlus, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, getErrorMessage } from "../api/client";
import { Field, Loading, Notice, PageHeading } from "../components/Ui";

const blank={name:"",age:"",gender:"",dateOfVisit:new Date().toISOString().slice(0,10),diagnosis:"",treatment:"",notes:""};
export default function PatientForm({edit=false}) {
  const {id}=useParams();const navigate=useNavigate();
  const [form,setForm]=useState(blank),[loading,setLoading]=useState(edit),[saving,setSaving]=useState(false),[error,setError]=useState("");
  useEffect(()=>{if(!edit)return;let alive=true;api.get(`/patients/${id}`).then(({data})=>{if(!alive)return;const p=data.data;setForm({name:p.name||"",age:String(p.age??""),gender:p.gender||"",dateOfVisit:p.dateOfVisits?.[0]?new Date(p.dateOfVisits[0]).toISOString().slice(0,10):"",diagnosis:p.diagnosis||"",treatment:p.treatment||"",notes:p.notes||""});}).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));return()=>{alive=false;};},[edit,id]);
  function update(e){setForm(f=>({...f,[e.target.name]:e.target.value}));}
  async function submit(e){e.preventDefault();setSaving(true);setError("");try{const payload={...form,age:Number(form.age),dateOfVisits:form.dateOfVisit?[form.dateOfVisit]:[]};delete payload.dateOfVisit;if(edit){await api.patch(`/patients/${id}`,payload);navigate(`/patients/${id}`,{replace:true});}else{const {data}=await api.post("/patients",payload);navigate(`/patients/${data.data._id}`,{replace:true});}}catch(e){setError(getErrorMessage(e));}finally{setSaving(false);}}
  if(loading)return <Loading label="Loading patient details..."/>;
  return <>
    <Link to={edit?`/patients/${id}`:"/patients"} className="back-link"><ArrowLeft size={16}/> {edit?"Back to patient profile":"Back to patients"}</Link>
    <PageHeading eyebrow={edit?"UPDATE PATIENT RECORD":"NEW PATIENT RECORD"} title={edit?"Edit patient details":"Register a patient"} description={edit?"Make changes to the patient's information below.":"Add the patient's basic information and visit details."}/>
    {error&&<Notice>{error}</Notice>}
    <form className="panel form-panel" onSubmit={submit}>
      <div className="form-section-title"><div className="form-section-icon"><ClipboardIcon/></div><div><h3>Personal information</h3><p>Enter the patient's identifying details.</p></div></div>
      <div className="form-grid">
        <Field label="Full name" required><input className="form-input" name="name" value={form.name} onChange={update} placeholder="Enter patient's full name" minLength="3" maxLength="100" required/></Field>
        <Field label="Age" required><input className="form-input" type="number" name="age" value={form.age} onChange={update} placeholder="Enter age" min="0" max="120" required/></Field>
        <Field label="Gender" required><select className="form-input" name="gender" value={form.gender} onChange={update} required><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option></select></Field>
        <Field label="Date of visit" required><input className="form-input" type="date" name="dateOfVisit" value={form.dateOfVisit} onChange={update} required/></Field>
      </div>
      <div className="form-divider"/>
      <div className="form-section-title"><div className="form-section-icon teal"><CalendarPlus/></div><div><h3>Visit information</h3><p>Record the diagnosis and treatment plan.</p></div></div>
      <div className="form-grid">
        <Field label="Diagnosis" required><input className="form-input" name="diagnosis" value={form.diagnosis} onChange={update} placeholder="Enter diagnosis" minLength="3" required/></Field>
        <Field label="Treatment" required><input className="form-input" name="treatment" value={form.treatment} onChange={update} placeholder="Enter treatment" minLength="3" required/></Field>
        <div className="full-field"><Field label="Additional notes"><textarea className="form-input textarea" name="notes" value={form.notes} onChange={update} placeholder="Add any other relevant patient information..." rows="4"/></Field></div>
      </div>
      <div className="form-actions"><Link to={edit?`/patients/${id}`:"/patients"} className="button secondary">Cancel</Link><button className="button primary" disabled={saving}><Save size={17}/>{saving?(edit?"Saving changes...":"Registering..."):(edit?"Save changes":"Register patient")}</button></div>
    </form>
  </>;
}
function ClipboardIcon(){return <span className="clipboard-symbol">✚</span>;}
