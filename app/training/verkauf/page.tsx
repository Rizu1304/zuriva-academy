"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, Play, CheckCircle, Clock, Target, BookOpen, Star, Users, Award } from "lucide-react";

interface Lektion {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "übung" | "rollenspiel" | "quiz";
  completed: boolean;
  keyPoints?: string[];
}

interface Modul {
  id: string;
  title: string;
  description: string;
  lektionen: Lektion[];
}

const module: Modul[] = [
  {
    id: "m1", title: "Bedarfsanalyse", description: "Den Kunden verstehen bevor du verkaufst",
    lektionen: [
      { id: "l1", title: "Die richtigen Fragen stellen", description: "Offene vs. geschlossene Fragen im Verkaufsgespräch", duration: "10 Min.", type: "video", completed: true, keyPoints: ["Was genau möchten Sie absichern?", "Welche Versicherungen haben Sie aktuell?", "Was ist Ihnen bei einer Versicherung am wichtigsten?"] },
      { id: "l2", title: "Bedürfnisse erkennen und priorisieren", description: "Zwischen Wunsch und echtem Bedarf unterscheiden", duration: "12 Min.", type: "video", completed: true },
      { id: "l3", title: "Die Lebenssituation verstehen", description: "Familie, Beruf, Vermögen als Entscheidungsfaktoren", duration: "8 Min.", type: "video", completed: false },
      { id: "l4", title: "Übung: Bedarfsanalyse durchführen", description: "Analysiere einen Beispielkunden", duration: "20 Min.", type: "übung", completed: false },
      { id: "l5", title: "Quiz: Bedarfsanalyse", description: "Teste dein Wissen", duration: "5 Min.", type: "quiz", completed: false },
    ],
  },
  {
    id: "m2", title: "Angebotspräsentation", description: "Produkte überzeugend präsentieren",
    lektionen: [
      { id: "l6", title: "Nutzen statt Merkmale", description: "Der Kunde kauft den Nutzen, nicht das Produkt", duration: "10 Min.", type: "video", completed: false, keyPoints: ["Nicht: 'Die Police hat eine Deckungssumme von 5 Mio.'", "Sondern: 'Ihre Familie ist bis 5 Mio. geschützt'", "Immer fragen: Was hat der Kunde davon?"] },
      { id: "l7", title: "Vergleiche richtig einsetzen", description: "Bestehende vs. neue Lösung aufzeigen", duration: "8 Min.", type: "video", completed: false },
      { id: "l8", title: "Mit Zahlen überzeugen", description: "Prämien, Deckungen und Sparpotenzial", duration: "10 Min.", type: "video", completed: false },
      { id: "l9", title: "Rollenspiel: Angebot präsentieren", description: "Übe die Präsentation eines Angebots", duration: "20 Min.", type: "rollenspiel", completed: false },
    ],
  },
  {
    id: "m3", title: "Einwandbehandlung", description: "Einwände in Chancen verwandeln",
    lektionen: [
      { id: "l10", title: "Die 5 häufigsten Einwände", description: "Zu teuer, kein Bedarf, muss überlegen, bin zufrieden, keine Zeit", duration: "12 Min.", type: "video", completed: false, keyPoints: ["'Zu teuer' → Wert aufzeigen, nicht Preis verteidigen", "'Kein Bedarf' → Risiken bewusst machen", "'Muss überlegen' → Was genau möchten Sie überlegen?", "'Bin zufrieden' → Darf ich fragen, wann Sie das letzte Mal verglichen haben?"] },
      { id: "l11", title: "Die Bumerang-Technik", description: "Den Einwand zum Verkaufsargument machen", duration: "8 Min.", type: "video", completed: false },
      { id: "l12", title: "Rollenspiel: Einwände behandeln", description: "Übe mit verschiedenen Szenarien", duration: "20 Min.", type: "rollenspiel", completed: false },
      { id: "l13", title: "Quiz: Einwandbehandlung", description: "Teste dein Wissen", duration: "5 Min.", type: "quiz", completed: false },
    ],
  },
  {
    id: "m4", title: "Abschluss", description: "Den Verkauf sicher abschliessen",
    lektionen: [
      { id: "l14", title: "Kaufsignale erkennen", description: "Wann ist der Kunde bereit?", duration: "8 Min.", type: "video", completed: false },
      { id: "l15", title: "Abschlusstechniken", description: "Alternativabschluss, Zusammenfassung, Direkt", duration: "10 Min.", type: "video", completed: false, keyPoints: ["Alternativ: 'Möchten Sie die Basis- oder die Premium-Deckung?'", "Zusammenfassung: 'Zusammengefasst erhalten Sie... Soll ich das so einrichten?'", "Direkt: 'Sollen wir den Vertrag heute noch aufsetzen?'"] },
      { id: "l16", title: "Nach dem Abschluss", description: "Empfehlungen generieren und Kundenbindung", duration: "6 Min.", type: "video", completed: false },
      { id: "l17", title: "Rollenspiel: Abschlussgespräch", description: "Vom Angebot zum Abschluss", duration: "20 Min.", type: "rollenspiel", completed: false },
      { id: "l18", title: "Abschlussquiz Verkaufstraining", description: "Die grosse Abschlussprüfung", duration: "10 Min.", type: "quiz", completed: false },
    ],
  },
];

const typeColor = (type: string) => type === "video" ? "#C8A24D" : type === "übung" ? "#1B6FC2" : type === "rollenspiel" ? "#0FA4A0" : "#022350";
const typeLabel = (type: string) => type === "übung" ? "Übung" : type === "rollenspiel" ? "Rollenspiel" : type === "quiz" ? "Quiz" : "Video";

export default function Verkaufstraining() {
  const [activeModul, setActiveModul] = useState(0);
  const [activeLektion, setActiveLektion] = useState<string | null>(null);

  const totalL = module.reduce((s, m) => s + m.lektionen.length, 0);
  const doneL = module.reduce((s, m) => s + m.lektionen.filter(l => l.completed).length, 0);

  return (
    <DashboardLayout title="Verkaufstraining" subtitle="Vom Erstgespräch zum Abschluss">
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Fortschritt", value: `${Math.round((doneL / totalL) * 100)}%`, icon: <Target size={16} />, color: "#0FA4A0" },
          { label: "Lektionen", value: `${doneL}/${totalL}`, icon: <BookOpen size={16} />, color: "#022350" },
          { label: "Module", value: `${module.length}`, icon: <TrendingUp size={16} />, color: "#C8A24D" },
          { label: "Geschätzte Zeit", value: "3.5h", icon: <Clock size={16} />, color: "#1B6FC2" },
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
        <div>
          {module.map((m, mi) => {
            const mDone = m.lektionen.every(l => l.completed);
            return (
              <div key={m.id} className="z-card" style={{ padding: "20px 22px", marginBottom: 10, cursor: "pointer", borderLeft: mi === activeModul ? "3px solid #C8A24D" : "3px solid transparent", background: mi === activeModul ? "rgba(200,162,77,0.03)" : undefined }} onClick={() => setActiveModul(mi)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: mDone ? "#0FA4A0" : mi === activeModul ? "#C8A24D" : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {mDone ? <CheckCircle size={14} color="white" /> : <span style={{ fontSize: 12, fontWeight: 700, color: mi === activeModul ? "white" : "#9CA3AF" }}>{mi + 1}</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{m.title}</div>
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", paddingLeft: 38 }}>{m.lektionen.length} Lektionen</div>
              </div>
            );
          })}
        </div>

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
                  <span className="z-badge" style={{ background: `${typeColor(lek.type)}10`, color: typeColor(lek.type) }}>{typeLabel(lek.type)}</span>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{lek.duration}</span>
                </div>
              </div>
              {activeLektion === lek.id && lek.keyPoints && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(2,35,80,0.04)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#C8A24D", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Wichtige Punkte</div>
                  {lek.keyPoints.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <Star size={12} color="#C8A24D" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{p}</span>
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
