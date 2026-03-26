"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ExternalLink, BookOpen, Award, ChevronRight, Search, Building, Shield, Heart, Car, Umbrella, Star, Users } from "lucide-react";

interface PartnerProdukt {
  name: string;
  category: string;
  description: string;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
  schulungen: number;
  produkte: PartnerProdukt[];
  color: string;
  rating: number;
}

const categories = ["Alle", "Nicht-Leben", "Leben", "Kranken", "Motorfahrzeug", "Rechtsschutz"];

const partners: Partner[] = [
  {
    id: "1", name: "Helvetia", logo: "HV", category: "Nicht-Leben", color: "#C0392B",
    description: "Einer der führenden Schweizer Versicherungskonzerne. Starke Produkte in Sach, Haftpflicht und Motorfahrzeug.",
    website: "helvetia.ch", schulungen: 8, rating: 4.8,
    produkte: [
      { name: "Gebäudeversicherung Plus", category: "Sach", description: "Erweiterte Deckung inkl. Elementarschäden" },
      { name: "Privathaftpflicht Comfort", category: "Haftpflicht", description: "Deckungssumme bis 10 Mio. CHF" },
      { name: "KMU-Paket Business", category: "Gewerbe", description: "All-in-One für kleine Unternehmen" },
      { name: "Motorfahrzeug Kasko", category: "MF", description: "Voll- und Teilkasko mit Bonusschutz" },
    ],
  },
  {
    id: "2", name: "Zurich", logo: "ZU", category: "Nicht-Leben", color: "#1B6FC2",
    description: "Global tätiger Versicherungskonzern mit umfassendem Produktportfolio für Privat- und Geschäftskunden.",
    website: "zurich.ch", schulungen: 12, rating: 4.7,
    produkte: [
      { name: "Hausrat Optimal", category: "Sach", description: "Hausratversicherung mit Wertsachendeckung" },
      { name: "Betriebshaftpflicht", category: "Haftpflicht", description: "Für Gewerbe und Industrie" },
      { name: "Cyber-Versicherung", category: "Cyber", description: "Schutz vor digitalen Risiken" },
      { name: "Reiseversicherung", category: "Reise", description: "Weltweiter Reiseschutz" },
    ],
  },
  {
    id: "3", name: "Swiss Life", logo: "SL", category: "Leben", color: "#022350",
    description: "Marktführer in der Lebensversicherung und Vorsorge. Spezialist für Säule 2 und 3.",
    website: "swisslife.ch", schulungen: 10, rating: 4.9,
    produkte: [
      { name: "Swiss Life Säule 3a", category: "Vorsorge", description: "Gebundene Vorsorge mit Steuervorteilen" },
      { name: "Risiko-Lebensversicherung", category: "Leben", description: "Todesfallschutz ab CHF 15/Mt." },
      { name: "BVG Sammelstiftung", category: "BVG", description: "Berufliche Vorsorge für KMU" },
      { name: "Erwerbsunfähigkeit", category: "EU", description: "Einkommensschutz bei Krankheit" },
    ],
  },
  {
    id: "4", name: "AXA", logo: "AX", category: "Nicht-Leben", color: "#0FA4A0",
    description: "Grösster Allbranchenversicherer der Schweiz. Stark in Sach, Leben und Gesundheit.",
    website: "axa.ch", schulungen: 14, rating: 4.6,
    produkte: [
      { name: "Haushalt Kombi", category: "Sach", description: "Hausrat + Haftpflicht in einem" },
      { name: "Vorsorgepolitik 3a", category: "Vorsorge", description: "Flexible 3a-Lösung mit Fondswahl" },
      { name: "KTG Krankentaggeld", category: "KTG", description: "Krankentaggeldversicherung für Arbeitgeber" },
      { name: "Rechtsschutz Privat", category: "Recht", description: "Rechtsschutz für die ganze Familie" },
    ],
  },
  {
    id: "5", name: "Mobiliar", logo: "MO", category: "Nicht-Leben", color: "#C8A24D",
    description: "Genossenschaftlich organisiert. Sehr stark im Schadengeschäft und Kundenservice.",
    website: "mobiliar.ch", schulungen: 6, rating: 4.7,
    produkte: [
      { name: "Gebäudeversicherung", category: "Sach", description: "Feuer und Elementar" },
      { name: "Wertsachenversicherung", category: "Sach", description: "Schmuck, Uhren, Kunst" },
      { name: "Betriebsunterbrechung", category: "BU", description: "Ertragsausfall für Gewerbe" },
    ],
  },
  {
    id: "6", name: "CSS", logo: "CS", category: "Kranken", color: "#0FA4A0",
    description: "Spezialisiert auf Krankenversicherung. Grund- und Zusatzversicherungen.",
    website: "css.ch", schulungen: 5, rating: 4.5,
    produkte: [
      { name: "Grundversicherung KVG", category: "KVG", description: "Obligatorische Krankenpflegeversicherung" },
      { name: "Spitalzusatz halbprivat", category: "Zusatz", description: "Halbprivate Abteilung schweizweit" },
      { name: "Zahnversicherung", category: "Zusatz", description: "Zahnbehandlungen und Prophylaxe" },
    ],
  },
  {
    id: "7", name: "Baloise", logo: "BA", category: "Nicht-Leben", color: "#1B6FC2",
    description: "Traditionsreicher Basler Versicherer. Spezialist für Privat- und KMU-Kunden.",
    website: "baloise.ch", schulungen: 7, rating: 4.4,
    produkte: [
      { name: "Hausrat All Risk", category: "Sach", description: "Volldeckung für Haushalt" },
      { name: "Motorfahrzeug Eco", category: "MF", description: "Günstige MF-Versicherung" },
      { name: "Mietkaution", category: "Miet", description: "Alternative zur Barkaution" },
    ],
  },
  {
    id: "8", name: "Allianz", logo: "AL", category: "Leben", color: "#022350",
    description: "Internationaler Versicherer mit starker Schweizer Präsenz. Leben und Vorsorge.",
    website: "allianz.ch", schulungen: 9, rating: 4.5,
    produkte: [
      { name: "Fondsgebundene LV", category: "Leben", description: "Anlagegebundene Lebensversicherung" },
      { name: "Säule 3a Premium", category: "Vorsorge", description: "Vorsorge mit höherer Rendite" },
      { name: "UVG-Lösung", category: "UVG", description: "Unfallversicherung für Arbeitgeber" },
    ],
  },
];

export default function PartnerPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Alle");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const filtered = partners.filter(p => {
    if (filterCat !== "Alle" && p.category !== filterCat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout title="Versicherungspartner" subtitle="Unsere Partner und ihre Produkte kennenlernen">

      {/* Stats */}
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Partner", value: partners.length, icon: <Building size={16} />, color: "#022350" },
          { label: "Produkte", value: partners.reduce((s, p) => s + p.produkte.length, 0), icon: <Shield size={16} />, color: "#0FA4A0" },
          { label: "Schulungen", value: partners.reduce((s, p) => s + p.schulungen, 0), icon: <BookOpen size={16} />, color: "#C8A24D" },
          { label: "Ø Bewertung", value: (partners.reduce((s, p) => s + p.rating, 0) / partners.length).toFixed(1), icon: <Star size={16} />, color: "#C8A24D" },
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

      {/* Filter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filterCat === c ? "#022350" : "rgba(2,35,80,0.08)", background: filterCat === c ? "#022350" : "transparent", color: filterCat === c ? "white" : "#4A5568", fontSize: 12, fontWeight: filterCat === c ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(255,255,255,0.50)", border: "1px solid rgba(2,35,80,0.08)" }}>
          <Search size={14} color="#9CA3AF" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Partner suchen..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", width: 160, color: "#022350" }} />
        </div>
      </div>

      {/* Partner Grid */}
      <div className="z-grid-2" style={{ gap: 16 }}>
        {filtered.map((partner, i) => (
          <div key={partner.id} className={`z-card animate-scale-in stagger-${Math.min(i + 1, 8)}`} style={{ padding: "24px 28px", cursor: "pointer" }} onClick={() => setSelectedPartner(selectedPartner?.id === partner.id ? null : partner)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${partner.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: partner.color }}>{partner.logo}</div>
                <div>
                  <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "#022350" }}>{partner.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span className="z-badge" style={{ background: `${partner.color}10`, color: partner.color }}>{partner.category}</span>
                    <span style={{ fontSize: 11, color: "#C8A24D", display: "flex", alignItems: "center", gap: 2 }}><Star size={10} fill="#C8A24D" /> {partner.rating}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#9CA3AF" style={{ transform: selectedPartner?.id === partner.id ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
            </div>

            <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5, marginBottom: 14 }}>{partner.description}</div>

            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9CA3AF" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={12} /> {partner.schulungen} Schulungen</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Shield size={12} /> {partner.produkte.length} Produkte</span>
            </div>

            {/* Expanded: Products */}
            {selectedPartner?.id === partner.id && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(2,35,80,0.06)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#C8A24D", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Produkte</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {partner.produkte.map((p, pi) => (
                    <div key={pi} style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(2,35,80,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF" }}>{p.category} · {p.description}</div>
                      </div>
                      <button className="z-btn z-btn-ghost" style={{ fontSize: 11, padding: "5px 10px" }}>Details</button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <button className="z-btn z-btn-primary" style={{ fontSize: 12, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <BookOpen size={14} /> Schulungen starten
                  </button>
                  <button className="z-btn z-btn-ghost" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <ExternalLink size={14} /> {partner.website}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
