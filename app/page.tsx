'use client';

import { useRouter } from 'next/navigation';

const features = [
  { icon: "✦", title: "AI writes your summary", desc: "Just describe yourself in plain language — AI turns it into a polished professional summary." },
  { icon: "◈", title: "Improve any section", desc: "Paste rough notes and hit Improve. AI rewrites with strong action verbs and professional tone." },
  { icon: "⬡", title: "ATS keyword checker", desc: "Paste a job description and see how well your resume matches. Get a score and missing keywords." },
  { icon: "❋", title: "Cover letter generator", desc: "Tailored cover letters in seconds. Paste the job description and get a human-sounding letter." },
  { icon: "◎", title: "LinkedIn bio generator", desc: "Turn your resume into a compelling LinkedIn About section with one click." },
  { icon: "▣", title: "Multiple templates", desc: "Choose from Classic, Modern, or Minimal templates. Switch anytime with one click." },
];

const steps = [
  { num: "01", title: "Fill in your details", desc: "Type your experience in plain, casual language — no need to be formal yet." },
  { num: "02", title: "AI polishes everything", desc: "Hit Build and AI transforms your rough notes into a professional, ATS-ready resume." },
  { num: "03", title: "Download & apply", desc: "Export as PDF and start applying. Use the cover letter generator for each role." },
];

export default function LandingPage() {
  const router = useRouter();

  const C = {
    bg: "#ffffff",
    bgSecondary: "#f7f7f5",
    bgTertiary: "#f0efeb",
    text: "#1a1a1a",
    textSecondary: "#666660",
    textTertiary: "#999990",
    border: "rgba(0,0,0,0.08)",
    borderMid: "rgba(0,0,0,0.15)",
  };

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:C.text,background:C.bg,margin:0,padding:0 }}>

      {/* Nav */}
      <nav style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 2rem",height:60,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",zIndex:100 }}>
        <span style={{ fontSize:17,fontWeight:600,letterSpacing:"-0.3px" }}>ResumeAI</span>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <button onClick={()=>router.push('/builder')} style={{ padding:"8px 16px",fontSize:13,fontWeight:500,borderRadius:8,cursor:"pointer",background:"none",border:`1px solid ${C.border}`,color:C.textSecondary,fontFamily:"inherit" }}>Sign in</button>
          <button onClick={()=>router.push('/builder')} style={{ padding:"8px 18px",fontSize:13,fontWeight:500,borderRadius:8,cursor:"pointer",background:C.text,border:"none",color:"#fff",fontFamily:"inherit" }}>Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:"center",padding:"6rem 1rem 5rem",background:`linear-gradient(180deg, ${C.bg} 0%, ${C.bgSecondary} 100%)` }}>
        <div style={{ display:"inline-block",background:C.bg,border:`1px solid ${C.border}`,borderRadius:999,fontSize:12,padding:"5px 16px",color:C.textSecondary,marginBottom:24,fontWeight:500 }}>
          ✦ Free · No account needed · AI-powered
        </div>
        <h1 style={{ fontSize:"clamp(36px, 6vw, 68px)",fontWeight:600,margin:"0 0 20px",lineHeight:1.1,letterSpacing:"-1.5px",maxWidth:800,marginLeft:"auto",marginRight:"auto" }}>
          Your dream job starts<br/>with a better resume
        </h1>
        <p style={{ fontSize:"clamp(16px, 2vw, 20px)",color:C.textSecondary,margin:"0 auto 36px",maxWidth:520,lineHeight:1.65 }}>
          Type your experience in plain language. AI polishes your words, formats everything, and helps you stand out.
        </p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <button onClick={()=>router.push('/builder')}
            style={{ padding:"14px 32px",fontSize:16,fontWeight:500,borderRadius:10,cursor:"pointer",background:C.text,border:"none",color:"#fff",fontFamily:"inherit",letterSpacing:"-0.2px" }}>
            Build my resume — it's free →
          </button>
        </div>
        <p style={{ fontSize:12,color:C.textTertiary,marginTop:16 }}>No credit card · No signup required · Takes 5 minutes</p>
      </div>

      {/* App preview mockup */}
      <div style={{ maxWidth:860,margin:"0 auto",padding:"0 1.5rem 5rem" }}>
        <div style={{ background:C.bgSecondary,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:"0 4px 40px rgba(0,0,0,0.06)" }}>
          <div style={{ background:C.bgTertiary,padding:"12px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${C.border}` }}>
            <div style={{ width:11,height:11,borderRadius:"50%",background:"#ff5f56" }} />
            <div style={{ width:11,height:11,borderRadius:"50%",background:"#ffbd2e" }} />
            <div style={{ width:11,height:11,borderRadius:"50%",background:"#27c93f" }} />
            <div style={{ flex:1,background:C.bg,borderRadius:6,height:22,marginLeft:8,display:"flex",alignItems:"center",paddingLeft:10 }}>
              <span style={{ fontSize:11,color:C.textTertiary }}>resumeai.vercel.app/builder</span>
            </div>
          </div>
          <div style={{ padding:"2rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            <div style={{ background:C.bg,borderRadius:10,padding:"18px 20px",border:`1px solid ${C.border}` }}>
              <p style={{ fontSize:10,fontWeight:600,color:C.textTertiary,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 12px" }}>Work experience</p>
              <div style={{ background:C.bgSecondary,borderRadius:6,padding:"10px 12px",fontSize:12,color:C.textSecondary,lineHeight:1.6,marginBottom:10 }}>i worked at google for 3 years doing backend stuff and led a small team...</div>
              <div style={{ display:"flex",justifyContent:"flex-end" }}>
                <span style={{ fontSize:11,padding:"4px 12px",borderRadius:6,background:C.text,color:"#fff" }}>✦ Improve phrasing</span>
              </div>
            </div>
            <div style={{ background:C.bg,borderRadius:10,padding:"18px 20px",border:`1px solid ${C.border}` }}>
              <p style={{ fontSize:10,fontWeight:600,color:C.textTertiary,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 12px" }}>AI-improved</p>
              <div style={{ fontSize:12,color:C.text,lineHeight:1.7 }}>
                <p style={{ margin:"0 0 6px",fontWeight:500 }}>Senior Backend Engineer · Google</p>
                <p style={{ margin:"0 0 4px",color:C.textSecondary }}>• Led a cross-functional team of 5 engineers</p>
                <p style={{ margin:"0 0 4px",color:C.textSecondary }}>• Built APIs handling 10M+ daily requests</p>
                <p style={{ margin:0,color:C.textSecondary }}>• Reduced latency by 40% through optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:C.bgSecondary,padding:"5rem 1.5rem",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:860,margin:"0 auto" }}>
          <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase",letterSpacing:"0.09em",textAlign:"center",margin:"0 0 12px" }}>How it works</p>
          <h2 style={{ fontSize:"clamp(24px, 4vw, 36px)",fontWeight:600,textAlign:"center",margin:"0 0 48px",letterSpacing:"-0.5px" }}>From rough notes to polished resume<br/>in minutes</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:24 }}>
            {steps.map((s,i)=>(
              <div key={i} style={{ background:C.bg,borderRadius:12,padding:"24px",border:`1px solid ${C.border}` }}>
                <p style={{ fontSize:32,fontWeight:600,color:C.bgTertiary,margin:"0 0 14px",letterSpacing:"-1px" }}>{s.num}</p>
                <p style={{ fontSize:15,fontWeight:600,margin:"0 0 8px",letterSpacing:"-0.2px" }}>{s.title}</p>
                <p style={{ fontSize:13,color:C.textSecondary,margin:0,lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:"5rem 1.5rem",maxWidth:860,margin:"0 auto" }}>
        <p style={{ fontSize:11,fontWeight:600,color:C.textTertiary,textTransform:"uppercase",letterSpacing:"0.09em",textAlign:"center",margin:"0 0 12px" }}>Features</p>
        <h2 style={{ fontSize:"clamp(24px, 4vw, 36px)",fontWeight:600,textAlign:"center",margin:"0 0 48px",letterSpacing:"-0.5px" }}>Everything you need to land the job</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16 }}>
          {features.map((f,i)=>(
            <div key={i} style={{ background:C.bgSecondary,borderRadius:12,padding:"22px",border:`1px solid ${C.border}` }}>
              <p style={{ fontSize:20,margin:"0 0 12px" }}>{f.icon}</p>
              <p style={{ fontSize:14,fontWeight:600,margin:"0 0 6px",letterSpacing:"-0.2px" }}>{f.title}</p>
              <p style={{ fontSize:13,color:C.textSecondary,margin:0,lineHeight:1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:C.text,padding:"5rem 1.5rem",textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(24px, 4vw, 40px)",fontWeight:600,color:"#fff",margin:"0 0 16px",letterSpacing:"-0.5px" }}>Ready to build your resume?</h2>
        <p style={{ fontSize:16,color:"rgba(255,255,255,0.6)",margin:"0 0 32px" }}>Free forever. No account needed. Takes 5 minutes.</p>
        <button onClick={()=>router.push('/builder')}
          style={{ padding:"14px 32px",fontSize:16,fontWeight:500,borderRadius:10,cursor:"pointer",background:"#fff",border:"none",color:C.text,fontFamily:"inherit",letterSpacing:"-0.2px" }}>
          Build my resume →
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding:"2rem 1.5rem",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <span style={{ fontSize:14,fontWeight:600 }}>ResumeAI</span>
        <span style={{ fontSize:12,color:C.textTertiary }}>Free AI-powered resume builder</span>
      </div>
    </div>
  );
}