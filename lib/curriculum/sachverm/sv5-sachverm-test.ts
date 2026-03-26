import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv5", title: "VBV Sach und Vermögen Test", description: "Prüfungssimulation Nicht-Leben", credits: 25, lektionen: [
  { id: "sv5-1", title: "Prüfungsvorbereitung Nicht-Leben", type: "text", duration: "10 Min.", completed: false, content: { type: "text", paragraphs: [
    "Die VBV-Prüfung Nicht-Leben ist eine Online-Fernprüfung mit Proctoring. Dauer: 60 Minuten. Kosten: CHF 100.",
    "Themen: Gebäudeversicherung, Hausrat, Haftpflicht, Motorfahrzeug, Betriebsversicherung, Schadenabwicklung.",
    "Format: Wissens- und Verständnisfragen sowie geleitete Fallbearbeitung.",
  ] } },
  { id: "sv5-2", title: "Probequiz Nicht-Leben", type: "quiz", duration: "60 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Wie viele Kantone haben ein Gebäudeversicherungsmonopol?", options: ["7", "13", "19", "26"], correctIndex: 2, explanation: "19 von 26 Kantonen." },
    { text: "Was ist GUSTAVO?", options: ["Versicherungsprodukt", "7 Kantone ohne Monopol", "Prämienformel", "Versicherer"], correctIndex: 1, explanation: "GE, UR, SZ, TI, AI, VS, OW." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Zahlung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Proportionale Leistungskürzung." },
    { text: "Mindestdeckung MF-Haftpflicht Personen?", options: ["CHF 1 Mio.", "CHF 5 Mio.", "CHF 10 Mio.", "CHF 100 Mio."], correctIndex: 1, explanation: "CHF 5 Mio. gesetzliches Minimum." },
    { text: "Was deckt Vollkasko zusätzlich zur Teilkasko?", options: ["Diebstahl", "Selbstverschuldete Kollision", "Glasbruch", "Elementar"], correctIndex: 1, explanation: "Selbstverschuldete Kollisionsschäden." },
    { text: "Nr. 1 Risiko weltweit?", options: ["Naturkatastrophen", "Cybervorfälle", "Terrorismus", "Inflation"], correctIndex: 1, explanation: "Cybervorfälle." },
    { text: "Was deckt die BU-Versicherung?", options: ["Maschinenschäden", "Ertragsausfall bei Stillstand", "Unfälle", "Rechtskosten"], correctIndex: 1, explanation: "Fixkosten + entgangener Gewinn." },
    { text: "Haften VR-Mitglieder persönlich?", options: ["Nein", "Ja, unbeschränkt", "Nur bei Vorsatz", "Nur bis CHF 100'000"], correctIndex: 1, explanation: "Persönlich und unbeschränkt." },
    { text: "Ab welcher Windstärke = Sturm?", options: ["50 km/h", "75 km/h", "100 km/h", "120 km/h"], correctIndex: 1, explanation: "75 km/h." },
    { text: "Faustformel Hausrat-Versicherungssumme?", options: ["CHF 500/m²", "CHF 1'000/m²", "CHF 2'000/m²", "CHF 5'000/m²"], correctIndex: 1, explanation: "CHF 1'000 pro Quadratmeter." },
    { text: "Deckt die Gebäudeversicherung Erdbeben?", options: ["Ja, immer", "Nein, Zusatz nötig", "Nur in GUSTAVO", "Nur über CHF 1 Mio."], correctIndex: 1, explanation: "Erdbeben braucht eine Zusatzversicherung." },
    { text: "Max. Bonusrabatt MF-Versicherung?", options: ["30%", "50%", "70%", "90%"], correctIndex: 2, explanation: "Bis ca. 70% Rabatt möglich." },
  ] } },
] };
export default m;
