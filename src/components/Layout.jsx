import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Activity, Bell, ChevronDown, ClipboardList, LayoutDashboard, LogOut, Menu, Plus, Search, Settings, Users, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const pageNames = {
  "/": "Overview", "/patients": "Patient directory", "/patients/new": "Register patient",
  "/staff": "Staff management"
};

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = location.pathname.startsWith("/patients/") && location.pathname !== "/patients/new"
    ? "Patient profile" : (pageNames[location.pathname] || "CarePulse");

  const links = [
    { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/patients", label: "Patients", icon: ClipboardList },
    { to: "/patients/new", label: "Register patient", icon: Plus },
    { to: "/staff", label: "Staff", icon: Users }
  ];

  return <div className="app-shell">
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Activity size={22}/></div><div><strong>CarePulse</strong><small>PRIMARY HEALTHCARE</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X/></button></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav">
        {links.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><Icon size={18}/><span>{label}</span></NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><Activity size={17}/></div><strong>Care starts here.</strong><p>Keep every patient record clear, safe and accessible.</p></div>
        <button className="nav-link logout-link" onClick={logout}><LogOut size={18}/><span>Sign out</span></button>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu/></button><div><div className="breadcrumb">Workspace <span>/</span> {title}</div><h1>{title}</h1></div></div>
        <div className="topbar-actions"><button className="icon-button" aria-label="Search" onClick={() => location.pathname !== "/patients" && (window.location.href="/patients")}><Search size={19}/></button><button className="icon-button" aria-label="Notifications"><Bell size={19}/><i/></button><div className="user-menu"><div className="avatar">{user?.name?.slice(0,1)?.toUpperCase() || "U"}</div><div className="user-meta"><strong>{user?.name || "Staff member"}</strong><span>{user?.role || "staff"}</span></div><ChevronDown size={15}/></div></div>
      </header>
      <div className="page-content"><Outlet/></div>
      <footer className="footer">© {new Date().getFullYear()} CarePulse <span>Patient care, thoughtfully managed.</span></footer>
    </main>
  </div>;
}
