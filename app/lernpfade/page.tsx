"use client";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

interface LernpfadData {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  modules: number;
  hours: number;
  completed: number;
  status: "done" | "active" | "locked";
  credits: number;
  prerequisite?: string;
  themen?: string[];
}

const sections: { label: string; paths: LernpfadData[] }[] = [
  {
    label: "GRUNDAUSBILDUNG",
    paths: [
      {
        id: 1,
        title: "Trainee-Ausbildung",
        slug: "trainee-ausbildung",
        description: "Der umfassende Einstieg für neue Mitarbeitende bei Zuriva",
        icon: "🎓",
        color: "#0FA4A0",
        modules: 8,
        hours: 8,
        completed: 8,
        status: "done",
        credits: 80,
        themen: [
          "Fachwissen Versicherung",
          "Allgemeinwissen Schweizer Markt",
          "Unternehmenskultur",
          "Kundenkommunikation",
          "IT-Systeme",
          "Produkte Überblick",
          "Erste Beratung",
          "Abschlussprüfung",
        ],
      },
      {
        id: 2,
        title: "Compliance-Schulung",
        slug: "compliance-schulung",
        description: "Regulatorische Pflichtschulungen und Compliance-Grundlagen",
        icon: "⚖️",
        color: "#e74c3c",
        modules: 5,
        hours: 5,
        completed: 5,
        status: "done",
        credits: 50,
        themen: ["FIDLEG", "FINIG", "Datenschutz", "Geldwäscherei", "Compliance-Prüfung"],
      },
    ],
  },
  {
    label: "VBV-ZERTIFIZIERUNG",
    paths: [
      {
        id: 3,
        title: "VBV Grundausbildung",
        slug: "vbv-grundausbildung",
        description: "Pflichtausbildung für die VBV-Zertifizierung",
        icon: "📋",
        color: "#022350",
        modules: 12,
        hours: 12,
        completed: 6,
        status: "active",
        credits: 120,
      },
      {
        id: 4,
        title: "VBV Krankenkassenzusatz",
        slug: "vbv-krankenkassenzusatz",
        description: "Spezialisierung im Bereich Krankenkassenzusatzversicherungen",
        icon: "🏥",
        color: "#1B6FC2",
        modules: 8,
        hours: 8,
        completed: 0,
        status: "locked",
        credits: 80,
        prerequisite: "VBV Grundausbildung",
      },
      {
        id: 5,
        title: "VBV Sach- und Vermögensversicherung",
        slug: "vbv-sach-vermoegen",
        description: "Vertiefung in Sach- und Vermögensversicherungen",
        icon: "🏢",
        color: "#6366f1",
        modules: 10,
        hours: 10,
        completed: 0,
        status: "locked",
        credits: 100,
        prerequisite: "VBV Grundausbildung",
      },
      {
        id: 6,
        title: "VBV Mündliche Prüfung",
        slug: "vbv-muendliche-pruefung",
        description: "Vorbereitung auf die mündliche VBV-Prüfung",
        icon: "🎤",
        color: "#C8A24D",
        modules: 6,
        hours: 6,
        completed: 0,
        status: "locked",
        credits: 60,
        prerequisite: "Alle VBV-Kurse",
      },
    ],
  },
  {
    label: "TRAININGS",
    paths: [
      {
        id: 7,
        title: "Telefontraining",
        slug: "telefontraining",
        description: "Professionelle Telefongespräche und Terminvereinbarungen",
        icon: "📞",
        color: "#0FA4A0",
        modules: 4,
        hours: 4,
        completed: 1,
        status: "active",
        credits: 40,
      },
      {
        id: 8,
        title: "Verkaufstraining",
        slug: "verkaufstraining",
        description: "Verkaufstechniken und Beratungskompetenz",
        icon: "💼",
        color: "#C8A24D",
        modules: 6,
        hours: 6,
        completed: 0,
        status: "locked",
        credits: 60,
      },
      {
        id: 9,
        title: "Einwandbehandlung",
        slug: "einwandbehandlung",
        description: "Strategien zur professionellen Einwandbehandlung",
        icon: "🎯",
        color: "#1B6FC2",
        modules: 4,
        hours: 4,
        completed: 0,
        status: "locked",
        credits: 40,
      },
    ],
  },
];

const allPaths = sections.flatMap((s) => s.paths);
const totalPaths = allPaths.length;
const completedPaths = allPaths.filter((p) => p.status === "done").length;
const activePaths = allPaths.filter((p) => p.status === "active").length;
const totalHours = allPaths.reduce((s, p) => s + p.hours, 0);

function svgPattern(color: string, variant: number): string {
  const c = color + "18";
  if (variant % 3 === 0) {
    return `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='6' fill='${encodeURIComponent(c)}' /%3E%3Ccircle cx='0' cy='0' r='4' fill='${encodeURIComponent(c)}' /%3E%3Ccircle cx='40' cy='40' r='4' fill='${encodeURIComponent(c)}' /%3E%3C/svg%3E")`;
  }
  if (variant % 3 === 1) {
    return `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15 L15 0 L30 15 L15 30Z' fill='none' stroke='${encodeURIComponent(c)}' stroke-width='1' /%3E%3C/svg%3E")`;
  }
  return `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='16' height='16' rx='2' fill='none' stroke='${encodeURIComponent(c)}' stroke-width='1' /%3E%3C/svg%3E")`;
}

export default function Lernpfade() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: b,
        background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          minWidth: 260,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRight: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>
            ZURIVA
          </span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px" }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C8A24D",
              padding: "16px 12px 8px",
            }}
          >
            LERNEN
          </div>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade", active: true },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                padding: "10px 14px",
                margin: "2px 0",
                color: item.active ? "#022350" : "#4A4A5A",
                background: item.active ? "rgba(255,255,255,0.8)" : "transparent",
                borderRadius: 12,
                boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none",
                fontWeight: item.active ? 500 : 400,
                fontSize: 13,
                textDecoration: "none",
                display: "block",
                transition: "all 0.2s ease",
              }}
            >
              {item.name}
            </a>
          ))}
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C8A24D",
              padding: "16px 12px 8px",
            }}
          >
            ADMIN
          </div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Lernpfadeditor", href: "/admin/lernpfade" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Kahoot-Editor", href: "/admin/kahoot" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                padding: "10px 14px",
                margin: "2px 0",
                color: "#4A4A5A",
                background: "transparent",
                borderRadius: 12,
                fontSize: 13,
                textDecoration: "none",
                display: "block",
                transition: "all 0.2s ease",
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            padding: "16px 20px",
            margin: "0 12px 12px",
            background: "rgba(255,255,255,0.6)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 12,
              background: "linear-gradient(135deg, #022350, #0E3057)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
              color: "white",
            }}
          >
            LM
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "28px 40px 0", flexShrink: 0 }}>
          <div style={{ fontSize: 32, fontWeight: 400, color: "#022350", fontFamily: h, letterSpacing: "-0.01em" }}>
            Lernpfade
          </div>
          <div style={{ fontSize: 13, color: "#9A9AAA", marginTop: 4 }}>
            Dein strukturierter Weg zur VBV-Zertifizierung
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 24,
              marginBottom: 8,
              padding: "16px 24px",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 2px 12px rgba(2,35,80,0.04)",
              maxWidth: 900,
            }}
          >
            {[
              { label: "Lernpfade gesamt", value: totalPaths, color: "#022350" },
              { label: "Abgeschlossen", value: completedPaths, color: "#0FA4A0" },
              { label: "In Bearbeitung", value: activePaths, color: "#C8A24D" },
              { label: "Stunden gesamt", value: `~${totalHours}h`, color: "#1B6FC2" },
            ].map((stat) => (
              <div key={stat.label} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 500, color: stat.color, fontFamily: h }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 40px 48px" }}>
          <div style={{ maxWidth: 900, position: "relative" }}>
            {/* Vertical connecting line */}
            <div
              style={{
                position: "absolute",
                left: 36,
                top: 60,
                bottom: 40,
                width: 2,
                background: "repeating-linear-gradient(to bottom, rgba(200,162,77,0.3) 0px, rgba(200,162,77,0.3) 6px, transparent 6px, transparent 12px)",
                zIndex: 0,
              }}
            />

            {sections.map((section, si) => (
              <div key={section.label} style={{ position: "relative", zIndex: 1, marginBottom: si < sections.length - 1 ? 12 : 0 }}>
                {/* Section Label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                    marginTop: si > 0 ? 32 : 0,
                    paddingLeft: 14,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "linear-gradient(135deg, #C8A24D, #b8923d)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      padding: "6px 16px",
                      borderRadius: 20,
                      boxShadow: "0 2px 8px rgba(200,162,77,0.25)",
                    }}
                  >
                    {section.label}
                  </div>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,162,77,0.2), transparent)" }} />
                </div>

                {/* Path Cards */}
                {section.paths.map((path, pi) => {
                  const progress = path.modules > 0 ? Math.round((path.completed / path.modules) * 100) : 0;
                  const isDone = path.status === "done";
                  const isActive = path.status === "active";
                  const isLocked = path.status === "locked";

                  let buttonLabel = "Starten";
                  if (isDone) buttonLabel = "Anzeigen";
                  if (isActive) buttonLabel = "Weiterlernen";

                  return (
                    <div key={path.id} style={{ marginBottom: pi < section.paths.length - 1 ? 16 : 0 }}>
                      {/* Connector dot */}
                      <div
                        style={{
                          position: "absolute",
                          left: 30,
                          marginTop: 18,
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: isDone
                            ? "#0FA4A0"
                            : isActive
                            ? "#022350"
                            : "rgba(200,200,210,0.5)",
                          border: "3px solid #F0ECE6",
                          zIndex: 2,
                          boxShadow: isDone
                            ? "0 0 0 3px rgba(15,164,160,0.15)"
                            : isActive
                            ? "0 0 0 3px rgba(2,35,80,0.12)"
                            : "none",
                        }}
                      />

                      {/* Card */}
                      <div
                        style={{
                          marginLeft: 56,
                          background: "rgba(255,255,255,0.72)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          borderRadius: 20,
                          border: isActive
                            ? `1.5px solid ${path.color}44`
                            : "1px solid rgba(255,255,255,0.6)",
                          boxShadow: isActive
                            ? `0 4px 24px ${path.color}14`
                            : "0 2px 16px rgba(2,35,80,0.04)",
                          opacity: isLocked ? 0.62 : 1,
                          overflow: "hidden",
                          transition: "all 0.25s ease",
                          position: "relative",
                        }}
                      >
                        {/* Visual header bar */}
                        <div
                          style={{
                            height: 40,
                            background: `linear-gradient(135deg, ${path.color}, ${path.color}cc)`,
                            backgroundImage: svgPattern(path.color, path.id),
                            backgroundSize: "auto",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: `linear-gradient(135deg, ${path.color}ee, ${path.color}88)`,
                            }}
                          />
                          {/* Status badge */}
                          <div
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 14,
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "3px 12px",
                              borderRadius: 20,
                              ...(isDone
                                ? {
                                    background: "rgba(255,255,255,0.92)",
                                    color: "#0FA4A0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                                  }
                                : isActive
                                ? {
                                    background: "rgba(255,255,255,0.92)",
                                    color: "#022350",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                                  }
                                : {
                                    background: "rgba(255,255,255,0.6)",
                                    color: "#9A9AAA",
                                  }),
                            }}
                          >
                            {isDone && "✓ Abgeschlossen"}
                            {isActive && "Aktiv"}
                            {isLocked && "🔒 Gesperrt"}
                          </div>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: "20px 24px 24px" }}>
                          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                            {/* Icon */}
                            <div
                              style={{
                                width: 52,
                                height: 52,
                                borderRadius: 14,
                                background: `linear-gradient(135deg, ${path.color}20, ${path.color}10)`,
                                border: `1.5px solid ${path.color}30`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 26,
                                flexShrink: 0,
                              }}
                            >
                              {path.icon}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              {/* Title */}
                              <div
                                style={{
                                  fontSize: 18,
                                  fontWeight: 500,
                                  color: "#022350",
                                  fontFamily: h,
                                  marginBottom: 4,
                                  lineHeight: 1.3,
                                }}
                              >
                                {path.title}
                              </div>
                              <div style={{ fontSize: 13, color: "#6A6A7A", marginBottom: 14, lineHeight: 1.5 }}>
                                {path.description}
                              </div>

                              {/* Meta */}
                              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                                <span style={{ fontSize: 12, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4 }}>
                                  📚 {path.modules} Module
                                </span>
                                <span style={{ fontSize: 12, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4 }}>
                                  🕐 ~{path.hours} Stunden
                                </span>
                                <span style={{ fontSize: 12, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4 }}>
                                  ⭐ {path.credits} Credits
                                </span>
                              </div>

                              {/* Themen (if present) */}
                              {path.themen && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                                  {path.themen.map((t) => (
                                    <span
                                      key={t}
                                      style={{
                                        fontSize: 10.5,
                                        color: "#6A6A7A",
                                        background: "rgba(0,0,0,0.03)",
                                        padding: "3px 10px",
                                        borderRadius: 20,
                                        border: "1px solid rgba(0,0,0,0.05)",
                                      }}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Progress bar */}
                              <div style={{ marginBottom: 6 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 6,
                                  }}
                                >
                                  <span style={{ fontSize: 11, color: "#9A9AAA" }}>
                                    {path.completed}/{path.modules} abgeschlossen
                                  </span>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: path.color }}>
                                    {progress}%
                                  </span>
                                </div>
                                <div
                                  style={{
                                    background: "rgba(0,0,0,0.04)",
                                    height: 5,
                                    borderRadius: 4,
                                  }}
                                >
                                  <div
                                    style={{
                                      height: 5,
                                      borderRadius: 4,
                                      background: `linear-gradient(90deg, ${path.color}, ${path.color}cc)`,
                                      width: `${progress}%`,
                                      transition: "width 0.4s ease",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Prerequisite */}
                              {path.prerequisite && (
                                <div style={{ fontSize: 11.5, color: "#b0a080", marginTop: 10, display: "flex", alignItems: "center", gap: 5 }}>
                                  <span style={{ fontSize: 13 }}>⚠️</span> Voraussetzung: {path.prerequisite}
                                </div>
                              )}

                              {/* Action button */}
                              {!isLocked && (
                                <a
                                  href={`/lernpfade/${path.slug}`}
                                  style={{
                                    display: "inline-block",
                                    marginTop: 16,
                                    padding: "9px 24px",
                                    background: isDone
                                      ? "rgba(0,0,0,0.04)"
                                      : `linear-gradient(135deg, ${path.color}, ${path.color}dd)`,
                                    color: isDone ? "#4A4A5A" : "white",
                                    borderRadius: 12,
                                    fontSize: 13,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    boxShadow: isDone ? "none" : `0 2px 8px ${path.color}30`,
                                  }}
                                >
                                  {buttonLabel}
                                </a>
                              )}

                              {isLocked && (
                                <a
                                  href={`/lernpfade/${path.slug}`}
                                  style={{
                                    display: "inline-block",
                                    marginTop: 16,
                                    padding: "9px 24px",
                                    background: "rgba(0,0,0,0.03)",
                                    color: "#b0b0bb",
                                    borderRadius: 12,
                                    fontSize: 13,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    cursor: "default",
                                  }}
                                >
                                  🔒 {buttonLabel}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
