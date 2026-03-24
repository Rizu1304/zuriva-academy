"use server";

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT =
  "Du bist Aura, die KI-Assistentin der Zuriva Academy — ein internes LMS der Zuriva GmbH, einer Schweizer Versicherungsvermittlung in Dübendorf, Zürich. Du hilfst Mitarbeitenden bei Fragen zu Versicherungsthemen, Kursinhalten, VBV-Zertifizierung, Prüfungsvorbereitung und der Nutzung der Plattform. Antworte immer auf Deutsch, freundlich und kompetent. Halte Antworten kurz und präzise.";

export async function chat({
  messages,
}: {
  messages: { role: "user" | "assistant"; content: string }[];
}): Promise<{ content: string }> {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return { content: textBlock?.text ?? "Entschuldigung, ich konnte keine Antwort generieren." };
  } catch (error) {
    console.error("Aura API error:", error);
    return {
      content:
        "Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Anfrage. Bitte versuche es erneut.",
    };
  }
}

export async function generateEditorContent({
  prompt,
  context,
  documentText,
}: {
  prompt: string;
  context: "kurs" | "pruefung" | "lernpfad" | "kahoot";
  documentText?: string;
}): Promise<{ items: Record<string, unknown>[]; error: boolean }> {
  const systemPrompts: Record<string, string> = {
    kurs: `Du bist ein Experte für Kurserstellung im Schweizer Versicherungswesen (Zuriva GmbH).
Der Benutzer beschreibt was er braucht. Generiere Module für einen Kurs.
Antworte NUR mit einem JSON-Array. Kein anderer Text, keine Erklärungen, kein Markdown.
Format: [{"title": "Modulname"}]
Beispiel: [{"title": "Einführung in die Sachversicherung"}, {"title": "Policen und Deckungen"}]`,
    pruefung: `Du bist ein Experte für Prüfungserstellung im Schweizer Versicherungswesen (Zuriva GmbH).
Der Benutzer beschreibt was er braucht. Generiere Prüfungsfragen.
Antworte NUR mit einem JSON-Array. Kein anderer Text, keine Erklärungen, kein Markdown.
Format: [{"text": "Fragetext?", "options": ["Antwort A", "Antwort B", "Antwort C", "Antwort D"], "correctIndex": 0}]
correctIndex ist der Index (0-3) der richtigen Antwort. Erstelle realistische, anspruchsvolle Fragen.`,
    lernpfad: `Du bist ein Experte für Lernpfade im Schweizer Versicherungswesen (Zuriva GmbH).
Der Benutzer beschreibt was er braucht. Generiere Schritte für einen Lernpfad.
Antworte NUR mit einem JSON-Array. Kein anderer Text, keine Erklärungen, kein Markdown.
Format: [{"title": "Schrittname", "type": "course", "duration": "2 Std"}]
type kann sein: "course" (Kurs), "exam" (Prüfung), oder "activity" (Aktivität/Workshop).`,
    kahoot: `Du bist ein Experte für Kahoot-Quizze im Schweizer Versicherungswesen (Zuriva GmbH).
Der Benutzer beschreibt was er braucht. Generiere unterhaltsame Kahoot-Quizfragen.
Antworte NUR mit einem JSON-Array. Kein anderer Text, keine Erklärungen, kein Markdown.
Format: [{"text": "Fragetext?", "options": ["A", "B", "C", "D"], "correctIndex": 0, "timeLimit": 20, "points": 1000}]
correctIndex: 0-3. timeLimit: 10-60 Sekunden. points: 500/1000/1500/2000. Fragen sollen Spass machen!`,
  };

  const docHint = documentText
    ? `\n\nBasiere die Inhalte auf folgendem Dokument:\n---\n${documentText.slice(0, 12000)}\n---\n`
    : "";

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompts[context],
      messages: [{ role: "user", content: prompt + docHint }],
    });
    const textBlock = response.content.find((block) => block.type === "text");
    const raw = textBlock?.text ?? "[]";

    // Parse JSON robustly
    let items: Record<string, unknown>[] = [];
    try {
      items = JSON.parse(raw);
    } catch {
      const match = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/) || raw.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          items = JSON.parse(match[1] || match[0]);
        } catch { /* fallback empty */ }
      }
    }
    if (!Array.isArray(items)) items = [];
    return { items, error: false };
  } catch (error) {
    console.error("Editor generate error:", error);
    return { items: [], error: true };
  }
}

export async function generateContent({
  prompt,
  context,
  documentText,
}: {
  prompt: string;
  context: "lernpfad" | "pruefung" | "kahoot" | "animation";
  documentText?: string;
}): Promise<{ content: string; error: boolean }> {
  const systemPrompts: Record<string, string> = {
    lernpfad:
      "Du bist ein Experte für Lernpfad-Design im Schweizer Versicherungswesen. Erstelle strukturierte Lernpfade mit Modulen, Lernzielen und Zeitschätzungen. Antworte auf Deutsch. Formatiere mit Markdown.",
    pruefung:
      "Du bist ein Experte für Prüfungserstellung im Schweizer Versicherungswesen. Erstelle Prüfungsfragen mit Multiple-Choice-Antworten, markiere die korrekte Antwort mit ✅. Antworte auf Deutsch. Formatiere mit Markdown.",
    kahoot:
      "Du bist ein Experte für spielerisches Lernen (Gamification) im Versicherungswesen. Erstelle unterhaltsame Quiz-Fragen mit 4 Antwortmöglichkeiten. Markiere die korrekte Antwort mit ✅. Antworte auf Deutsch. Formatiere mit Markdown.",
    animation:
      "Du bist ein Experte für interaktive Lernanimationen. Erstelle HTML/CSS/JS Code für animierte, interaktive Lernelemente. Der Code muss eigenständig in einem iframe funktionieren (inline styles, kein externes Framework). Nutze moderne CSS-Animationen. Antworte NUR mit dem HTML-Code, keine Erklärungen. Thema: Schweizer Versicherungswesen.",
  };

  const docHint = documentText
    ? `\n\nVerarbeite folgendes Dokument und nutze den Inhalt:\n---\n${documentText.slice(0, 12000)}\n---\n`
    : "";

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompts[context],
      messages: [{ role: "user", content: prompt + docHint }],
    });
    const textBlock = response.content.find((block) => block.type === "text");
    return { content: textBlock?.text ?? "Keine Antwort erhalten.", error: false };
  } catch (error) {
    console.error("Generate error:", error);
    return { content: "Fehler bei der KI-Generierung. Bitte versuche es erneut.", error: true };
  }
}
