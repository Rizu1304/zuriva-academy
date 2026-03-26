"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ChevronLeft, ChevronRight, Clock, Target, BookOpen, Award, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";

interface CalEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: "exam" | "deadline" | "lesson" | "cert" | "reminder";
  color: string;
  description?: string;
}

const events: CalEvent[] = [
  { id: "1", title: "Sachversicherung Modul 3 Quiz", date: "2026-03-28", time: "10:00", type: "exam", color: "#C0392B", description: "Prüfung Risikobewertung und Prämien" },
  { id: "2", title: "Lebensversicherung Modul starten", date: "2026-03-30", type: "lesson", color: "#022350", description: "Säule 3a/3b beginnen" },
  { id: "3", title: "Compliance Webinar", date: "2026-04-02", time: "14:00", type: "lesson", color: "#1B6FC2", description: "Live-Webinar FIDLEG Update" },
  { id: "4", title: "Beratungstechniken Quiz", date: "2026-04-05", time: "09:00", type: "exam", color: "#C0392B", description: "Abschlussquiz Beratungskompetenz" },
  { id: "5", title: "Lebensversicherung Abschlussprüfung", date: "2026-04-15", time: "10:00", type: "exam", color: "#C0392B", description: "Bestehensgrenze 75%" },
  { id: "6", title: "Haftpflicht Modul starten", date: "2026-04-20", type: "lesson", color: "#022350" },
  { id: "7", title: "VBV Zwischenbericht", date: "2026-05-01", type: "deadline", color: "#C8A24D", description: "Mindestens 400 Credits erreicht" },
  { id: "8", title: "Compliance Update Pflichtmodul", date: "2026-05-15", type: "deadline", color: "#C0392B", description: "Jährliches Pflichtmodul" },
  { id: "9", title: "VBV Abschlussprüfung", date: "2026-06-10", time: "09:00", type: "exam", color: "#C0392B", description: "Die grosse Abschlussprüfung" },
  { id: "10", title: "VBV-Frist", date: "2026-06-30", type: "deadline", color: "#C0392B", description: "600 Credits müssen erreicht sein" },
  { id: "11", title: "Trainee Zertifikat erhalten", date: "2026-03-18", type: "cert", color: "#0FA4A0", description: "Grundausbildung abgeschlossen" },
  { id: "12", title: "Sachversicherung Slides", date: "2026-03-26", type: "lesson", color: "#022350", description: "Prämienberechnung lernen" },
  { id: "13", title: "Streak-Bonus 14 Tage", date: "2026-03-31", type: "reminder", color: "#C8A24D", description: "Noch 2 Tage bis zum Bonus!" },
];

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const typeIcon = (type: string) => {
  switch (type) {
    case "exam": return <Target size={14} />;
    case "deadline": return <AlertTriangle size={14} />;
    case "lesson": return <BookOpen size={14} />;
    case "cert": return <Award size={14} />;
    default: return <Clock size={14} />;
  }
};

const typeLabel = (type: string) => {
  switch (type) {
    case "exam": return "Prüfung";
    case "deadline": return "Frist";
    case "lesson": return "Lektion";
    case "cert": return "Zertifikat";
    default: return "Erinnerung";
  }
};

export default function Kalender() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 26)); // March 2026
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-03-26");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const dateStr = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const getEvents = (day: number) => events.filter(e => e.date === dateStr(day));
  const selectedEvents = selectedDate ? events.filter(e => e.date === selectedDate) : [];

  const upcomingEvents = events
    .filter(e => e.date >= "2026-03-26")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  const isToday = (day: number) => dateStr(day) === "2026-03-26";

  return (
    <DashboardLayout title="Kalender" subtitle="Prüfungen, Lernplan und Deadlines">

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>

        {/* Calendar Grid */}
        <div>
          <div className="z-card" style={{ padding: "28px 32px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button onClick={prevMonth} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: "rgba(2,35,80,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronLeft size={18} color="#022350" />
              </button>
              <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: "#022350" }}>
                {MONTHS[month]} {year}
              </div>
              <button onClick={nextMonth} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: "rgba(2,35,80,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronRight size={18} color="#022350" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
              {WEEKDAYS.map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#9CA3AF", padding: "8px 0", textTransform: "uppercase", letterSpacing: 0.5 }}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {days.map((day, i) => {
                if (!day) return <div key={i} />;
                const dayEvents = getEvents(day);
                const isSelected = selectedDate === dateStr(day);
                const today = isToday(day);

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(dateStr(day))}
                    style={{
                      padding: "8px 4px",
                      borderRadius: 12,
                      cursor: "pointer",
                      background: isSelected ? "#022350" : today ? "rgba(200,162,77,0.08)" : "transparent",
                      border: today && !isSelected ? "1px solid rgba(200,162,77,0.3)" : "1px solid transparent",
                      textAlign: "center",
                      minHeight: 60,
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: today ? 700 : 400, color: isSelected ? "white" : today ? "#C8A24D" : "#022350", marginBottom: 4 }}>{day}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                      {dayEvents.slice(0, 3).map(ev => (
                        <div key={ev.id} style={{ width: 6, height: 6, borderRadius: "50%", background: isSelected ? "rgba(255,255,255,0.6)" : ev.color }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(2,35,80,0.04)" }}>
              {[
                { color: "#C0392B", label: "Prüfung / Frist" },
                { color: "#022350", label: "Lektion" },
                { color: "#C8A24D", label: "Erinnerung" },
                { color: "#0FA4A0", label: "Zertifikat" },
              ].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#4A5568" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Events */}
          {selectedDate && selectedEvents.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", marginBottom: 10 }}>
                {new Date(selectedDate + "T00:00:00").toLocaleDateString("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </div>
              {selectedEvents.map(ev => (
                <div key={ev.id} className="z-card" style={{ padding: "18px 22px", marginBottom: 8, borderLeft: `3px solid ${ev.color}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${ev.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: ev.color, flexShrink: 0 }}>
                    {typeIcon(ev.type)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                      {ev.time && <span>{ev.time} · </span>}{typeLabel(ev.type)}
                    </div>
                    {ev.description && <div style={{ fontSize: 12, color: "#4A5568", marginTop: 4 }}>{ev.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar: Upcoming */}
        <div>
          <div className="z-card" style={{ padding: "24px 22px", position: "sticky", top: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <CalendarIcon size={16} color="#C8A24D" />
              <div className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: "#022350" }}>Nächste Termine</div>
            </div>
            <div className="z-gold-line" style={{ marginBottom: 16 }} />

            {upcomingEvents.map((ev, i) => (
              <div key={ev.id} onClick={() => setSelectedDate(ev.date)} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < upcomingEvents.length - 1 ? "1px solid rgba(2,35,80,0.04)" : "none", cursor: "pointer" }}>
                <div style={{ width: 40, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: ev.color, lineHeight: 1 }}>{ev.date.split("-")[2]}</div>
                  <div style={{ fontSize: 9, color: "#9CA3AF", textTransform: "uppercase", fontWeight: 600 }}>{MONTHS[parseInt(ev.date.split("-")[1]) - 1]?.slice(0, 3)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#022350", lineHeight: 1.3 }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    {typeIcon(ev.type)} {typeLabel(ev.type)}{ev.time && ` · ${ev.time}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
