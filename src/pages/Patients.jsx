import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Eye, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { api, getErrorMessage } from "../api/client";
import { EmptyState, Loading, Notice, PageHeading } from "../components/Ui";

function initials(name="") { return name.split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase(); }
export default function Patients() {
  const [items,setItems]=useState([]),[page,setPage]=useState(1),[pages,setPages]=useState(1),[total,setTotal]=useState(0);
  const [search,setSearch]=useState(""),[query,setQuery]=useState(""),[gender,setGender]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const load=useCallback(async()=>{
    setLoading(true);setError("");
    try { const {data}=await api.get("/patients",{params:{page,limit:10,...(query?{name:query}:{}),...(gender?{gender}:{})}});setItems(data.data||[]);setPages(Math.max(data.pages||1,1));setTotal(data.total??0); }
    catch(e){setError(getErrorMessage(e));}
    finally{setLoading(false);}
  },[page,query,gender]);
  useEffect(()=>{load();},[load]);
  function submitSearch(e){e.preventDefault();setPage(1);setQuery(search.trim());}
  function changeGender(v){setGender(v);setPage(1);}
  return <>
    <PageHeading eyebrow="PATIENT RECORDS" title="Patient directory" description="Search, review and manage the patient records in your health centre." action={<Link to="/patients/new" className="button primary"><Plus size={17}/> Register patient</Link>}/>
    {error&&<Notice>{error}</Notice>}
    <section className="panel directory-panel">
      <div className="directory-toolbar"><form className="search-box" onSubmit={submitSearch}><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by patient name..."/><button type="submit">Search</button></form><label className="filter-select"><Filter size={16}/><select value={gender} onChange={e=>changeGender(e.target.value)}><option value="">All genders</option><option value="male">Male</option><option value="female">Female</option></select><ChevronDown size={14}/></label><div className="result-count">{total} {total===1?"record":"records"}</div></div>
      {loading?<Loading label="Loading patient directory..."/>:items.length===0?<EmptyState title="No patients found" description={query||gender?"Try changing your search or filter.":"There are no patient records yet. Start by registering a patient."} action={<Link className="button primary" to="/patients/new"><Plus size={16}/> Register patient</Link>}/>:<>
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Patient</th><th>Patient ID</th><th>Age / Gender</th><th>Diagnosis</th><th>Last updated</th><th></th></tr></thead><tbody>{items.map(p=><tr key={p._id}><td><div className="table-person"><div className="patient-avatar">{initials(p.name)}</div><div><strong>{p.name}</strong><span>{p.email||"Patient record"}</span></div></div></td><td><span className="id-text">{p._id?.slice(-8).toUpperCase()}</span></td><td><span className="age-gender">{p.age} yrs · {p.gender}</span></td><td><span className="diagnosis-chip">{p.diagnosis||"Not recorded"}</span></td><td>{p.updatedAt?new Date(p.updatedAt).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"}):"—"}</td><td><Link className="view-link" to={`/patients/${p._id}`}>View <ArrowRight size={14}/></Link></td></tr>)}</tbody></table></div>
        <div className="pagination"><span>Showing <b>{(page-1)*10+1}–{Math.min(page*10,total)}</b> of <b>{total}</b> patients</span><div><button disabled={page<=1} onClick={()=>setPage(p=>p-1)}><ArrowLeft size={15}/> Previous</button><span className="page-number">{page} / {pages}</span><button disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Next <ArrowRight size={15}/></button></div></div>
      </>}
    </section>
  </>;
}
