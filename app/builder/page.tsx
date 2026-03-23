'use client';

import { useState } from "react";

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
  border: "rgba(0,0,0,0.1)",
  borderMid: "rgba(0,0,0,0.18)",
  success: "#15803d",
  successBg: "#dcfce7",
  danger: "#b91c1c",
  dangerBg: "#fee2e2",
  warning: "#92400e",
  warningBg: "#fef3c7",
  radius: "8px",
  radiusLg: "12px",
};

function Spinner({ light }: { light?: boolean }) {
  return <span style={{ display:"inline-block",width:13,height:13,border:`2px solid ${light?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.15)"}`,borderTopColor:light?"#fff":C.text,borderRadius:"50%",animation:"spin 0.7s linear infinite",verticalAlign:"middle",marginRight:6 }} />;
}

function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display:"flex",alignItems:"center",padding:"0 1.5rem",marginBottom:32 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display:"flex",alignItems:"center",flex:i<STEPS.length-1?1:"none" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
            <div style={{ width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500,background:i<=current?C.text:C.bgSecondary,color:i<=current?"#fff":C.textTertiary,border:`1px solid ${i<=current?C.text:C.border}`,transition:"all 0.2s",flexShrink:0 }}>
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

function Field({ label, id, value, onChange, placeholder, type="text" }: any) {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
      <label style={{ fontSize:13,fontWeight:500,color:C.textSecondary }}>{label}</label>
      <input type={type} value={value} onChange={(e:any)=>onChange(id,e.target.value)} placeholder={placeholder}
        style={{ padding:"10px 12px",fontSize:14,border:`1px solid ${C.border}`,borderRadius:C.radius,background:C.bg,color:C.text,outline:"none",width:"100%",boxSizing:"border-box" as any,transition:"border-color 0.15s" }}
        onFocus={e=>(e.target.style.borderColor=C.borderMid)} onBlur={e=>(e.target.style.borderColor=C.border)} />
    </div>
  );
}

function TextArea({ label, id, value, onChange, placeholder, minH=90, onImprove, improving }: any) {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <label style={{ fontSize:13,fontWeight:500,color:C.textSecondary }}>{label}</label>
        {onImprove && (
          <button onClick={onImprove} disabled={improving||!value.trim()}
            style={{ fontSize:11,padding:"4px 11px",borderRadius:6,cursor:improving||!value.trim()?"not-allowed":"pointer",background:"none",border:`1px solid ${C.border}`,color:C.textSecondary,display:"inline-flex",alignItems:"center",gap:3,opacity:!value.trim()?0.4:1,transition:"all 0.15s" }}>
            {improving?<><Spinner />Improving...</>:"✦ Improve phrasing"}
          </button>
        )}
      </div>
      <textarea value={value} onChange={(e:any)=>onChange(id,e.target.value)} placeholder={placeholder}
        style={{ padding:"10px 12px",fontSize:14,border:`1px solid ${C.border}`,borderRadius:C.radius,background:C.bg,color:C.text,resize:"vertical" as any,outline:"none",width:"100%",boxSizing:"border-box" as any,minHeight:minH,lineHeight:1.65,fontFamily:"inherit",transition:"border-color 0.15s" }}
        onFocus={e=>(e.target.style.borderColor=C.borderMid)} onBlur={e=>(e.target.style.borderColor=C.border)} />
    </div>
  );
}

function Card({ children, style }: any) {
  return <div style={{ background:C.bg,border:`1px solid ${C.border}`,borderRadius:C.radiusLg,padding:"24px 28px",...style }}>{children}</div>;
}

function SectionLabel({ children }: any) {
  return <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.09em",margin:"0 0 14px" }}>{children}</p>;
}

function Btn({ children, onClick, variant="secondary", disabled, style }: any) {
  const base: any = { padding:"10px 20px",fontSize:14,fontWeight:500,borderRadius:C.radius,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,border:"none",transition:"opacity 0.15s",opacity:disabled?0.6:1,fontFamily:"inherit" };
  const variants: any = {
    primary: { background:C.text,color:"#fff" },
    secondary: { background:"none",border:`1px solid ${C.border}`,color:C.text },
    ghost: { background:C.bgSecondary,border:`1px solid ${C.border}`,color:C.textSecondary },
  };
  return <button onClick={disabled?undefined:onClick} style={{ ...base,...variants[variant],...style }}>{children}</button>;
}

function Pill({ children, color }: any) {
  const colors: any = {
    green: { bg:C.successBg,text:C.success },
    red: { bg:C.dangerBg,text:C.danger },
    gray: { bg:C.bgSecondary,text:C.textSecondary },
  };
  const c = colors[color]||colors.gray;
  return <span style={{ background:c.bg,color:c.text,borderRadius:999,fontSize:11,padding:"3px 11px",display:"inline-block" }}>{children}</span>;
}

function ResumePreview({ form, resume, template }: any) {
  const t = TEMPLATES.find((x:any)=>x.id===template)||TEMPLATES[0];
  const accent = t.accent;
  return (
    <div id="resume-preview" style={{ background:"#fff",borderRadius:C.radiusLg,padding:"36px 40px",fontFamily:"Georgia,serif",color:"#1a1a1a",fontSize:13,lineHeight:1.65,border:`1px solid ${C.border}`,boxSizing:"border-box" as any }}>
      <div style={{ borderBottom:`3px solid ${accent}`,paddingBottom:16,marginBottom:18 }}>
        <h1 style={{ margin:"0 0 4px",fontSize:24,fontWeight:700,color:accent,fontFamily:"sans-serif",letterSpacing:"-0.3px" }}>{form.name||"Your Name"}</h1>
        <p style={{ margin:"0 0 8px",fontSize:14,color:"#555",fontFamily:"sans-serif",fontWeight:500 }}>{form.title||"Professional Title"}</p>
        <div style={{ display:"flex",flexWrap:"wrap" as any,gap:"0 18px",fontSize:12,color:"#777",fontFamily:"sans-serif" }}>
          {form.email&&<span>{form.email}</span>}
          {form.phone&&<span>{form.phone}</span>}
          {form.location&&<span>{form.location}</span>}
        </div>
      </div>
      {resume?.summary&&<Section accent={accent} title="Professional Summary"><p style={{ margin:0,color:"#333",lineHeight:1.7 }}>{resume.summary}</p></Section>}
      {resume?.experience?.length>0&&<Section accent={accent} title="Experience">
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
      </Section>}
      {resume?.education?.length>0&&<Section accent={accent} title="Education">
        {resume.education.map((ed:any,i:number)=>(
          <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
            <div><strong style={{ fontFamily:"sans-serif",fontSize:13 }}>{ed.degree}</strong><p style={{ margin:"2px 0 0",fontSize:12,color:"#777",fontFamily:"sans-serif" }}>{ed.institution}</p></div>
            <span style={{ fontSize:11,color:"#999",fontFamily:"sans-serif" }}>{ed.year}</span>
          </div>
        ))}
      </Section>}
      {resume?.skills?.length>0&&<Section accent={accent} title="Skills"><p style={{ margin:0,fontFamily:"sans-serif",color:"#444",lineHeight:1.8 }}>{resume.skills.join(" · ")}</p></Section>}
      {resume?.achievements?.length>0&&<Section accent={accent} title="Achievements"><ul style={{ margin:0,paddingLeft:18 }}>{resume.achievements.map((a:string,i:number)=><li key={i} style={{ marginBottom:3,color:"#444",fontFamily:"sans-serif" }}>{a}</li>)}</ul></Section>}
    </div>
  );
}

function Section({ accent, title, children }: any) {
  return (
    <div style={{ marginBottom:16 }}>
      <h2 style={{ margin:"0 0 8px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase" as any,color:accent,fontFamily:"sans-serif" }}>{title}</h2>
      {children}
    </div>
  );
}

function AtsPanel({ ats }: any) {
  if (!ats) return null;
  const score = ats.score||0;
  const color = score>=80?C.success:score>=60?"#d97706":C.danger;
  return (
    <div style={{ background:C.bgSecondary,borderRadius:C.radius,padding:"18px 20px",marginTop:16,border:`1px solid ${C.border}` }}>
      <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:14 }}>
        <div style={{ width:52,height:52,borderRadius:"50%",border:`3px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:16,fontWeight:600,color }}>{score}</span>
        </div>
        <div>
          <p style={{ margin:"0 0 2px",fontSize:14,fontWeight:500 }}>ATS Score</p>
          <p style={{ margin:0,fontSize:12,color:C.textSecondary }}>{score>=80?"Strong match":score>=60?"Decent match":"Needs improvement"}</p>
        </div>
      </div>
      {ats.keywords?.length>0&&<div style={{ marginBottom:10 }}>
        <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 7px" }}>Matched keywords</p>
        <div style={{ display:"flex",flexWrap:"wrap" as any,gap:4 }}>{ats.keywords.map((k:string)=><Pill key={k} color="green">{k}</Pill>)}</div>
      </div>}
      {ats.missing?.length>0&&<div style={{ marginBottom:10 }}>
        <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 7px" }}>Missing keywords</p>
        <div style={{ display:"flex",flexWrap:"wrap" as any,gap:4 }}>{ats.missing.map((k:string)=><Pill key={k} color="red">{k}</Pill>)}</div>
      </div>}
      {ats.tips?.length>0&&<div>
        <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase" as any,letterSpacing:"0.08em",margin:"0 0 7px" }}>Tips</p>
        {ats.tips.map((tip:string,i:number)=><p key={i} style={{ fontSize:12,color:C.textSecondary,margin:"0 0 5px",paddingLeft:10,borderLeft:`2px solid ${C.border}`,lineHeight:1.5 }}>{tip}</p>)}
      </div>}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name:"",title:"",email:"",phone:"",location:"",experience:"",education:"",skills:"",achievements:"" });
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
      method:"POST",
      headers:{"Content-Type":"application/json"},
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
      const raw = await callAI(`You are a professional resume writer. Generate a complete polished resume. Return ONLY valid JSON, no markdown fences:\n{"summary":"...","experience":[{"role":"","company":"","period":"","bullets":[]}],"education":[{"degree":"","institution":"","year":""}],"skills":[],"achievements":[]}\n\nName: ${form.name}\nTitle: ${form.title}\nExperience: ${form.experience||"not provided"}\nEducation: ${form.education||"not provided"}\nSkills: ${form.skills||"not provided"}\nAchievements: ${form.achievements||"none"}\n\nUse strong past-tense action verbs. Infer details where vague. Return only the JSON object.`);
      setResume(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setStep(3);
    } catch { setError("Failed to build resume. Please try again."); }
    setLoadingResume(false);
  };

  const checkAts = async () => {
    if (!jobDesc||!resume) return;
    setLoadingAts(true); setError("");
    try {
      const raw = await callAI(`Analyze ATS match. Return ONLY valid JSON, no markdown:\n{"score":75,"keywords":["react","leadership"],"missing":["agile","sql"],"tips":["Add more quantified results","Include relevant certifications"]}\n\nResume skills: ${resume.skills?.join(", ")}\nResume bullets: ${resume.experience?.flatMap((e:any)=>e.bullets).join(". ")}\nJob description: ${jobDesc}\n\nReturn only the JSON.`);
      setAts(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch { setError("ATS check failed. Try again."); }
    setLoadingAts(false);
  };

  const genLinkedIn = async () => {
    if (!resume) return;
    setLoadingLinkedIn(true); setLinkedIn(""); setError("");
    try {
      const out = await callAI(`Write a compelling LinkedIn About section (3-4 short paragraphs, max 300 words). First-person, professional but human. End with what they're open to.\n\nName: ${form.name}\nTitle: ${form.title}\nSummary: ${resume.summary}\nSkills: ${resume.skills?.join(", ")}\n\nReturn only the About text, no labels.`);
      setLinkedIn(out);
    } catch { setError("LinkedIn generation failed. Try again."); }
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
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:C.text,maxWidth:920,margin:"0 auto",padding:"0 0 4rem",background:C.bgTertiary,minHeight:"100vh" }}>
      <style>{`*{box-sizing:border-box}@keyframes spin{to{transform:rotate(360deg)}}body{margin:0;background:${C.bgTertiary}}`}</style>

      {/* Hero */}
      <div style={{ textAlign:"center",padding:"3rem 1rem 2.5rem" }}>
        <span style={{ display:"inline-block",background:C.bg,border:`1px solid ${C.border}`,borderRadius:999,fontSize:12,padding:"5px 16px",color:C.textSecondary,marginBottom:16,fontWeight:500 }}>✦ AI-powered · Free to start</span>
        <h1 style={{ fontSize:34,fontWeight:600,margin:"0 0 12px",lineHeight:1.15,letterSpacing:"-0.5px" }}>Build your resume with AI</h1>
        <p style={{ fontSize:16,color:C.textSecondary,margin:0,lineHeight:1.6 }}>Type naturally — AI polishes your words and<br/>formats everything professionally.</p>
      </div>

      <div style={{ background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,margin:"0 1rem",padding:"28px 0 8px",boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
        <StepBar current={step} />

        {error&&<div style={{ background:C.dangerBg,border:`1px solid rgba(185,28,28,0.2)`,borderRadius:C.radius,padding:"10px 16px",fontSize:13,color:C.danger,margin:"0 1.5rem 16px" }}>{error}</div>}

        {/* Step 0 */}
        {step===0&&(
          <div style={{ padding:"0 1.5rem 1.5rem" }}>
            <SectionLabel>Personal information</SectionLabel>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
              <Field label="Full name *" id="name" value={form.name} onChange={update} placeholder="Jane Smith" />
              <Field label="Desired job title" id="title" value={form.title} onChange={update} placeholder="Senior Product Designer" />
              <Field label="Email" id="email" value={form.email} onChange={update} placeholder="jane@email.com" type="email" />
              <Field label="Phone" id="phone" value={form.phone} onChange={update} placeholder="+1 415 555 0100" />
              <Field label="Location" id="location" value={form.location} onChange={update} placeholder="San Francisco, CA" />
            </div>
            <div style={{ display:"flex",justifyContent:"flex-end",paddingTop:8 }}>
              <Btn variant="primary" onClick={()=>{ if(!form.name){setError("Please enter your name.");return;} setError("");setStep(1); }}>Next: Experience →</Btn>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step===1&&(
          <div style={{ padding:"0 1.5rem 1.5rem" }}>
            <SectionLabel>Work experience</SectionLabel>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <TextArea label="Describe your work history" id="experience" value={form.experience} onChange={update} minH={130}
                placeholder="e.g. I worked at Google for 3 years doing backend. Led a team of 5 and built APIs handling millions of requests per day."
                onImprove={()=>improveField("experience")} improving={improvingField==="experience"} />
              <TextArea label="Achievements & extras (optional)" id="achievements" value={form.achievements} onChange={update} minH={80}
                placeholder="e.g. Won a hackathon, published an article, open-source project with 2k stars"
                onImprove={()=>improveField("achievements")} improving={improvingField==="achievements"} />
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",paddingTop:20 }}>
              <Btn onClick={()=>setStep(0)}>← Back</Btn>
              <Btn variant="primary" onClick={()=>{ setError("");setStep(2); }}>Next: Education & Skills →</Btn>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step===2&&(
          <div style={{ padding:"0 1.5rem 1.5rem" }}>
            <SectionLabel>Education & skills</SectionLabel>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <TextArea label="Education" id="education" value={form.education} onChange={update} minH={80}
                placeholder="e.g. Computer Science degree from NUS, graduated 2021. Dean's list."
                onImprove={()=>improveField("education")} improving={improvingField==="education"} />
              <TextArea label="Skills" id="skills" value={form.skills} onChange={update} minH={80}
                placeholder="e.g. React, Python, Node.js, Figma, project management, communication"
                onImprove={()=>improveField("skills")} improving={improvingField==="skills"} />
            </div>
            <div style={{ marginTop:24 }}>
              <SectionLabel>Choose a template</SectionLabel>
              <div style={{ display:"flex",gap:10 }}>
                {TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>setTemplate(t.id)}
                    style={{ padding:"10px 20px",borderRadius:C.radius,cursor:"pointer",fontWeight:500,fontSize:13,border:template===t.id?`2px solid ${t.accent}`:`1px solid ${C.border}`,background:template===t.id?"#fff":C.bgSecondary,color:template===t.id?t.accent:C.textSecondary,display:"flex",alignItems:"center",gap:8,transition:"all 0.15s",fontFamily:"inherit" }}>
                    <span style={{ width:10,height:10,borderRadius:"50%",background:t.accent,display:"inline-block",flexShrink:0 }} />{t.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",paddingTop:20 }}>
              <Btn onClick={()=>setStep(1)}>← Back</Btn>
              <Btn variant="primary" onClick={buildResume} disabled={loadingResume}>
                {loadingResume?<><Spinner light />Building resume...</>:"✦ Build my resume →"}
              </Btn>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step===3&&resume&&(
          <div style={{ padding:"0 1.5rem 1.5rem" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 360px",gap:20,alignItems:"start" }}>
              <div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                  <SectionLabel>Resume preview</SectionLabel>
                  <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                    {TEMPLATES.map(t=>(
                      <button key={t.id} onClick={()=>setTemplate(t.id)} title={t.label}
                        style={{ width:20,height:20,borderRadius:"50%",background:t.accent,border:template===t.id?`3px solid #1a1a1a`:`2px solid transparent`,cursor:"pointer",padding:0,transition:"all 0.15s" }} />
                    ))}
                  </div>
                </div>
                <ResumePreview form={form} resume={resume} template={template} />
                <div style={{ display:"flex",gap:8,marginTop:14,flexWrap:"wrap" as any }}>
                  <Btn variant="primary" onClick={printResume}>↓ Download / Print PDF</Btn>
                  <Btn onClick={()=>setStep(0)}>← Edit resume</Btn>
                </div>
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                <Card>
                  <p style={{ fontSize:14,fontWeight:600,margin:"0 0 6px" }}>ATS keyword checker</p>
                  <p style={{ fontSize:12,color:C.textSecondary,margin:"0 0 12px",lineHeight:1.5 }}>Paste a job description to see how well your resume matches.</p>
                  <textarea value={jobDesc} onChange={e=>setJobDesc(e.target.value)} placeholder="Paste job description here..."
                    style={{ padding:"10px 12px",fontSize:13,border:`1px solid ${C.border}`,borderRadius:C.radius,resize:"vertical" as any,outline:"none",width:"100%",minHeight:100,lineHeight:1.6,fontFamily:"inherit",color:C.text,background:C.bgSecondary }} />
                  <Btn variant="primary" onClick={checkAts} disabled={loadingAts||!jobDesc} style={{ marginTop:10,width:"100%",fontSize:13 }}>
                    {loadingAts?<><Spinner light />Checking...</>:"✦ Check ATS score"}
                  </Btn>
                  <AtsPanel ats={ats} />
                </Card>

                <Card>
                  <p style={{ fontSize:14,fontWeight:600,margin:"0 0 6px" }}>LinkedIn bio generator</p>
                  <p style={{ fontSize:12,color:C.textSecondary,margin:"0 0 14px",lineHeight:1.5 }}>Generate a polished LinkedIn About section from your resume.</p>
                  <Btn variant="primary" onClick={genLinkedIn} disabled={loadingLinkedIn} style={{ width:"100%",fontSize:13 }}>
                    {loadingLinkedIn?<><Spinner light />Writing...</>:"✦ Generate LinkedIn bio"}
                  </Btn>
                  {linkedIn&&(
                    <div style={{ marginTop:14 }}>
                      <div style={{ background:C.bgSecondary,borderRadius:C.radius,padding:"14px 16px",fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap" as any,maxHeight:230,overflowY:"auto" as any,color:C.text,border:`1px solid ${C.border}` }}>{linkedIn}</div>
                      <Btn onClick={()=>navigator.clipboard?.writeText(linkedIn)} style={{ marginTop:10,fontSize:12,padding:"7px 14px" }}>Copy to clipboard</Btn>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}