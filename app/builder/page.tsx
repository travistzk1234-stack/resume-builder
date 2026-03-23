'use client';

import { useState, useRef } from "react";

const STEPS = ["Personal info", "Experience", "Education & skills", "Preview & export"];
const TEMPLATES = [
  { id: "classic", label: "Classic", accent: "#1a1a1a" },
  { id: "modern", label: "Modern", accent: "#2563eb" },
  { id: "minimal", label: "Minimal", accent: "#6d28d9" },
];

const C = {
  bg: "#ffffff",
  bgSecondary: "#f7f7f5",
  bgTertiary: "#f0efeb",
  text: "#1a1a1a",
  textSecondary: "#666660",
  textTertiary: "#999990",
  border: "rgba(0,0,0,0.08)",
  borderMid: "rgba(0,0,0,0.15)",
  accent: "#1a1a1a",
  success: "#15803d",
  successBg: "#dcfce7",
  danger: "#b91c1c",
  dangerBg: "#fee2e2",
};

function Spinner({ light }: { light?: boolean }) {
  return <span style={{ display:"inline-block",width:13,height:13,border:`2px solid ${light?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.15)"}`,borderTopColor:light?"#fff":C.text,borderRadius:"50%",animation:"spin 0.7s linear infinite",verticalAlign:"middle",marginRight:6 }} />;
}

function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display:"flex",alignItems:"center",padding:"0 2rem",marginBottom:0 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
            <div style={{ width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,background:i<=current?C.text:C.bgSecondary,color:i<=current?"#fff":C.textTertiary,border:`1px solid ${i<=current?C.text:C.border}`,transition:"all 0.2s" }}>
              {i < current ? "✓" : i+1}
            </div>
            <span style={{ fontSize:13,fontWeight:500,color:i===current?C.text:C.textTertiary,whiteSpace:"nowrap" }}>{s}</span>
          </div>
          {i < STEPS.length-1 && <div style={{ flex:1,height:"1px",background:C.border,margin:"0 12px" }} />}
        </div>
      ))}
    </div>
  );
}

function Label({ children }: any) {
  return <label style={{ fontSize:12,fontWeight:600,color:C.textSecondary,letterSpacing:"0.03em",display:"block",marginBottom:5 }}>{children}</label>;
}

function Input({ id, value, onChange, placeholder, type="text", icon }: any) {
  return (
    <div style={{ position:"relative" }}>
      {icon && <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:C.textTertiary,pointerEvents:"none" }}>{icon}</span>}
      <input type={type} value={value} onChange={(e:any)=>onChange(id,e.target.value)} placeholder={placeholder}
        style={{ padding:icon?"10px 12px 10px 36px":"10px 14px",fontSize:14,border:`1px solid ${C.border}`,borderRadius:10,background:C.bg,color:C.text,outline:"none",width:"100%",boxSizing:"border-box" as any,transition:"border-color 0.15s, box-shadow 0.15s",fontFamily:"inherit" }}
        onFocus={e=>{ e.target.style.borderColor=C.borderMid; e.target.style.boxShadow="0 0 0 3px rgba(0,0,0,0.04)"; }}
        onBlur={e=>{ e.target.style.borderColor=C.border; e.target.style.boxShadow="none"; }} />
    </div>
  );
}

function TextArea({ label, id, value, onChange, placeholder, minH=100, onImprove, improving, hint }: any) {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <Label>{label}</Label>
          {hint && <p style={{ fontSize:11,color:C.textTertiary,margin:"-3px 0 5px" }}>{hint}</p>}
        </div>
        {onImprove && (
          <button onClick={onImprove} disabled={improving||!value.trim()}
            style={{ fontSize:11,padding:"5px 12px",borderRadius:7,cursor:improving||!value.trim()?"not-allowed":"pointer",background:improving?"rgba(0,0,0,0.04)":"none",border:`1px solid ${C.border}`,color:C.textSecondary,display:"inline-flex",alignItems:"center",gap:4,opacity:!value.trim()?0.4:1,fontFamily:"inherit",fontWeight:500,whiteSpace:"nowrap" as any }}>
            {improving?<><Spinner />Improving...</>:"✦ Improve phrasing"}
          </button>
        )}
      </div>
      <textarea value={value} onChange={(e:any)=>onChange(id,e.target.value)} placeholder={placeholder}
        style={{ padding:"12px 14px",fontSize:14,border:`1px solid ${C.border}`,borderRadius:10,background:C.bg,color:C.text,resize:"vertical" as any,outline:"none",width:"100%",boxSizing:"border-box" as any,minHeight:minH,lineHeight:1.7,fontFamily:"inherit",transition:"border-color 0.15s, box-shadow 0.15s" }}
        onFocus={e=>{ e.target.style.borderColor=C.borderMid; e.target.style.boxShadow="0 0 0 3px rgba(0,0,0,0.04)"; }}
        onBlur={e=>{ e.target.style.borderColor=C.border; e.target.style.boxShadow="none"; }} />
    </div>
  );
}

function SectionCard({ title, subtitle, children }: any) {
  return (
    <div style={{ background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",marginBottom:16 }}>
      <div style={{ padding:"18px 24px",borderBottom:`1px solid ${C.border}`,background:C.bgSecondary }}>
        <p style={{ margin:0,fontSize:14,fontWeight:600,letterSpacing:"-0.2px" }}>{title}</p>
        {subtitle && <p style={{ margin:"3px 0 0",fontSize:12,color:C.textSecondary }}>{subtitle}</p>}
      </div>
      <div style={{ padding:"20px 24px" }}>{children}</div>
    </div>
  );
}

function Btn({ children, onClick, variant="secondary", disabled, style, size="md" }: any) {
  const pad = size==="sm" ? "8px 16px" : "11px 22px";
  const fs = size==="sm" ? 13 : 14;
  const base: any = { padding:pad,fontSize:fs,fontWeight:500,borderRadius:10,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,border:"none",transition:"all 0.15s",opacity:disabled?0.5:1,fontFamily:"inherit",letterSpacing:"-0.1px" };
  const variants: any = {
    primary: { background:C.text,color:"#fff" },
   secondary: { border:`1px solid ${C.border}`,color:C.text,background:C.bgSecondary },
   
  return <button onClick={disabled?undefined:onClick} style={{ ...base,...variants[variant],...style }}>{children}</button>;
}

function PhotoUpload({ photo, onPhoto }: any) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:10 }}>
      <div onClick={()=>ref.current?.click()}
        style={{ width:96,height:96,borderRadius:"50%",border:`2px dashed ${photo?C.borderMid:C.border}`,background:photo?"transparent":C.bgSecondary,cursor:"pointer",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0 }}>
        {photo
          ? <img src={photo} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
          : <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:22,margin:"0 0 4px" }}>📷</p>
              <p style={{ fontSize:10,color:C.textTertiary,margin:0,fontWeight:500 }}>Add photo</p>
            </div>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display:"none" }} />
      {photo
        ? <button onClick={()=>onPhoto("")} style={{ fontSize:11,color:C.danger,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit" }}>Remove photo</button>
        : <button onClick={()=>ref.current?.click()} style={{ fontSize:11,color:C.textSecondary,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit" }}>Upload photo</button>
      }
    </div>
  );
}

function ResumePreview({ form, resume, template, photo }: any) {
  const t = TEMPLATES.find((x:any)=>x.id===template)||TEMPLATES[0];
  const accent = t.accent;
  return (
    <div id="resume-preview" style={{ background:"#fff",borderRadius:14,padding:"36px 40px",fontFamily:"Georgia,serif",color:"#1a1a1a",fontSize:13,lineHeight:1.65,border:`1px solid ${C.border}`,boxSizing:"border-box" as any }}>
      <div style={{ borderBottom:`3px solid ${accent}`,paddingBottom:16,marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16 }}>
        <div style={{ flex:1 }}>
          <h1 style={{ margin:"0 0 4px",fontSize:26,fontWeight:700,color:accent,fontFamily:"sans-serif",letterSpacing:"-0.5px" }}>{form.name||"Your Name"}</h1>
          <p style={{ margin:"0 0 8px",fontSize:14,color:"#555",fontFamily:"sans-serif",fontWeight:500 }}>{form.title||"Professional Title"}</p>
          <div style={{ display:"flex",flexWrap:"wrap" as any,gap:"4px 16px",fontSize:12,color:"#777",fontFamily:"sans-serif" }}>
            {form.email&&<span>✉ {form.email}</span>}
            {form.phone&&<span>📞 {form.phone}</span>}
            {form.location&&<span>📍 {form.location}</span>}
            {form.linkedin&&<span>🔗 {form.linkedin}</span>}
            {form.website&&<span>🌐 {form.website}</span>}
          </div>
        </div>
        {photo && <img src={photo} style={{ width:72,height:72,borderRadius:"50%",objectFit:"cover" as any,border:`2px solid ${accent}`,flexShrink:0 }} />}
      </div>

      {resume?.summary&&<ResumeSection accent={accent} title="Summary"><p style={{ margin:0,color:"#333",lineHeight:1.75 }}>{resume.summary}</p></ResumeSection>}

      {resume?.experience?.length>0&&<ResumeSection accent={accent} title="Experience">
        {resume.experience.map((exp:any,i:number)=>(
          <div key={i} style={{ marginBottom:i<resume.experience.length-1?14:0 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
              <strong style={{ fontSize:13,fontFamily:"sans-serif" }}>{exp.role}</strong>
              <span style={{ fontSize:11,color:"#999",fontFamily:"sans-serif" }}>{exp.period}</span>
            </div>
            <p style={{ margin:"2px 0 6px",fontSize:12,color:accent,fontFamily:"sans-serif",fontWeight:600 }}>{exp.company}</p>
            <ul style={{ margin:0,paddingLeft:18 }}>{exp.bullets?.map((b:string,j:number)=><li key={j} style={{ marginBottom:3,color:"#444" }}>{b}</li>)}</ul>
          </div>
        ))}
      </ResumeSection>}

      {resume?.education?.length>0&&<ResumeSection accent={accent} title="Education">
        {resume.education.map((ed:any,i:number)=>(
          <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
            <div><strong style={{ fontFamily:"sans-serif",fontSize:13 }}>{ed.degree}</strong><p style={{ margin:"2px 0 0",fontSize:12,color:"#777",fontFamily:"sans-serif" }}>{ed.institution}</p></div>
            <span style={{ fontSize:11,color:"#999",fontFamily:"sans-serif",whiteSpace:"nowrap" as any }}>{ed.year}</span>
          </div>
        ))}
      </ResumeSection>}

      {resume?.skills?.length>0&&<ResumeSection accent={accent} title="Skills"><p style={{ margin:0,fontFamily:"sans-serif",color:"#444",lineHeight:1.8 }}>{resume.skills.join(" · ")}</p></ResumeSection>}
      {resume?.achievements?.length>0&&<ResumeSection accent={accent} title="Achievements"><ul style={{ margin:0,paddingLeft:18 }}>{resume.achievements.map((a:string,i:number)=><li key={i} style={{ marginBottom:3,color:"#444",fontFamily:"sans-serif" }}>{a}</li>)}</ul></ResumeSection>}
    </div>
  );
}

function ResumeSection({ accent, title, children }: any) {
  return (
    <div style={{ marginBottom:16 }}>
      <h2 style={{ margin:"0 0 8px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase" as any,color:accent,fontFamily:"sans-serif",borderBottom:`1px solid #f0f0f0`,paddingBottom:4 }}>{title}</h2>
      {children}
    </div>
  );
}

function AtsPanel({ ats }: any) {
  if (!ats) return null;
  const score = ats.score||0;
  const color = score>=80?C.success:score>=60?"#d97706":C.danger;
  return (
    <div style={{ background:C.bgSecondary,borderRadius:10,padding:"16px 20px",marginTop:14,border:`1px solid ${C.border}` }}>
      <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:12 }}>
        <div style={{ width:52,height:52,borderRadius:"50%",border:`3px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:16,fontWeight:600,color }}>{score}</span>
        </div>
        <div>
          <p style={{ margin:"0 0 2px",fontSize:14,fontWeight:600 }}>ATS Score</p>
          <p style={{ margin:0,fontSize:12,color:C.textSecondary }}>{score>=80?"Strong match":score>=60?"Decent match":"Needs improvement"}</p>
        </div>
      </div>
      {ats.keywords?.length>0&&<div style={{ marginBottom:10 }}>
        <p style={{ fontSize:10,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 6px" }}>Matched</p>
        <div style={{ display:"flex",flexWrap:"wrap" as any,gap:4 }}>{ats.keywords.map((k:string)=><span key={k} style={{ background:C.successBg,color:C.success,borderRadius:999,fontSize:11,padding:"3px 10px",fontWeight:500 }}>{k}</span>)}</div>
      </div>}
      {ats.missing?.length>0&&<div style={{ marginBottom:10 }}>
        <p style={{ fontSize:10,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 6px" }}>Missing</p>
        <div style={{ display:"flex",flexWrap:"wrap" as any,gap:4 }}>{ats.missing.map((k:string)=><span key={k} style={{ background:C.dangerBg,color:C.danger,borderRadius:999,fontSize:11,padding:"3px 10px",fontWeight:500 }}>{k}</span>)}</div>
      </div>}
      {ats.tips?.length>0&&<div>
        <p style={{ fontSize:10,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 6px" }}>Tips</p>
        {ats.tips.map((tip:string,i:number)=><p key={i} style={{ fontSize:12,color:C.textSecondary,margin:"0 0 5px",paddingLeft:10,borderLeft:`2px solid ${C.border}`,lineHeight:1.5 }}>{tip}</p>)}
      </div>}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState("");
  const [form, setForm] = useState({ name:"",title:"",email:"",phone:"",location:"",linkedin:"",website:"",experience:"",education:"",skills:"",achievements:"" });
  const [resume, setResume] = useState<any>(null);
  const [template, setTemplate] = useState("classic");
  const [loadingResume, setLoadingResume] = useState(false);
  const [loadingAts, setLoadingAts] = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);
  const [improvingField, setImprovingField] = useState<string|null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [ats, setAts] = useState<any>(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [error, setError] = useState("");

  const update = (k:string,v:string) => setForm(f=>({...f,[k]:v}));

  const callAI = async (prompt: string) => {
    const res = await fetch("/api/claude", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ messages:[{role:"user",content:prompt}] })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim()||"";
  };

  const improveField = async (id: string) => {
    if (!form[id as keyof typeof form].trim()) return;
    setImprovingField(id); setError("");
    try {
      const out = await callAI(`Rewrite this resume section to be professional and impactful. Use strong action verbs. Return ONLY the improved text, no commentary.\n\nSection: ${id}\nText: ${form[id as keyof typeof form]}`);
      update(id, out);
    } catch { setError("Improve failed. Try again."); }
    setImprovingField(null);
  };

  const buildResume = async () => {
    setLoadingResume(true); setResume(null); setAts(null); setLinkedIn(""); setError("");
    try {
      const raw = await callAI(`You are a professional resume writer. Generate a complete polished resume. Return ONLY valid JSON, no markdown:\n{"summary":"...","experience":[{"role":"","company":"","period":"","bullets":[]}],"education":[{"degree":"","institution":"","year":""}],"skills":[],"achievements":[]}\n\nName: ${form.name}\nTitle: ${form.title}\nExperience: ${form.experience||"not provided"}\nEducation: ${form.education||"not provided"}\nSkills: ${form.skills||"not provided"}\nAchievements: ${form.achievements||"none"}\n\nUse strong past-tense action verbs. Return only the JSON object.`);
      setResume(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setStep(3);
    } catch { setError("Failed to build resume. Please try again."); }
    setLoadingResume(false);
  };

  const checkAts = async () => {
    if (!jobDesc||!resume) return;
    setLoadingAts(true); setError("");
    try {
      const raw = await callAI(`Analyze ATS match. Return ONLY valid JSON:\n{"score":75,"keywords":["react"],"missing":["agile"],"tips":["Add more results"]}\n\nResume: ${resume.skills?.join(", ")} ${resume.experience?.flatMap((e:any)=>e.bullets).join(". ")}\nJob: ${jobDesc}\n\nReturn only JSON.`);
      setAts(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch { setError("ATS check failed."); }
    setLoadingAts(false);
  };

  const genLinkedIn = async () => {
    if (!resume) return;
    setLoadingLinkedIn(true); setLinkedIn(""); setError("");
    try {
      const out = await callAI(`Write a compelling LinkedIn About section (3-4 paragraphs, max 300 words). First-person, professional but human.\n\nName: ${form.name}\nTitle: ${form.title}\nSummary: ${resume.summary}\nSkills: ${resume.skills?.join(", ")}\n\nReturn only the About text.`);
      setLinkedIn(out);
    } catch { setError("LinkedIn generation failed."); }
    setLoadingLinkedIn(false);
  };

  const printResume = () => {
    const el = document.getElementById("resume-preview");
    if (!el) return;
    const w = window.open("","_blank") as any;
    w.document.write(`<html><head><title>${form.name||"Resume"}</title><style>body{margin:32px;font-family:Georgia,serif;color:#1a1a1a;font-size:13px}@media print{body{margin:16px}}</style></head><body>${el.innerHTML}</body></html>`);
    w.document.close(); w.focus(); setTimeout(()=>w.print(),300);
  };

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:C.text,background:C.bgTertiary,minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box}@keyframes spin{to{transform:rotate(360deg)}}body{margin:0}`}</style>

      {/* Top nav */}
      <div style={{ background:C.bg,borderBottom:`1px solid ${C.border}`,padding:"0 2rem",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50 }}>
        <a href="/" style={{ fontSize:16,fontWeight:700,color:C.text,textDecoration:"none",letterSpacing:"-0.3px" }}>ResumeAI</a>
        <StepBar current={step} />
        <div style={{ width:80 }} />
      </div>

      <div style={{ maxWidth:960,margin:"0 auto",padding:"2rem 1.5rem 4rem" }}>

        {error&&<div style={{ background:C.dangerBg,border:`1px solid rgba(185,28,28,0.2)`,borderRadius:10,padding:"12px 16px",fontSize:13,color:C.danger,marginBottom:16 }}>{error}</div>}

        {/* Step 0 — Personal info */}
        {step===0&&(
          <div>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:24,fontWeight:600,margin:"0 0 6px",letterSpacing:"-0.5px" }}>Let's start with the basics</h1>
              <p style={{ fontSize:14,color:C.textSecondary,margin:0 }}>Fill in your personal details. You can always edit these later.</p>
            </div>

            <SectionCard title="Profile photo" subtitle="Optional — adds a personal touch to your resume">
              <PhotoUpload photo={photo} onPhoto={setPhoto} />
            </SectionCard>

            <SectionCard title="Personal details" subtitle="Your name and contact information">
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div style={{ gridColumn:"1/-1" }}>
                  <Label>Full name *</Label>
                  <Input id="name" value={form.name} onChange={update} placeholder="Jane Smith" />
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <Label>Desired job title</Label>
                  <Input id="title" value={form.title} onChange={update} placeholder="Senior Product Designer" />
                </div>
                <div>
                  <Label>Email address</Label>
                  <Input id="email" value={form.email} onChange={update} placeholder="jane@email.com" type="email" icon="✉" />
                </div>
                <div>
                  <Label>Phone number</Label>
                  <Input id="phone" value={form.phone} onChange={update} placeholder="+1 415 555 0100" icon="📞" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input id="location" value={form.location} onChange={update} placeholder="San Francisco, CA" icon="📍" />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input id="linkedin" value={form.linkedin} onChange={update} placeholder="linkedin.com/in/janesmith" icon="🔗" />
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <Label>Personal website (optional)</Label>
                  <Input id="website" value={form.website} onChange={update} placeholder="janesmith.com" icon="🌐" />
                </div>
              </div>
            </SectionCard>

            <div style={{ display:"flex",justifyContent:"flex-end" }}>
              <Btn variant="primary" onClick={()=>{ if(!form.name){setError("Please enter your name.");return;} setError("");setStep(1); }}>
                Continue to Experience →
              </Btn>
            </div>
          </div>
        )}

        {/* Step 1 — Experience */}
        {step===1&&(
          <div>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:24,fontWeight:600,margin:"0 0 6px",letterSpacing:"-0.5px" }}>Your work experience</h1>
              <p style={{ fontSize:14,color:C.textSecondary,margin:0 }}>Write naturally — AI will polish your words into professional bullet points.</p>
            </div>

            <SectionCard title="Work history" subtitle="Describe your roles, responsibilities, and impact">
              <TextArea label="Work experience" id="experience" value={form.experience} onChange={update} minH={150}
                hint="Write casually — AI will improve it"
                placeholder={"e.g. I worked at Google for 3 years doing backend engineering. Led a team of 5 people and built APIs that handled lots of traffic. Before that I was a junior dev at a startup for 2 years where I built the whole frontend."}
                onImprove={()=>improveField("experience")} improving={improvingField==="experience"} />
            </SectionCard>

            <SectionCard title="Achievements & extras" subtitle="Awards, projects, publications, volunteering — anything that makes you stand out">
              <TextArea label="Achievements" id="achievements" value={form.achievements} onChange={update} minH={90}
                placeholder="e.g. Won a company hackathon, published an article on Medium, open-source project with 2k GitHub stars, volunteered at..."
                onImprove={()=>improveField("achievements")} improving={improvingField==="achievements"} />
            </SectionCard>

            <div style={{ display:"flex",justifyContent:"space-between" }}>
              <Btn onClick={()=>setStep(0)}>← Back</Btn>
              <Btn variant="primary" onClick={()=>{ setError("");setStep(2); }}>Continue to Education →</Btn>
            </div>
          </div>
        )}

        {/* Step 2 — Education & skills */}
        {step===2&&(
          <div>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:24,fontWeight:600,margin:"0 0 6px",letterSpacing:"-0.5px" }}>Education & skills</h1>
              <p style={{ fontSize:14,color:C.textSecondary,margin:0 }}>Almost done! Add your education and skills, then we'll build your resume.</p>
            </div>

            <SectionCard title="Education" subtitle="Degrees, certifications, courses">
              <TextArea label="Education background" id="education" value={form.education} onChange={update} minH={90}
                placeholder="e.g. Computer Science degree from NUS, graduated 2021. Dean's list. Also did an online AWS certification in 2022."
                onImprove={()=>improveField("education")} improving={improvingField==="education"} />
            </SectionCard>

            <SectionCard title="Skills" subtitle="Technical skills, tools, languages, soft skills">
              <TextArea label="Your skills" id="skills" value={form.skills} onChange={update} minH={80}
                placeholder="e.g. React, TypeScript, Python, Node.js, Figma, AWS, Docker, strong communicator, project management, agile"
                onImprove={()=>improveField("skills")} improving={improvingField==="skills"} />
            </SectionCard>

            <SectionCard title="Choose your template" subtitle="You can change this anytime on the preview screen">
              <div style={{ display:"flex",gap:12 }}>
                {TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>setTemplate(t.id)}
                    style={{ padding:"12px 22px",borderRadius:10,cursor:"pointer",fontWeight:500,fontSize:13,border:template===t.id?`2px solid ${t.accent}`:`1px solid ${C.border}`,background:template===t.id?"#fff":C.bgSecondary,color:template===t.id?t.accent:C.textSecondary,display:"flex",alignItems:"center",gap:8,transition:"all 0.15s",fontFamily:"inherit" }}>
                    <span style={{ width:12,height:12,borderRadius:"50%",background:t.accent,display:"inline-block",flexShrink:0 }} />{t.label}
                  </button>
                ))}
              </div>
            </SectionCard>

            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <Btn onClick={()=>setStep(1)}>← Back</Btn>
              <Btn variant="primary" onClick={buildResume} disabled={loadingResume} style={{ padding:"13px 28px",fontSize:15 }}>
                {loadingResume?<><Spinner light />Building your resume...</>:"✦ Build my resume →"}
              </Btn>
            </div>
          </div>
        )}

        {/* Step 3 — Preview */}
        {step===3&&resume&&(
          <div>
            <div style={{ marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
              <div>
                <h1 style={{ fontSize:24,fontWeight:600,margin:"0 0 6px",letterSpacing:"-0.5px" }}>Your resume is ready! 🎉</h1>
                <p style={{ fontSize:14,color:C.textSecondary,margin:0 }}>Download as PDF or check your ATS score below.</p>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                {TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>setTemplate(t.id)} title={t.label}
                    style={{ width:22,height:22,borderRadius:"50%",background:t.accent,border:template===t.id?`3px solid #1a1a1a`:`2px solid transparent`,cursor:"pointer",padding:0,transition:"all 0.15s" }} />
                ))}
              </div>
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 340px",gap:20,alignItems:"start" }}>
              <div>
                <ResumePreview form={form} resume={resume} template={template} photo={photo} />
                <div style={{ display:"flex",gap:10,marginTop:14,flexWrap:"wrap" as any }}>
                  <Btn variant="primary" onClick={printResume}>↓ Download / Print PDF</Btn>
                  <Btn onClick={()=>setStep(0)}>← Edit resume</Btn>
                </div>
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                <div style={{ background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden" }}>
                  <div style={{ padding:"14px 18px",borderBottom:`1px solid ${C.border}`,background:C.bgSecondary }}>
                    <p style={{ fontSize:14,fontWeight:600,margin:0 }}>ATS keyword checker</p>
                    <p style={{ fontSize:11,color:C.textSecondary,margin:"3px 0 0" }}>See how well your resume matches a job</p>
                  </div>
                  <div style={{ padding:"16px 18px" }}>
                    <textarea value={jobDesc} onChange={e=>setJobDesc(e.target.value)} placeholder="Paste a job description here..."
                      style={{ padding:"10px 12px",fontSize:13,border:`1px solid ${C.border}`,borderRadius:10,resize:"vertical" as any,outline:"none",width:"100%",minHeight:100,lineHeight:1.6,fontFamily:"inherit",color:C.text,background:C.bgSecondary }} />
                    <Btn variant="primary" onClick={checkAts} disabled={loadingAts||!jobDesc} style={{ marginTop:10,width:"100%",fontSize:13 }}>
                      {loadingAts?<><Spinner light />Checking...</>:"✦ Check ATS score"}
                    </Btn>
                    <AtsPanel ats={ats} />
                  </div>
                </div>

                <div style={{ background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden" }}>
                  <div style={{ padding:"14px 18px",borderBottom:`1px solid ${C.border}`,background:C.bgSecondary }}>
                    <p style={{ fontSize:14,fontWeight:600,margin:0 }}>LinkedIn bio generator</p>
                    <p style={{ fontSize:11,color:C.textSecondary,margin:"3px 0 0" }}>Turn your resume into a LinkedIn About section</p>
                  </div>
                  <div style={{ padding:"16px 18px" }}>
                    <Btn variant="primary" onClick={genLinkedIn} disabled={loadingLinkedIn} style={{ width:"100%",fontSize:13 }}>
                      {loadingLinkedIn?<><Spinner light />Writing...</>:"✦ Generate LinkedIn bio"}
                    </Btn>
                    {linkedIn&&(
                      <div style={{ marginTop:12 }}>
                        <div style={{ background:C.bgSecondary,borderRadius:10,padding:"14px 16px",fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap" as any,maxHeight:220,overflowY:"auto" as any,color:C.text,border:`1px solid ${C.border}` }}>{linkedIn}</div>
                        <Btn onClick={()=>navigator.clipboard?.writeText(linkedIn)} style={{ marginTop:10,fontSize:12,padding:"7px 14px" }}>Copy to clipboard</Btn>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}// updated
