"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ===== ANIMATED COUNTER =====
export function AnimatedCounter({ value, suffix = "", prefix = "", color = "#022350", size = 48, duration = 2 }: { value: number; suffix?: string; prefix?: string; color?: string; size?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.round(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: size, fontWeight: 700, color, lineHeight: 1 }}>{prefix}{count.toLocaleString("de-CH")}{suffix}</span>;
}

// ===== ANIMATED BAR CHART =====
export function AnimatedBarChart({ data, height = 200 }: { data: { label: string; value: number; color: string; suffix?: string }[]; height?: number }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height, padding: "0 8px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / max) * 100}%` }} transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }} style={{ width: "100%", borderRadius: "8px 8px 0 0", background: d.color, position: "relative", minHeight: 4 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.15 }} style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", fontSize: 13, fontWeight: 700, color: d.color, whiteSpace: "nowrap" }}>{d.value.toLocaleString("de-CH")}{d.suffix || ""}</motion.div>
          </motion.div>
          <div style={{ fontSize: 10, color: "#4A5568", textAlign: "center", fontWeight: 600 }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATED PIE/DONUT CHART =====
export function AnimatedDonut({ segments, size = 180, strokeWidth = 24, centerText, centerSub }: { segments: { value: number; color: string; label: string }[]; size?: number; strokeWidth?: number; centerText?: string; centerSub?: string }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(2,35,80,0.06)" strokeWidth={strokeWidth} />
        {segments.map((seg, i) => {
          const segLength = (seg.value / total) * circumference;
          const currentOffset = offset;
          offset += segLength;
          return (
            <motion.circle key={i} cx={size/2} cy={size/2} r={radius} fill="none" stroke={seg.color} strokeWidth={strokeWidth} strokeLinecap="round"
              strokeDasharray={`${segLength} ${circumference - segLength}`}
              strokeDashoffset={-currentOffset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${segLength} ${circumference - segLength}` }}
              transition={{ duration: 1.2, delay: i * 0.3, ease: "easeOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
          );
        })}
      </svg>
      {centerText && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#022350" }}>{centerText}</motion.div>
          {centerSub && <div style={{ fontSize: 11, color: "#9CA3AF" }}>{centerSub}</div>}
        </div>
      )}
      {/* Legend */}
      <div style={{ position: "absolute", top: size + 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 16, whiteSpace: "nowrap" }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: seg.color }} />
            <span style={{ color: "#4A5568" }}>{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== ANIMATED 3-PILLAR SYSTEM =====
export function ThreePillarSystem() {
  const pillars = [
    { label: "1. Säule", sub: "AHV/IV", desc: "Existenzsicherung", color: "#C0392B", height: 60, items: ["Staatlich", "Obligatorisch", "Max. CHF 2'450/Mt."] },
    { label: "2. Säule", sub: "BVG/PK", desc: "Lebensstandard", color: "#022350", height: 80, items: ["Beruflich", "Ab CHF 22'680", "AG + AN Beiträge"] },
    { label: "3. Säule", sub: "3a / 3b", desc: "Individuelle Ergänzung", color: "#C8A24D", height: 50, items: ["Privat", "Freiwillig", "Max. CHF 7'258 (3a)"] },
  ];

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, justifyContent: "center", marginBottom: 24 }}>
        {pillars.map((p, i) => (
          <motion.div key={i} initial={{ height: 0, opacity: 0 }} animate={{ height: `${p.height * 2.5}px`, opacity: 1 }} transition={{ duration: 0.8, delay: i * 0.3 }} style={{ width: 140, borderRadius: "12px 12px 0 0", background: `linear-gradient(180deg, ${p.color}, ${p.color}CC)`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 12px", overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{p.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 2 }}>{p.sub}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{p.desc}</div>
            {p.items.map((item, j) => (
              <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.3 + j * 0.1 }} style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", padding: "2px 0" }}>• {item}</motion.div>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 1.5 }} style={{ height: 4, borderRadius: 2, background: "linear-gradient(90deg, #C0392B, #022350, #C8A24D)", maxWidth: 460, margin: "0 auto" }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "#4A5568", fontWeight: 600 }}>Ziel: 60-70% des letzten Einkommens im Alter</motion.div>
    </div>
  );
}

// ===== ANIMATED TIMELINE =====
export function AnimatedTimeline({ items }: { items: { year: string; title: string; color: string }[] }) {
  return (
    <div style={{ position: "relative", padding: "12px 0 12px 32px" }}>
      <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 2, background: "rgba(2,35,80,0.08)" }} />
      {items.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, position: "relative" }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 + 0.1, type: "spring" }} style={{ position: "absolute", left: -32, width: 24, height: 24, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
          </motion.div>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: item.color, marginRight: 8 }}>{item.year}</span>
            <span style={{ fontSize: 13, color: "#022350" }}>{item.title}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ===== ANIMATED STAT CARD =====
export function AnimatedStatCard({ label, value, suffix, color, icon }: { label: string; value: number; suffix: string; color: string; icon?: React.ReactNode }) {
  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} style={{ background: "rgba(255,255,255,0.50)", borderRadius: 14, padding: "20px 24px", textAlign: "center", border: `1px solid ${color}20` }}>
      {icon && <div style={{ color, marginBottom: 8 }}>{icon}</div>}
      <AnimatedCounter value={value} suffix={suffix} color={color} size={36} />
      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>{label}</div>
    </motion.div>
  );
}

// ===== COMPARISON TABLE =====
export function ComparisonTable({ headers, rows }: { headers: string[]; rows: { cells: string[]; highlight?: boolean }[] }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(2,35,80,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${headers.length}, 1fr)`, background: "#022350", padding: "12px 16px" }}>
        {headers.map((h, i) => (
          <div key={i} style={{ fontSize: 12, fontWeight: 700, color: "white", textAlign: i === 0 ? "left" : "center" }}>{h}</div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <motion.div key={ri} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ri * 0.1 }} style={{ display: "grid", gridTemplateColumns: `repeat(${headers.length}, 1fr)`, padding: "10px 16px", background: row.highlight ? "rgba(200,162,77,0.06)" : ri % 2 === 0 ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.50)", borderBottom: "1px solid rgba(2,35,80,0.04)" }}>
          {row.cells.map((cell, ci) => (
            <div key={ci} style={{ fontSize: 13, color: ci === 0 ? "#022350" : "#4A5568", fontWeight: ci === 0 || row.highlight ? 600 : 400, textAlign: ci === 0 ? "left" : "center" }}>{cell}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
