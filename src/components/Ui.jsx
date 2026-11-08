import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";

export function Loading({ label = "Loading..." }) {
  return <div className="loading-state"><LoaderCircle className="spin" size={22}/><span>{label}</span></div>;
}
export function EmptyState({ title, description, action }) {
  return <div className="empty-state"><div className="empty-icon"><AlertCircle size={22}/></div><h3>{title}</h3><p>{description}</p>{action}</div>;
}
export function Notice({ type="error", children }) {
  return <div className={`notice ${type}`} role="alert">{type === "success" ? <CheckCircle2 size={17}/> : <AlertCircle size={17}/>}<span>{children}</span></div>;
}
export function Field({ label, required, hint, children }) {
  return <label className="field"><span className="field-label">{label}{required && <b> *</b>}</span>{children}{hint && <small>{hint}</small>}</label>;
}
export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}
