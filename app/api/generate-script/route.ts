import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  const { topic, style, duration, language } = await request.json();

  if (!topic) {
    return Response.json({ error: "Topic is required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // If no Anthropic key, generate a template script
  if (!apiKey) {
    const script = generateFallbackScript(topic, style, duration, language);
    return Response.json({ script, generated_by: "template" });
  }

  try {
    const client = new Anthropic({ apiKey });

    const durationText = duration === "short" ? "30-60 Sekunden" : duration === "medium" ? "1-2 Minuten" : "2-3 Minuten";
    const styleText = style === "professional" ? "professionell und sachlich" : style === "friendly" ? "freundlich und zugaenglich" : style === "energetic" ? "energisch und motivierend" : "erklaerend und lehrreich";
    const lang = language === "en" ? "English" : "Deutsch";

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Schreibe ein Video-Skript fuer einen KI-Avatar. Das Skript soll direkt gesprochen werden (keine Regieanweisungen, keine Klammern, nur der gesprochene Text).

Thema: ${topic}
Stil: ${styleText}
Laenge: ${durationText}
Sprache: ${lang}

Regeln:
- Nur den gesprochenen Text, keine Szenenanweisungen
- Natuerliche Sprache, als wuerde ein Mensch sprechen
- Klare Struktur: Begruessung, Hauptteil, Zusammenfassung
- Fuer Versicherungsvermittler in der Schweiz relevant machen wenn moeglich
- Direkte Ansprache ("Sie" oder "du" je nach Stil)`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const script = textBlock ? textBlock.text : "";

    return Response.json({ script, generated_by: "claude" });
  } catch (err) {
    // Fallback to template
    const script = generateFallbackScript(topic, style, duration, language);
    return Response.json({ script, generated_by: "template", note: String(err) });
  }
}

function generateFallbackScript(topic: string, style: string, duration: string, language: string): string {
  const isDE = language !== "en";
  const isShort = duration === "short";

  if (isDE) {
    if (isShort) {
      return `Hallo und willkommen! Heute sprechen wir ueber ${topic}. ${style === "professional" ? "Dieses Thema ist von zentraler Bedeutung fuer Ihre berufliche Praxis." : "Ein spannendes Thema, das ich Ihnen naeher bringen moechte."} Die wichtigsten Punkte sind: Erstens, die Grundlagen verstehen. Zweitens, die praktische Anwendung meistern. Und drittens, immer auf dem neuesten Stand bleiben. Vielen Dank fuers Zuhoeren!`;
    }
    return `Herzlich willkommen! Mein Name ist Aura und heute moechte ich mit Ihnen ueber ein wichtiges Thema sprechen: ${topic}.

${style === "professional" ? "In der heutigen Versicherungsbranche ist es entscheidend, dieses Thema gruendlich zu verstehen." : "Ich freue mich, Ihnen dieses Thema auf eine verstaendliche Weise naeher zu bringen."}

Lassen Sie uns mit den Grundlagen beginnen. ${topic} umfasst verschiedene Aspekte, die fuer Ihre taegliche Arbeit als Versicherungsvermittler relevant sind.

Der erste wichtige Punkt ist das Verstaendnis der rechtlichen Rahmenbedingungen. In der Schweiz gelten besondere Vorschriften, die Sie kennen muessen.

Der zweite Punkt betrifft die praktische Umsetzung. Wie koennen Sie dieses Wissen im Kundengespraech einsetzen?

Und schliesslich: Bleiben Sie immer auf dem neuesten Stand. Die Branche entwickelt sich staendig weiter, und kontinuierliche Weiterbildung ist der Schluessel zum Erfolg.

Zusammenfassend: ${topic} ist ein Bereich, der sowohl theoretisches Wissen als auch praktische Erfahrung erfordert. Nutzen Sie die Ressourcen der Zuriva Academy, um sich weiterzubilden.

Vielen Dank fuers Zuhoeren und viel Erfolg bei Ihrer Weiterbildung!`;
  }

  return `Welcome! Today we're talking about ${topic}. This is an important topic that will help you in your professional development. Let's dive in and explore the key concepts together. Thank you for watching!`;
}
