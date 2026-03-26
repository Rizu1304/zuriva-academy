"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Phone, Play, CheckCircle, Clock, Star, ChevronRight, Volume2, Target, BookOpen, Award } from "lucide-react";

interface Lektion {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "übung" | "rollenspiel" | "quiz";
  completed: boolean;
  tips?: string[];
}

interface Modul {
  id: string;
  title: string;
  description: string;
  lektionen: Lektion[];
}

const module: Modul[] = [
  {
    id: "m1", title: "Grundlagen Telefonkommunikation", description: "Die Basis für professionelle Telefongespräche",
    lektionen: [
      { id: "l1", title: "Die perfekte Begrüssung", description: "Wie du in den ersten 10 Sekunden überzeugst", duration: "8 Min.", type: "video", completed: true, tips: ["Lächle beim Telefonieren - man hört es", "Nenne deinen Namen und die Firma klar", "Frage ob es gerade passt"] },
      { id: "l2", title: "Stimme und Tonlage", description: "Deine Stimme als Werkzeug einsetzen", duration: "10 Min.", type: "video", completed: true, tips: ["Spreche etwas tiefer als normal", "Variiere das Tempo", "Pausen bewusst einsetzen"] },
      { id: "l3", title: "Aktives Zuhören am Telefon", description: "Signale senden ohne Augenkontakt", duration: "6 Min.", type: "video", completed: true },
      { id: "l4", title: "Übung: Begrüssung aufnehmen", description: "Nimm deine eigene Begrüssung auf und bewerte sie", duration: "15 Min.", type: "übung", completed: false },
      { id: "l5", title: "Quiz: Grundlagen", description: "Teste dein Wissen", duration: "5 Min.", type: "quiz", completed: false },
    ],
  },
  {
    id: "m2", title: "Kaltakquise meistern", description: "Neue Kunden am Telefon gewinnen",
    lektionen: [
      { id: "l6", title: "Vorbereitung ist alles", description: "Recherche und Gesprächsleitfaden erstellen", duration: "12 Min.", type: "video", completed: false, tips: ["Recherchiere den Kunden vorher", "Erstelle einen Leitfaden, aber lies nicht ab", "Bereite 3 mögliche Einwände vor"] },
      { id: "l7", title: "Der Türöffner-Satz", description: "In 15 Sekunden Interesse wecken", duration: "8 Min.", type: "video", completed: false },
      { id: "l8", title: "Einwände am Telefon behandeln", description: "Die häufigsten Einwände und wie du reagierst", duration: "15 Min.", type: "video", completed: false, tips: ["'Ich habe keine Zeit' → 'Wann passt es Ihnen besser?'", "'Kein Interesse' → 'Darf ich fragen, was genau Sie nicht interessiert?'", "'Schicken Sie Unterlagen' → 'Gerne, darf ich kurz klären was für Sie relevant ist?'"] },
      { id: "l9", title: "Rollenspiel: Kaltakquise", description: "Übe mit einem Kollegen oder Aura", duration: "20 Min.", type: "rollenspiel", completed: false },
      { id: "l10", title: "Quiz: Kaltakquise", description: "Teste dein Wissen", duration: "5 Min.", type: "quiz", completed: false },
    ],
  },
  {
    id: "m3", title: "Terminvereinbarung", description: "Vom Telefonat zum Termin",
    lektionen: [
      { id: "l11", title: "Den richtigen Moment erkennen", description: "Wann ist der Kunde bereit für einen Termin?", duration: "8 Min.", type: "video", completed: false },
      { id: "l12", title: "Alternativfragen nutzen", description: "'Passt Ihnen Dienstag oder Donnerstag besser?'", duration: "6 Min.", type: "video", completed: false },
      { id: "l13", title: "Verbindliche Terminbestätigung", description: "So sicherst du den Termin ab", duration: "5 Min.", type: "video", completed: false },
      { id: "l14", title: "Rollenspiel: Terminvereinbarung", description: "Vom Erstgespräch zum festen Termin", duration: "15 Min.", type: "rollenspiel", completed: false },
      { id: "l15", title: "Abschlussquiz Telefontraining", description: "Zeige was du gelernt hast", duration: "10 Min.", type: "quiz", completed: false },
    ],
  },
];

const typeIcon = (type: string) => {
  switch (type) {
    case "video": return <Play size={14} />;
    case "übung": return <Volume2 size={14} />;
    case "rollenspiel": return <Phone size={14} />;
    case "quiz": return <Target size={14} />;
    default: return <BookOpen size={14} />;
  }
};

const typeColor = (type: string) => {
  switch (type) {
    case "video": return "#C8A24D";
    case "übung": return "#1B6FC2";
    case "rollenspiel": return "#0FA4A0";
    case "quiz": return "#022350";
    default: return "#4A5568";
  }
};

export default function Telefontraining() {
  const [activeModul, setActiveModul] = useState(0);
  const [activeLektion, setActiveLektion] = useState<string | null>(null);

  const totalLektionen = module.reduce((s, m) => s + m.lektionen.length, 0);
  const completedLektionen = module.reduce((s, m) => s + m.lektionen.filter(l => l.completed).length, 0);
  const progress = Math.round((completedLektionen / totalLektionen) * 100);

  const selectedLektion = activeLektion ? module.flatMap(m => m.lektionen).find(l => l.id === activeLektion) : null;

  return (
    <DashboardLayout title="Telefontraining" subtitle="Professionelle Telefongespräche führen">

      {/* Stats */}
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Fortschritt", value: `${progress}%`, icon: <Target size={16} />, color: "#0FA4A0" },
          { label: "Lektionen", value: `${completedLektionen}/${totalLektionen}`, icon: <BookOpen size={16} />, color: "#022350" },
          { label: "Module", value: `${module.length}`, icon: <Phone size={16} />, color: "#C8A24D" },
          { label: "Geschätzte Zeit", value: "2.5h", icon: <Clock size={16} />, color: "#1B6FC2" },
        ].map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `${s.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
            <div>
              <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        {/* Left: Module */}
        <div>
          {module.map((m, mi) => {
            const mDone = m.lektionen.every(l => l.completed);
            const mStarted = m.lektionen.some(l => l.completed);
            return (
              <div key={m.id} className="z-card" style={{ padding: "20px 22px", marginBottom: 10, cursor: "pointer", borderLeft: mi === activeModul ? "3px solid #C8A24D" : "3px solid transparent", background: mi === activeModul ? "rgba(200,162,77,0.03)" : undefined }} onClick={() => setActiveModul(mi)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: mDone ? "#0FA4A0" : mi === activeModul ? "#C8A24D" : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {mDone ? <CheckCircle size={14} color="white" /> : <span style={{ fontSize: 12, fontWeight: 700, color: mi === activeModul ? "white" : "#9CA3AF" }}>{mi + 1}</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{m.title}</div>
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", paddingLeft: 38 }}>{m.lektionen.length} Lektionen · {m.lektionen.filter(l => l.completed).length} erledigt</div>
              </div>
            );
          })}
        </div>

        {/* Right: Lektionen */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>{module[activeModul].title}</div>
            <div style={{ fontSize: 13, color: "#4A5568" }}>{module[activeModul].description}</div>
          </div>

          {module[activeModul].lektionen.map(lek => (
            <div key={lek.id} className="z-card" style={{ padding: "20px 24px", marginBottom: 8, cursor: "pointer", borderLeft: activeLektion === lek.id ? "3px solid #C8A24D" : "3px solid transparent" }} onClick={() => setActiveLektion(activeLektion === lek.id ? null : lek.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {lek.completed ? <CheckCircle size={18} color="#0FA4A0" /> : <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(2,35,80,0.15)" }} />}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{lek.title}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{lek.description}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="z-badge" style={{ background: `${typeColor(lek.type)}10`, color: typeColor(lek.type) }}>
                    {typeIcon(lek.type)} {lek.type === "übung" ? "Übung" : lek.type === "rollenspiel" ? "Rollenspiel" : lek.type === "quiz" ? "Quiz" : "Video"}
                  </span>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{lek.duration}</span>
                </div>
              </div>

              {/* Expanded Tips */}
              {activeLektion === lek.id && lek.tips && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(2,35,80,0.04)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#C8A24D", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Tipps</div>
                  {lek.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <Star size={12} color="#C8A24D" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
