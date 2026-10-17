import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate
} from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, GraduationCap, Wallet, ChartNoAxesCombined,
  Megaphone, ShieldCheck, Settings, Search, Bell, ChevronDown, Menu, X,
  ArrowUpRight, ArrowRight, Plus, Download, Filter, Eye, Check, Clock3,
  AlertCircle, TrendingUp, UserRoundPlus, ClipboardCheck, CreditCard,
  FileChartColumn, Save, LockKeyhole, Database, Upload, Pencil, Trash2,
  RefreshCw, CheckCircle2, XCircle, MoreHorizontal, SlidersHorizontal,
  CircleDollarSign, GraduationCap as Cap, Building2, CalendarDays
} from "lucide-react";
import "./styles.css";

const STORE = "gpoc-scholarship-portal-v1";
const seed = {
  students: [
    {id:"GPOC-2026-100",name:"Anur Mayiik",program:"Computer Science",university:"Zetech University",year:"Year 1",status:"Active",email:"anur@example.com",phone:"+254 700 000 001"},
    {id:"GPOC-2026-101",name:"Achieng Lonyang",program:"Mathematics",university:"University of Juba",year:"Year 1",status:"Active",email:"achieng@example.com",phone:"+211 920 000 101"},
    {id:"GPOC-2026-102",name:"John Deng",program:"Business Administration",university:"University of Juba",year:"Year 2",status:"Active",email:"john@example.com",phone:"+211 920 000 102"},
    {id:"GPOC-2026-103",name:"Mary Nyang",program:"Computer Science",university:"Zetech University",year:"Year 1",status:"Active",email:"mary@example.com",phone:"+254 700 000 103"},
    {id:"GPOC-2026-104",name:"Peter Wani",program:"Electrical Engineering",university:"Makerere University",year:"Year 2",status:"Active",email:"peter@example.com",phone:"+256 700 000 104"},
    {id:"GPOC-2026-105",name:"Ruth Akello",program:"Economics",university:"University of Juba",year:"Year 3",status:"Active",email:"ruth@example.com",phone:"+211 920 000 105"}
  ],
  applications: [
    {id:"APP-2026-264",name:"Achieng Lonyang",program:"Computer Science",submitted:"10 Sep 2026",status:"Under Review",email:"achieng@example.com"},
    {id:"APP-2026-263",name:"John Deng",program:"Business Administration",submitted:"9 Sep 2026",status:"Approved",email:"john@example.com"},
    {id:"APP-2026-262",name:"Mary Nyang",program:"Computer Science",submitted:"8 Sep 2026",status:"Pending",email:"mary@example.com"},
    {id:"APP-2026-261",name:"Peter Wani",program:"Electrical Engineering",submitted:"7 Sep 2026",status:"Approved",email:"peter@example.com"},
    {id:"APP-2026-260",name:"Ruth Akello",program:"Mathematics",submitted:"6 Sep 2026",status:"Under Review",email:"ruth@example.com"},
    {id:"APP-2026-259",name:"Samuel Ochan",program:"Economics",submitted:"5 Sep 2026",status:"Pending",email:"samuel@example.com"},
    {id:"APP-2026-258",name:"Grace Arop",program:"Mathematics",submitted:"4 Sep 2026",status:"Approved",email:"grace@example.com"}
  ],
  academics: [
    {id:"AC-1001",studentId:"GPOC-2026-100",name:"Anur Mayiik",program:"Computer Science",semester:"Semester 1",gpa:"3.80",status:"Approved"},
    {id:"AC-1002",studentId:"GPOC-2026-101",name:"Achieng Lonyang",program:"Mathematics",semester:"Semester 1",gpa:"3.40",status:"Approved"},
    {id:"AC-1003",studentId:"GPOC-2026-102",name:"John Deng",program:"Business Administration",semester:"Semester 1",gpa:"3.10",status:"Pending"},
    {id:"AC-1004",studentId:"GPOC-2026-103",name:"Mary Nyang",program:"Computer Science",semester:"Semester 1",gpa:"3.70",status:"Approved"},
    {id:"AC-1005",studentId:"GPOC-2026-104",name:"Peter Wani",program:"Electrical Engineering",semester:"Semester 1",gpa:"3.20",status:"Approved"}
  ],
  payments: [
    {id:"GPOC-R-1001",studentId:"GPOC-2026-100",name:"Anur Mayiik",university:"Zetech University",amount:245000,date:"08 Sep 2026",status:"Paid",type:"Tuition"},
    {id:"GPOC-R-1002",studentId:"GPOC-2026-101",name:"Achieng Lonyang",university:"University of Juba",amount:180000,date:"08 Sep 2026",status:"Paid",type:"Tuition"},
    {id:"GPOC-R-1003",studentId:"GPOC-2026-102",name:"John Deng",university:"University of Juba",amount:210000,date:"07 Sep 2026",status:"Paid",type:"Tuition"},
    {id:"GPOC-R-1004",studentId:"GPOC-2026-103",name:"Mary Nyang",university:"Zetech University",amount:260000,date:"07 Sep 2026",status:"Paid",type:"Tuition"},
    {id:"GPOC-R-1005",studentId:"GPOC-2026-104",name:"Peter Wani",university:"Makerere University",amount:195000,date:"06 Sep 2026",status:"Pending",type:"Tuition"}
  ],
  announcements: [
    {id:"AN-1",title:"Zetech University Admission Update",body:"Please ensure students complete their admission process before the published deadline.",date:"10 Sep 2026",status:"Published"},
    {id:"AN-2",title:"2026/27 Scholarship Cohort",body:"Congratulations to students selected for the new academic year. Further onboarding details will be shared by the scholarship team.",date:"5 Sep 2026",status:"Published"},
    {id:"AN-3",title:"Results Submission Deadline",body:"Universities are requested to submit outstanding academic results by 20 September.",date:"2 Sep 2026",status:"Draft"}
  ],
  users: [
    {id:"USR-1",name:"Portal Administrator",email:"admin@gpoc.gov.ss",role:"Super Admin",lastLogin:"Today, 10:21 AM",status:"Active"},
    {id:"USR-2",name:"Scholarship Officer",email:"scholarships@gpoc.gov.ss",role:"Scholarship Officer",lastLogin:"Today, 09:45 AM",status:"Active"},
    {id:"USR-3",name:"Finance Officer",email:"finance@gpoc.gov.ss",role:"Finance",lastLogin:"Yesterday",status:"Active"},
    {id:"USR-4",name:"Academic Officer",email:"academic@gpoc.gov.ss",role:"Academic Officer",lastLogin:"8 Sep 2026",status:"Inactive"}
  ],
  settings: {
    organization:"Greater Pioneer Operating Company",
    portal:"GPOC Scholarship Portal",
    email:"scholarships@gpoc.gov.ss",
    twoFactor:true,loginAlerts:true,appAlerts:true,paymentAlerts:true,academicAlerts:true,weeklySummary:false
  }
};

function readStore() {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    const payments=Array.isArray(parsed.payments)?parsed.payments.filter(payment=>payment?.type==="Tuition"):structuredClone(seed.payments);
    const settings={...seed.settings,...parsed.settings};
    if(settings.organization==="Government of South Sudan Petroleum Operating Company")settings.organization=seed.settings.organization;
    return {...structuredClone(seed), ...parsed, payments, settings};
  } catch { return structuredClone(seed); }
}
function usePortal() {
  const [data,setData] = useState(readStore);
  useEffect(() => { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch {} }, [data]);
  const update = (key, updater) => setData(prev => ({...prev,[key]:typeof updater==="function"?updater(prev[key]):updater}));
  const reset = () => { const clean=structuredClone(seed); setData(clean); localStorage.setItem(STORE,JSON.stringify(clean)); };
  return {data,update,reset};
}
const money = n => "$" + Number(n||0).toLocaleString("en-US");
const initials = name => (name||"").trim().split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase();
const uid = prefix => `${prefix}-${Date.now().toString(36).toUpperCase()}`;
const tuitionPayments = payments => payments.filter(payment=>payment.type==="Tuition");
const programs = ["Computer Science","Business Administration","Mathematics","Electrical Engineering","Economics"];
const universities = ["Zetech University","University of Juba","Makerere University","Kenyatta University","University of Nairobi"];
const downloadCSV = (rows,filename) => {
  if (!rows?.length) { alert("There are no records to export."); return; }
  const headers=Object.keys(rows[0]);
  const csv=[headers.join(","),...rows.map(row=>headers.map(h=>`"${String(row[h]??"").replaceAll('"','""')}"`).join(","))].join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
};

function App() {
  const portal=usePortal();
  const [toast,setToast]=useState("");
  const notify=message=>{setToast(message);window.clearTimeout(window.__gpocToast);window.__gpocToast=window.setTimeout(()=>setToast(""),2600);};
  return <BrowserRouter><Shell data={portal.data} notify={notify}><Routes>
    <Route path="/" element={<Dashboard data={portal.data} notify={notify}/>}/>
    <Route path="/students" element={<Students data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/applications" element={<Applications data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/academic-records" element={<Academics data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/fees" element={<Fees data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/reports" element={<Reports data={portal.data} notify={notify}/>}/>
    <Route path="/announcements" element={<Announcements data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/users-roles" element={<UsersRoles data={portal.data} update={portal.update} notify={notify}/>}/>
    <Route path="/settings" element={<SettingsPage data={portal.data} update={portal.update} reset={portal.reset} notify={notify}/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Shell>{toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}</BrowserRouter>;
}

const navItems=[
  ["Dashboard","/",LayoutDashboard],["Students","/students",Users],["Applications","/applications",FileText],
  ["Academic Records","/academic-records",GraduationCap],["Tuition Fees & Payments","/fees",Wallet],
  ["Reports","/reports",ChartNoAxesCombined],["Announcements","/announcements",Megaphone],
  ["Users & Roles","/users-roles",ShieldCheck],["Settings","/settings",Settings]
];
function Shell({children,data,notify}) {
  const [mobile,setMobile]=useState(false),[globalSearch,setGlobalSearch]=useState("");
  const nav=useNavigate(),location=useLocation();
  useEffect(()=>setMobile(false),[location.pathname]);
  const submitSearch=e=>{e.preventDefault();nav(`/students?search=${encodeURIComponent(globalSearch)}`);};
  return <div className="app-shell">
    {mobile&&<button className="mobile-scrim" aria-label="Close menu" onClick={()=>setMobile(false)}/>}
    <aside className={`sidebar ${mobile?"sidebar-open":""}`}>
      <div className="brand"><div className="brand-logo"><img src="/gpoc-logo.png" alt="Greater Pioneer Operating Company (GPOC)"/></div><small>SCHOLARSHIP PORTAL</small><button className="mobile-close" onClick={()=>setMobile(false)}><X size={18}/></button></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{navItems.map(([label,path,Icon])=><NavLink key={path} to={path} end={path==="/"}><Icon size={18}/><span>{label}</span>{label==="Applications"&&<em>{data.applications.filter(a=>["Pending","Under Review"].includes(a.status)).length}</em>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-emblem">✦</div><p>Investing in people.<br/>Building South Sudan.</p><small>GPOC · ADMIN CONSOLE</small></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setMobile(true)}><Menu/></button>
        <form className="global-search" onSubmit={submitSearch}><Search size={17}/><input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)} placeholder="Search students by name or ID…"/>{globalSearch&&<button type="button" onClick={()=>setGlobalSearch("")}><X size={14}/></button>}</form>
        <div className="topbar-right"><button className="bell-btn" title="View announcements" onClick={()=>nav("/announcements")}><Bell size={19}/><i/></button><div className="profile-chip"><div className="profile-avatar">AD</div><div><b>Administrator</b><small>Portal admin</small></div><ChevronDown size={15}/></div></div>
      </header>
      <div className="page-content">{children}<footer className="footer"><span>GPOC Scholarship Portal <span className="muted">· Frontend prototype</span></span><span><i className="online-dot"/> Local data active</span></footer></div>
    </main>
  </div>;
}

function PageHeader({title,subtitle,actions}){return <div className="page-header"><div><div className="eyebrow">GPOC / ADMINISTRATION</div><h1>{title}</h1><p>{subtitle}</p></div><div className="header-actions">{actions}</div></div>}
function Button({children,icon:Icon,kind="primary",onClick,type="button",disabled=false}){return <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${kind}`}>{Icon&&<Icon size={16} strokeWidth={1.8}/>}<span>{children}</span></button>}
function Card({children,className=""}){return <section className={`card ${className}`}>{children}</section>}
function SectionTitle({icon:Icon,title,action,onAction}){return <div className="section-title"><h2>{Icon&&<Icon size={18}/>} {title}</h2>{action&&<button className="inline-link" onClick={onAction}>{action}<ArrowRight size={14}/></button>}</div>}
function Avatar({name}){return <div className="avatar">{initials(name)}</div>}
function Status({children}){const cls=String(children).toLowerCase().replaceAll(" ","-");return <span className={`status status-${cls}`}>{children}</span>}
function SearchBar({value,onChange,placeholder="Search records…"}){return <div className="table-search"><Search size={16}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value&&<button onClick={()=>onChange("")}><X size={14}/></button>}</div>}
function Table({headers,rows,empty="No matching records"}){return <div className="table-scroll">{rows.length?<table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table>:<div className="empty"><Database size={25}/><b>{empty}</b><span>Try adjusting your search or add a new record.</span></div>}</div>}
function Person({name,sub}){return <div className="person-cell"><Avatar name={name}/><div><b>{name}</b>{sub&&<small>{sub}</small>}</div></div>}
function Stat({icon:Icon,label,value,note,accent="green"}){return <Card className="stat-card"><div className={`stat-icon ${accent}`}><Icon size={20} strokeWidth={1.8}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div><ArrowUpRight className="stat-arrow" size={16}/></Card>}
function Chart({data}){const max=Math.max(1,...data.map(x=>x.value));const points=data.map((x,i)=>`${i*(600/(Math.max(1,data.length-1)))},${132-(x.value/max)*112}`).join(" ");return <div className="chart-wrap"><svg viewBox="0 0 600 145" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#13835e" stopOpacity=".18"/><stop offset="100%" stopColor="#13835e" stopOpacity="0"/></linearGradient></defs><polygon points={`0,145 ${points} 600,145`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#087a53" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>{data.map((d,i)=><circle key={d.month} cx={i*(600/(Math.max(1,data.length-1)))} cy={132-(d.value/max)*112} r="3.5" fill="#fff" stroke="#087a53" strokeWidth="2"/>)}</svg><div className="chart-months">{data.map(d=><span key={d.month}>{d.month}</span>)}</div></div>}
function Donut({students}){const list=programs.map((p,i)=>({name:p,count:students.filter(s=>s.program===p).length,color:["#087a53","#d5a326","#5cae8b","#8bb7b0","#a8b7b2"][i]}));const total=students.length||1;let start=0;const stops=list.map(x=>{const a=start;start+=x.count/total*100;return `${x.color} ${a}% ${start}%`}).join(",");return <div className="donut-layout"><div className="donut" style={{background:`conic-gradient(${stops||"#dce7e2 0 100%"})`}}><div><b>{students.length}</b><small>Students</small></div></div><div className="donut-legend">{list.map(x=><div key={x.name}><i style={{background:x.color}}/><span>{x.name}</span><b>{Math.round(x.count/total*100)}%</b></div>)}</div></div>}
function Dashboard({data,notify}) {
 const nav=useNavigate();
 const pending=data.applications.filter(a=>["Pending","Under Review"].includes(a.status)).length;
 const total=tuitionPayments(data.payments).filter(p=>p.status==="Paid").reduce((s,p)=>s+Number(p.amount),0);
 const recent=data.applications.slice(0,4);
 const chart=[{month:"Apr",value:12},{month:"May",value:18},{month:"Jun",value:15},{month:"Jul",value:28},{month:"Aug",value:25},{month:"Sep",value:36}];
 return <>
  <div className="welcome-banner"><div><span className="welcome-kicker">SCHOLARSHIP MANAGEMENT</span><h1>Good morning, Admin<span>.</span></h1><p>Here’s what’s happening across your scholarship programme.</p><div className="welcome-meta"><span><CalendarDays size={14}/> Academic year 2026/27</span><span><i className="online-dot"/> Prototype data saved locally</span></div></div><div className="welcome-art"><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-center"><GraduationCap size={45}/></div><span className="art-spark">✦</span></div></div>
  <div className="stats-grid"><Stat icon={Users} label="Enrolled students" value={data.students.length} note="Student records" /><Stat icon={FileText} label="Open applications" value={pending} note="Require review" accent="gold"/><Stat icon={Wallet} label="Tuition fees paid" value={money(total)} note="Paid tuition transactions" accent="blue"/><Stat icon={GraduationCap} label="Results on file" value={data.academics.length} note="Academic records" accent="lavender"/></div>
  <div className="dashboard-grid"><Card><SectionTitle icon={ChartNoAxesCombined} title="Scholarship activity" action="View reports" onAction={()=>nav("/reports")}/><div className="chart-subtitle">Application activity <span><i className="legend-dot"/> Submitted applications</span></div><Chart data={chart}/><div className="chart-foot"><span>Illustrative trend for demo presentation</span><b>2026</b></div></Card>
  <Card><SectionTitle icon={FileText} title="Recent applications" action="View all" onAction={()=>nav("/applications")}/><div className="compact-list">{recent.map(a=><div className="compact-row" key={a.id}><Person name={a.name} sub={a.id}/><div className="compact-meta"><Status>{a.status}</Status><small>{a.submitted}</small></div></div>)}</div></Card></div>
  <div className="dashboard-grid lower-grid"><Card><SectionTitle icon={Users} title="Recently added students" action="View students" onAction={()=>nav("/students")}/><div className="compact-list">{data.students.slice(-4).reverse().map(s=><div className="compact-row" key={s.id}><Person name={s.name} sub={s.program}/><Status>{s.status}</Status></div>)}</div></Card>
  <Card><SectionTitle icon={ChartNoAxesCombined} title="Programme distribution"/><Donut students={data.students}/></Card>
  <Card><SectionTitle icon={ArrowUpRight} title="Quick actions"/><div className="quick-actions"><button onClick={()=>nav("/students?new=1")}><span className="quick-icon"><UserRoundPlus size={17}/></span><span><b>Add a student</b><small>Create a student record</small></span><ArrowRight size={15}/></button><button onClick={()=>nav("/applications")}><span className="quick-icon amber"><ClipboardCheck size={17}/></span><span><b>Review applications</b><small>Process new submissions</small></span><ArrowRight size={15}/></button><button onClick={()=>nav("/fees?new=1")}><span className="quick-icon blue"><CreditCard size={17}/></span><span><b>Record a payment</b><small>Add a fee transaction</small></span><ArrowRight size={15}/></button><button onClick={()=>nav("/announcements")}><span className="quick-icon violet"><Megaphone size={17}/></span><span><b>Post an announcement</b><small>Share an update</small></span><ArrowRight size={15}/></button></div></Card></div>
 </>;
}

function Modal({title,onClose,children,width="normal"}){useEffect(()=>{const fn=e=>e.key==="Escape"&&onClose();window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[onClose]);return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className={`modal modal-${width}`}><div className="modal-head"><div><span className="eyebrow">GPOC PORTAL</span><h2>{title}</h2></div><button className="icon-close" onClick={onClose}><X size={19}/></button></div>{children}</div></div>}
function Field({label,value,onChange,required=false,type="text",placeholder="",options,labels}){return <label className="field"><span>{label}{required&&<i> *</i>}</span>{options?<select required={required} value={value} onChange={e=>onChange(e.target.value)}>{options.map((x,i)=><option key={x} value={x}>{labels?.[i]||x}</option>)}</select>:<input required={required} type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>}</label>}
function TextField({label,value,onChange,required=false}){return <label className="field"><span>{label}{required&&<i> *</i>}</span><textarea required={required} value={value} onChange={e=>onChange(e.target.value)} rows="4"/></label>}
function FormActions({onCancel,label="Save changes"}){return <div className="form-actions"><Button kind="ghost" onClick={onCancel}>Cancel</Button><Button icon={Save} type="submit">{label}</Button></div>}
function StudentModal({item,onClose,onSave}){const [f,setF]=useState(item||{name:"",program:programs[0],university:universities[0],year:"Year 1",status:"Active",email:"",phone:""});const put=(k,v)=>setF(p=>({...p,[k]:v}));return <Modal title={item?"Edit student":"Add student"} onClose={onClose}><form className="modal-form form-grid" onSubmit={e=>{e.preventDefault();onSave(f)}}><Field label="Full name" value={f.name} onChange={v=>put("name",v)} required placeholder="Enter student name"/><Field label="Email address" value={f.email} onChange={v=>put("email",v)} type="email" placeholder="student@example.com"/><Field label="Phone number" value={f.phone} onChange={v=>put("phone",v)} placeholder="+254…"/><Field label="Programme" value={f.program} onChange={v=>put("program",v)} options={programs}/><Field label="University" value={f.university} onChange={v=>put("university",v)} options={universities}/><Field label="Study year" value={f.year} onChange={v=>put("year",v)} options={["Year 1","Year 2","Year 3","Year 4","Year 5"]}/><Field label="Status" value={f.status} onChange={v=>put("status",v)} options={["Active","Inactive","Completed"]}/><FormActions onCancel={onClose} label={item?"Update student":"Create student"}/></form></Modal>}
function Students({data,update,notify}){const loc=useLocation();const params=new URLSearchParams(loc.search);const [q,setQ]=useState(params.get("search")||"");const [modal,setModal]=useState(params.get("new")==="1");const [editing,setEditing]=useState(null);const [status,setStatus]=useState("All");useEffect(()=>{const p=new URLSearchParams(loc.search);if(p.has("search"))setQ(p.get("search")||"");if(p.get("new")==="1")setModal(true)},[loc.search]);const list=data.students.filter(s=>(status==="All"||s.status===status)&&[s.name,s.id,s.program,s.university,s.email].join(" ").toLowerCase().includes(q.toLowerCase()));const save=f=>{if(editing){update("students",a=>a.map(s=>s.id===editing.id?{...s,...f}:s));notify("Student record updated");}else{update("students",a=>[{...f,id:`GPOC-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`},...a]);notify("Student added successfully");}setModal(false);setEditing(null)};const remove=s=>{if(confirm(`Delete ${s.name}'s record? This cannot be undone.`)){update("students",a=>a.filter(x=>x.id!==s.id));notify("Student record deleted")}};return <><PageHeader title="Students" subtitle="Manage scholarship recipients and their student records." actions={<><Button kind="secondary" icon={Download} onClick={()=>downloadCSV(list,"gpoc-students.csv")}>Export CSV</Button><Button icon={Plus} onClick={()=>{setEditing(null);setModal(true)}}>Add student</Button></>}/><div className="summary-strip"><div><span>Total students</span><b>{data.students.length}</b></div><div><span>Active</span><b>{data.students.filter(s=>s.status==="Active").length}</b></div><div><span>Completed</span><b>{data.students.filter(s=>s.status==="Completed").length}</b></div></div><Card><div className="table-toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search name, ID, programme…"/><div className="toolbar-right"><SlidersHorizontal size={15}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option><option>Completed</option></select><span className="result-count">{list.length} records</span></div></div><Table headers={["Student","Student ID","Programme","University","Year","Status",""]} rows={list.map(s=>[<Person name={s.name} sub={s.email||"No email added"}/>,<span className="mono">{s.id}</span>,s.program,s.university,s.year,<Status>{s.status}</Status>,<div className="row-actions"><button title="Edit student" onClick={()=>{setEditing(s);setModal(true)}}><Pencil size={15}/></button><button title="Delete student" onClick={()=>remove(s)}><Trash2 size={15}/></button></div>])}/></Card>{modal&&<StudentModal item={editing} onClose={()=>{setModal(false);setEditing(null)}} onSave={save}/>}</>}
function Applications({data,update,notify}){const [q,setQ]=useState(""),[filter,setFilter]=useState("All"),[selected,setSelected]=useState(null);const statuses=["All","Pending","Under Review","Approved","Rejected"];const list=data.applications.filter(a=>(filter==="All"||a.status===filter)&&[a.name,a.id,a.program,a.email].join(" ").toLowerCase().includes(q.toLowerCase()));const change=(id,next)=>{update("applications",a=>a.map(x=>x.id===id?{...x,status:next}:x));setSelected(s=>s?{...s,status:next}:null);notify(`Application marked ${next.toLowerCase()}`)};return <><PageHeader title="Applications" subtitle="Review scholarship applications and manage selection decisions." actions={<Button kind="secondary" icon={Download} onClick={()=>downloadCSV(list,"gpoc-applications.csv")}>Export CSV</Button>}/><div className="filter-tabs">{statuses.map(s=><button className={filter===s?"selected":""} key={s} onClick={()=>setFilter(s)}>{s}<b>{s==="All"?data.applications.length:data.applications.filter(a=>a.status===s).length}</b></button>)}</div><Card><div className="table-toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search applicant or application ID…"/><span className="result-count">{list.length} applications</span></div><Table headers={["Applicant","Application ID","Programme","Submitted","Status",""]} rows={list.map(a=>[<Person name={a.name} sub={a.email}/>,<span className="mono">{a.id}</span>,a.program,a.submitted,<Status>{a.status}</Status>,<button className="row-action-main" onClick={()=>setSelected(a)}><Eye size={15}/> Review</button>])}/></Card>{selected&&<Modal title="Review application" onClose={()=>setSelected(null)}><div className="review-body"><Person name={selected.name} sub={selected.id}/><div className="detail-list"><div><span>Programme applied for</span><b>{selected.program}</b></div><div><span>Application date</span><b>{selected.submitted}</b></div><div><span>Email address</span><b>{selected.email||"Not provided"}</b></div><div><span>Current status</span><Status>{selected.status}</Status></div></div><p className="helper-note">This is demo applicant data. No external application documents are attached in this prototype.</p><div className="form-actions"><Button kind="danger" icon={XCircle} onClick={()=>change(selected.id,"Rejected")}>Reject</Button><Button kind="secondary" onClick={()=>change(selected.id,"Under Review")}>Mark for review</Button><Button icon={Check} onClick={()=>change(selected.id,"Approved")}>Approve</Button></div></div></Modal>}</>}
function Academics({data,update,notify}){const [q,setQ]=useState(""),[modal,setModal]=useState(false),[editing,setEditing]=useState(null);const empty={studentId:data.students[0]?.id||"",semester:"Semester 1",gpa:"",status:"Pending"};const [f,setF]=useState(empty);const list=data.academics.filter(a=>[a.name,a.studentId,a.program].join(" ").toLowerCase().includes(q.toLowerCase()));const open=a=>{setEditing(a||null);setF(a?{...a}:{...empty,studentId:data.students[0]?.id||""});setModal(true)};const save=e=>{e.preventDefault();const s=data.students.find(x=>x.id===f.studentId);if(!s){notify("Add a student before creating a result");return}const record={...f,name:s.name,program:s.program,gpa:Number(f.gpa).toFixed(2)};if(editing)update("academics",a=>a.map(x=>x.id===editing.id?record:x));else update("academics",a=>[{...record,id:uid("AC")},...a]);setModal(false);notify("Academic record saved")};return <><PageHeader title="Academic records" subtitle="Review academic performance and maintain results for sponsored students." actions={<Button icon={Upload} onClick={()=>open(null)}>Add result</Button>}/><div className="stats-grid three"><Stat icon={GraduationCap} label="Results on file" value={data.academics.length} note="All semesters"/><Stat icon={Clock3} label="Awaiting review" value={data.academics.filter(a=>a.status==="Pending").length} note="Pending approval" accent="gold"/><Stat icon={TrendingUp} label="Average GPA" value={(data.academics.reduce((n,a)=>n+Number(a.gpa||0),0)/(data.academics.length||1)).toFixed(2)} note="Across records" accent="blue"/></div><Card><div className="table-toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search student or student ID…"/><Button kind="secondary" icon={Download} onClick={()=>downloadCSV(list,"gpoc-academic-records.csv")}>Export CSV</Button></div><Table headers={["Student","Student ID","Programme","Semester","GPA","Status",""]} rows={list.map(a=>[<Person name={a.name}/>,<span className="mono">{a.studentId}</span>,a.program,a.semester,a.gpa,<Status>{a.status}</Status>,<div className="row-actions"><button title="Edit result" onClick={()=>open(a)}><Pencil size={15}/></button><button title="Delete result" onClick={()=>{if(confirm("Delete this academic record?")){update("academics",rows=>rows.filter(x=>x.id!==a.id));notify("Academic record deleted")}}}><Trash2 size={15}/></button></div>])}/></Card>{modal&&<Modal title={editing?"Edit academic result":"Add academic result"} onClose={()=>setModal(false)}><form className="modal-form form-grid" onSubmit={save}><Field label="Student" value={f.studentId} onChange={v=>setF(p=>({...p,studentId:v}))} options={data.students.map(s=>s.id)} labels={data.students.map(s=>`${s.name} · ${s.id}`)}/><Field label="Semester" value={f.semester} onChange={v=>setF(p=>({...p,semester:v}))} options={["Semester 1","Semester 2","Summer"]}/><Field label="GPA (0–4)" type="number" value={f.gpa} onChange={v=>setF(p=>({...p,gpa:v}))} required/><Field label="Result status" value={f.status} onChange={v=>setF(p=>({...p,status:v}))} options={["Pending","Approved","Needs Correction"]}/><FormActions onCancel={()=>setModal(false)} label={editing?"Update result":"Save result"}/></form></Modal>}</>}
function Fees({data,update,notify}) {
  const [q,setQ]=useState("");
  const [modal,setModal]=useState(false);
  const [editing,setEditing]=useState(null);
  const payments=tuitionPayments(data.payments);
  const empty={studentId:data.students[0]?.id||"",amount:"",date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),status:"Paid"};
  const [f,setF]=useState(empty);
  const list=payments.filter(p=>[p.name,p.id,p.university].join(" ").toLowerCase().includes(q.toLowerCase()));
  const paid=payments.filter(p=>p.status==="Paid").reduce((n,p)=>n+Number(p.amount),0);
  const open=p=>{setEditing(p||null);setF(p?{...p,amount:String(p.amount)}:{...empty,studentId:data.students[0]?.id||""});setModal(true)};
  const save=e=>{
    e.preventDefault();
    const s=data.students.find(x=>x.id===f.studentId);
    if(!s){notify("Add a student before recording a tuition payment");return}
    const row={...f,type:"Tuition",name:s.name,university:s.university,amount:Number(f.amount)};
    if(editing)update("payments",a=>a.map(p=>p.id===editing.id?row:p));
    else update("payments",a=>[{...row,id:uid("GPOC-R")},...a]);
    setModal(false);
    notify("Tuition payment record saved");
  };
  return <>
    <PageHeader title="Tuition fees & payments" subtitle="Record tuition fee payments and review transaction history." actions={<><Button kind="secondary" icon={Download} onClick={()=>downloadCSV(list,"gpoc-tuition-payments.csv")}>Export CSV</Button><Button icon={Plus} onClick={()=>open(null)}>Record tuition payment</Button></>}/>
    <div className="stats-grid three">
      <Stat icon={CircleDollarSign} label="Tuition fees paid" value={money(paid)} note="Recorded paid tuition fees"/>
      <Stat icon={CheckCircle2} label="Paid transactions" value={payments.filter(p=>p.status==="Paid").length} note="Successful tuition payments" accent="blue"/>
      <Stat icon={Clock3} label="Pending transactions" value={payments.filter(p=>p.status==="Pending").length} note="Awaiting confirmation" accent="gold"/>
    </div>
    <Card>
      <div className="table-toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search name, receipt, university…"/><span className="result-count">{list.length} tuition payments</span></div>
      <Table headers={["Student","University","Fee type","Amount","Receipt ID","Date","Status",""]} rows={list.map(p=>[<Person name={p.name} sub={p.studentId}/>,p.university,"Tuition",money(p.amount),<span className="mono">{p.id}</span>,p.date,<Status>{p.status}</Status>,<div className="row-actions"><button title="Edit tuition payment" onClick={()=>open(p)}><Pencil size={15}/></button><button title="Delete tuition payment" onClick={()=>{if(confirm("Delete this tuition payment record?")){update("payments",a=>a.filter(x=>x.id!==p.id));notify("Tuition payment record deleted")}}}><Trash2 size={15}/></button></div>])}/>
    </Card>
    {modal&&<Modal title={editing?"Edit tuition payment":"Record tuition payment"} onClose={()=>setModal(false)}><form className="modal-form form-grid" onSubmit={save}>
      <Field label="Student" value={f.studentId} onChange={v=>setF(p=>({...p,studentId:v}))} options={data.students.map(s=>s.id)} labels={data.students.map(s=>`${s.name} · ${s.id}`)}/>
      <Field label="Amount ($)" type="number" value={f.amount} onChange={v=>setF(p=>({...p,amount:v}))} required/>
      <Field label="Date" value={f.date} onChange={v=>setF(p=>({...p,date:v}))} required/>
      <Field label="Payment status" value={f.status} onChange={v=>setF(p=>({...p,status:v}))} options={["Paid","Pending","Cancelled"]}/>
      <FormActions onCancel={()=>setModal(false)} label={editing?"Update tuition payment":"Save tuition payment"}/>
    </form></Modal>}
  </>;
}
function Reports({data,notify}) {
  const payments=tuitionPayments(data.payments);
  const paid=payments.filter(p=>p.status==="Paid").reduce((n,p)=>n+Number(p.amount),0);
  const reports=[
    ["Student register","Current scholarship recipient list",()=>downloadCSV(data.students,"gpoc-student-register.csv")],
    ["Application register","All scholarship application statuses",()=>downloadCSV(data.applications,"gpoc-application-register.csv")],
    ["Academic performance","Results and GPA by student",()=>downloadCSV(data.academics,"gpoc-academic-performance.csv")],
    ["Tuition fee ledger","Recorded tuition fee transactions",()=>downloadCSV(payments,"gpoc-tuition-fee-ledger.csv")],
    ["Announcement register","Portal communications and publication status",()=>downloadCSV(data.announcements,"gpoc-announcements.csv")]
  ];
  return <>
    <PageHeader title="Reports" subtitle="Export current prototype data for review and client demonstration." actions={<Button icon={Download} onClick={()=>downloadCSV([{metric:"Students",value:data.students.length},{metric:"Applications",value:data.applications.length},{metric:"Results",value:data.academics.length},{metric:"Tuition fees paid ($)",value:paid}],"gpoc-summary-report.csv")}>Export summary</Button>}/>
    <div className="stats-grid three"><Stat icon={Users} label="Student records" value={data.students.length} note="Current local records"/><Stat icon={FileText} label="Applications" value={data.applications.length} note="All statuses" accent="gold"/><Stat icon={Wallet} label="Tuition fees paid" value={money(paid)} note="Paid tuition transactions" accent="blue"/></div>
    <div className="report-list">{reports.map(([title,desc,run])=><Card className="report-item" key={title}><div className="report-icon"><FileChartColumn size={20}/></div><div className="report-info"><b>{title}</b><p>{desc}</p></div><span className="report-type">CSV · Excel compatible</span><Button kind="secondary" icon={Download} onClick={()=>{run();notify("Report export started")}}>Export</Button></Card>)}</div>
    <Card><SectionTitle icon={ChartNoAxesCombined} title="Programme distribution"/><Donut students={data.students}/><p className="helper-note">Reports are generated from data saved in this browser. Demo trends and sample data should be verified before any official use.</p></Card>
  </>;
}
function Announcements({data,update,notify}){const [modal,setModal]=useState(false),[editing,setEditing]=useState(null);const blank={title:"",body:"",date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),status:"Published"};const [f,setF]=useState(blank);const open=a=>{setEditing(a||null);setF(a?{...a}:{...blank});setModal(true)};const save=e=>{e.preventDefault();if(editing)update("announcements",rows=>rows.map(x=>x.id===editing.id?{...editing,...f}:x));else update("announcements",rows=>[{...f,id:uid("AN")},...rows]);setModal(false);notify(editing?"Announcement updated":"Announcement created")};const remove=a=>{if(confirm(`Delete "${a.title}"?`)){update("announcements",rows=>rows.filter(x=>x.id!==a.id));notify("Announcement deleted")}};const toggle=a=>{const status=a.status==="Published"?"Draft":"Published";update("announcements",rows=>rows.map(x=>x.id===a.id?{...x,status}:x));notify(`Announcement set to ${status.toLowerCase()}`)};return <><PageHeader title="Announcements" subtitle="Publish updates for scholarship students and university partners." actions={<Button icon={Plus} onClick={()=>open(null)}>New announcement</Button>}/><div className="announcement-summary"><div><Megaphone size={19}/><span><b>{data.announcements.length}</b> total announcements</span></div><div><CheckCircle2 size={19}/><span><b>{data.announcements.filter(a=>a.status==="Published").length}</b> published</span></div><div><FileText size={19}/><span><b>{data.announcements.filter(a=>a.status==="Draft").length}</b> drafts</span></div></div><div className="announcement-list">{data.announcements.map(a=><Card className="announcement-card" key={a.id}><div className="announcement-mark"><Megaphone size={20}/></div><div className="announcement-content"><div className="announcement-meta"><Status>{a.status}</Status><span>{a.date}</span></div><h2>{a.title}</h2><p>{a.body}</p><div className="announcement-controls"><button onClick={()=>open(a)}><Pencil size={14}/> Edit</button><button onClick={()=>toggle(a)}>{a.status==="Published"?<><X size={14}/> Unpublish</>:<><Check size={14}/> Publish</>}</button><button className="delete-link" onClick={()=>remove(a)}><Trash2 size={14}/> Delete</button></div></div></Card>)}</div>{modal&&<Modal title={editing?"Edit announcement":"Create announcement"} onClose={()=>setModal(false)}><form className="modal-form" onSubmit={save}><Field label="Announcement title" value={f.title} onChange={v=>setF(p=>({...p,title:v}))} required placeholder="Write a clear headline"/><TextField label="Message" value={f.body} onChange={v=>setF(p=>({...p,body:v}))} required/><div className="form-grid"><Field label="Date" value={f.date} onChange={v=>setF(p=>({...p,date:v}))} required/><Field label="Publication status" value={f.status} onChange={v=>setF(p=>({...p,status:v}))} options={["Draft","Published"]}/></div><FormActions onCancel={()=>setModal(false)} label={editing?"Save changes":"Create announcement"}/></form></Modal>}</>}
function UsersRoles({data,update,notify}){const [modal,setModal]=useState(false),[editing,setEditing]=useState(null),[q,setQ]=useState("");const blank={name:"",email:"",role:"Scholarship Officer",status:"Active",lastLogin:"Never"};const [f,setF]=useState(blank);const open=u=>{setEditing(u||null);setF(u?{...u}:{...blank});setModal(true)};const save=e=>{e.preventDefault();if(editing)update("users",rows=>rows.map(u=>u.id===editing.id?{...u,...f}:u));else update("users",rows=>[{...f,id:uid("USR")},...rows]);setModal(false);notify(editing?"User updated":"User added")};const list=data.users.filter(u=>[u.name,u.email,u.role].join(" ").toLowerCase().includes(q.toLowerCase()));return <><PageHeader title="Users & roles" subtitle="Manage portal team records and their assigned roles." actions={<Button icon={Plus} onClick={()=>open(null)}>Add user</Button>}/><Card><div className="table-toolbar"><SearchBar value={q} onChange={setQ} placeholder="Search user, email, role…"/><span className="result-count">{list.length} users</span></div><Table headers={["User","Role","Last login","Status","Actions"]} rows={list.map(u=>[<Person name={u.name} sub={u.email}/>,<span className="role-chip">{u.role}</span>,u.lastLogin,<button className="status-button" onClick={()=>{const status=u.status==="Active"?"Inactive":"Active";update("users",rows=>rows.map(x=>x.id===u.id?{...x,status}:x));notify(`${u.name} set ${status.toLowerCase()}`)}}><Status>{u.status}</Status></button>,<div className="row-actions"><button title="Edit user" onClick={()=>open(u)}><Pencil size={15}/></button></div>])}/></Card><div className="role-cards">{[["Super Admin","Full access to all prototype pages and settings"],["Scholarship Officer","Student records and application review"],["Finance","Fee and payment records"],["Academic Officer","Academic results and performance"]].map(([role,desc])=><Card key={role} className="role-card"><div className="role-icon"><ShieldCheck size={18}/></div><b>{role}</b><p>{desc}</p><span>{data.users.filter(u=>u.role===role).length} assigned</span></Card>)}</div>{modal&&<Modal title={editing?"Edit user":"Add user"} onClose={()=>setModal(false)}><form className="modal-form form-grid" onSubmit={save}><Field label="Full name" value={f.name} onChange={v=>setF(p=>({...p,name:v}))} required/><Field label="Email address" value={f.email} onChange={v=>setF(p=>({...p,email:v}))} type="email" required/><Field label="Assigned role" value={f.role} onChange={v=>setF(p=>({...p,role:v}))} options={["Super Admin","Scholarship Officer","Finance","Academic Officer"]}/><Field label="Account status" value={f.status} onChange={v=>setF(p=>({...p,status:v}))} options={["Active","Inactive"]}/><FormActions onCancel={()=>setModal(false)} label={editing?"Update user":"Create user"}/></form></Modal>}</>}
function SettingsPage({data,update,reset,notify}){const [f,setF]=useState({...data.settings});useEffect(()=>setF({...data.settings}),[data.settings]);const save=e=>{e.preventDefault();update("settings",f);notify("Settings saved to this browser")};const toggle=(key)=>setF(p=>({...p,[key]:!p[key]}));return <><PageHeader title="Settings" subtitle="Configure portal details, notifications, and local prototype data."/><div className="settings-grid"><Card><SectionTitle icon={Building2} title="Portal information"/><form onSubmit={save}><Field label="Organisation name" value={f.organization} onChange={v=>setF(p=>({...p,organization:v}))} required/><Field label="Portal name" value={f.portal} onChange={v=>setF(p=>({...p,portal:v}))} required/><Field label="Support email" value={f.email} onChange={v=>setF(p=>({...p,email:v}))} type="email" required/><div className="settings-actions"><Button icon={Save} type="submit">Save settings</Button></div></form></Card><Card><SectionTitle icon={Bell} title="Notifications"/><Toggle label="New application alerts" value={f.appAlerts} onChange={()=>toggle("appAlerts")}/><Toggle label="Tuition payment alerts" value={f.paymentAlerts} onChange={()=>toggle("paymentAlerts")}/><Toggle label="Academic result alerts" value={f.academicAlerts} onChange={()=>toggle("academicAlerts")}/><Toggle label="Weekly summary" value={f.weeklySummary} onChange={()=>toggle("weeklySummary")}/><Button kind="secondary" onClick={save}>Save preferences</Button></Card><Card><SectionTitle icon={LockKeyhole} title="Security preferences"/><Toggle label="Two-factor authentication (demo setting)" value={f.twoFactor} onChange={()=>toggle("twoFactor")}/><Toggle label="Login activity alerts" value={f.loginAlerts} onChange={()=>toggle("loginAlerts")}/><p className="helper-note">These switches demonstrate the intended settings interface only. No authentication or email alerts are activated in this frontend prototype.</p><Button kind="secondary" onClick={save}>Save preferences</Button></Card><Card><SectionTitle icon={Database} title="Prototype data"/><div className="data-info"><div><span>Storage method</span><b>Browser localStorage</b></div><div><span>Saved records</span><b>{data.students.length+data.applications.length+data.academics.length+data.payments.length+data.announcements.length+data.users.length} across all modules</b></div><div><span>Persistence</span><b>Refresh-safe on this browser</b></div></div><Button kind="danger" icon={RefreshCw} onClick={()=>{if(confirm("Reset all portal data to the original sample dataset? All changes in this browser will be lost.")){reset();setF({...seed.settings});notify("Demo data reset")}}}>Reset demo data</Button></Card></div></>}
function Toggle({label,value,onChange}){return <div className="toggle-row"><span>{label}</span><button type="button" role="switch" aria-checked={value} className={`switch ${value?"switch-on":""}`} onClick={onChange}><i/></button></div>}
function NotFound(){const nav=useNavigate();return <div className="not-found"><h1>Page not found</h1><p>The page you’re looking for doesn’t exist.</p><Button onClick={()=>nav("/")}>Return to dashboard</Button></div>}

createRoot(document.getElementById("root")).render(<App/>);
