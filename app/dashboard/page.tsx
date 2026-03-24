"use client";
import { useState } from "react";
export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hallo! Ich bin Aura 👋 Deine KI-Assistentin der Zuriva Academy!" }]);
  const [input, setInput] = useState("");
  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => setMessages(m => [...m, { role: "bot", text: "Danke für deine Frage! Ich helfe dir gerne weiter." }]), 800);
  };
  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"DM Sans,sans-serif", background:"#F0F2F5" }}>
      <aside style={{ width:248, background:"white", borderRight:"0.5px solid #dce0e6", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"24px 22px 20px", borderBottom:"0.5px solid #dce0e6", display:"flex", alignItems:"baseline", gap:8 }}>
          <span style={{ fontFamily:"Georgia,serif", fontSize:21, fontWeight:700, letterSpacing:"0.12em", color:"#022350" }}>ZURIVA</span>
          <span style={{ fontSize:12, color:"#C8A24D" }}>academy</span>
        </div>
        {[["Dashboard",true],["Kurse",false],["Lernpfade",false],["Prüfungen",false],["Zertifikate",false],["Forum",false],["Analytics",false]].map(([name,active])=>(
          <div key={name} style={{ padding:"9px 22px", color:active?"#022350":"#4A4A5A", background:active?"#EEF5FF":"transparent", borderLeft:active?"2.5px solid #0FA4A0":"2.5px solid transparent", fontWeight:active?500:400, fontSize:13, cursor:"pointer" }}>{name}</div>
        ))}
        <div style={{ flex:1 }}/>
        <div style={{ padding:"14px 22px", borderTop:"0.5px solid #dce0e6", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#0FA4A0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:600, color:"white" }}>LM</div>
          <div><div style={{ fontSize:12.5, fontWeight:500, color:"#022350" }}>Laura Meier</div><div style={{ fontSize:11, color:"#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ background:"white", borderBottom:"0.5px solid #dce0e6", height:60, padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div><div style={{ fontSize:15, fontWeight:500, color:"#022350" }}>Guten Morgen, Laura 👋</div><div style={{ fontSize:12, color:"#9A9AAA" }}>Montag, 23. März 2026 · VBV-Frist in 99 Tagen</div></div>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"#0FA4A0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, color:"white" }}>LM</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:14 }}>
            {[["4","Aktive Kurse","↑ +1 diese Woche"],["342 Pts","Credits total","↑ +24 diese Woche"],["34 h","Lernzeit total","↑ +3.2h diese Woche"],["94 %","Quiz-Score","↓ –2% letzte Prüfung"]].map(([n,l,t],i)=>(
              <div key={i} style={{ background:"white", borderRadius:14, border:"0.5px solid #dce0e6", padding:"18px 20px" }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:34, fontWeight:500, color:"#022350", lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:12, color:"#4A4A5A", marginTop:2 }}>{l}</div>
                <div style={{ fontSize:11, fontWeight:500, marginTop:7, color:i===3?"#e74c3c":"#0FA4A0" }}>{t}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"#022350", borderRadius:16, padding:"24px 28px", marginBottom:14, display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#C8A24D", marginBottom:6 }}>VBV-Zertifizierung 2026</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:600, color:"white", marginBottom:12 }}>Dein Lernfortschritt</div>
              <div style={{ background:"rgba(255,255,255,0.12)", height:3, borderRadius:2, marginBottom:8 }}><div style={{ height:3, borderRadius:2, background:"#0FA4A0", width:"57%" }}/></div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>342 von 600 Credits · Frist: 30. Juni 2026</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:52, fontWeight:500, color:"#C8A24D", lineHeight:1 }}>342</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,0.3)" }}>/ 600 Credits</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap:14 }}>
            {[
              { img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", tag:"Nicht-Leben", title:"Grundlagen Sachversicherung", p:68 },
              { img:"https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", tag:"Leben", title:"Lebensversicherungen", p:33 },
              { img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", tag:"Fähigkeiten", title:"Beratungskompetenz", p:85 },
            ].map((c,i)=>(
              <div key={i} style={{ borderRadius:14, overflow:"hidden", position:"relative", minHeight:200, cursor:"pointer" }}>
                <img src={c.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0, filter:"brightness(0.45)" }}/>
                <div style={{ position:"absolute", inset:0, padding:"12px 14px 14px", display:"flex", flexDirection:"column", justifyContent:"flex-end", background:"linear-gradient(to top,rgba(2,25,60,0.9) 0%,transparent 50%)" }}>
                  <div style={{ position:"absolute", top:10, left:12, background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.9)", fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:20 }}>{c.tag}</div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:15, fontWeight:600, color:"white", marginBottom:6 }}>{c.title}</div>
                  <div style={{ background:"rgba(255,255,255,0.2)", height:3, borderRadius:2, marginBottom:3 }}><div style={{ height:3, borderRadius:2, background:"#0FA4A0", width:`${c.p}%` }}/></div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:10.5, color:"rgba(255,255,255,0.5)" }}><span>Fortschritt</span><span style={{ color:"white" }}>{c.p}%</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {chatOpen && (
        <div style={{ position:"fixed", top:0, right:0, width:400, height:"100vh", background:"white", borderLeft:"0.5px solid #dce0e6", boxShadow:"-8px 0 40px rgba(2,35,80,0.15)", zIndex:999999, display:"flex", flexDirection:"column" }}>
          <div style={{ background:"#022350", padding:"18px 20px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ flex:1 }}><div style={{ fontSize:15, fontWeight:600, color:"white" }}>Aura</div><div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>● Online</div></div>
            <div onClick={()=>setChatOpen(false)} style={{ color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:22 }}>×</div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:10 }}>
            {messages.map((m,i)=>(
              <div key={i} style={{ maxWidth:"85%", fontSize:13.5, padding:"10px 13px", borderRadius:m.role==="bot"?"4px 14px 14px 14px":"14px 4px 14px 14px", background:m.role==="bot"?"#f0f2f5":"#022350", color:m.role==="bot"?"#1A1A2E":"white", alignSelf:m.role==="bot"?"flex-start":"flex-end" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ borderTop:"0.5px solid #dce0e6", padding:"12px 16px", display:"flex", gap:8 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder="Frage Aura..." style={{ flex:1, border:"none", outline:"none", fontSize:14 }}/>
            <button onClick={sendMsg} style={{ width:34, height:34, borderRadius:8, background:"#0FA4A0", border:"none", cursor:"pointer", color:"white" }}>→</button>
          </div>
        </div>
      )}
      <div onClick={()=>setChatOpen(!chatOpen)} style={{ position:"fixed", bottom:28, right:28, width:60, height:60, borderRadius:"50%", background:"#022350", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, cursor:"pointer", boxShadow:"0 4px 18px rgba(2,35,80,0.3)", zIndex:99999 }}>🤖</div>
    </div>
  );
}