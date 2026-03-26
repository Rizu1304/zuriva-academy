export async function POST(request: Request) {
  const { phone, message, type } = await request.json();

  if (!phone || !message) {
    return Response.json({ error: "Telefonnummer und Nachricht sind erforderlich" }, { status: 400 });
  }

  // WhatsApp Business API integration
  // Currently uses the WhatsApp URL scheme for direct messaging
  // For production: integrate with Twilio WhatsApp API or WhatsApp Business Cloud API

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  // Log the notification
  console.log(`[WhatsApp Notification] Type: ${type}, Phone: ${cleanPhone}, Message: ${message}`);

  return Response.json({
    success: true,
    whatsapp_url: whatsappUrl,
    phone: cleanPhone,
    type: type || "general",
  });
}

// GET: Get notification templates
export async function GET() {
  const templates = [
    {
      id: "vbv_reminder",
      name: "VBV-Frist Erinnerung",
      message: "Hallo {name}! Deine VBV-Frist läuft in {days} Tagen ab. Du hast noch {credits_remaining} Credits offen. Lerne jetzt weiter: {link}",
    },
    {
      id: "course_reminder",
      name: "Kurs-Erinnerung",
      message: "Hallo {name}! Dein Kurs '{course_name}' wartet auf dich. Du bist zu {progress}% fertig. Weiter geht's: {link}",
    },
    {
      id: "exam_reminder",
      name: "Prüfungs-Erinnerung",
      message: "Hallo {name}! Deine Prüfung '{exam_name}' findet in {days} Tagen statt. Bereite dich jetzt vor: {link}",
    },
    {
      id: "certificate_earned",
      name: "Zertifikat erhalten",
      message: "Gratulation {name}! Du hast das Zertifikat '{cert_name}' erhalten. Schau es dir an: {link}",
    },
    {
      id: "streak_warning",
      name: "Streak-Warnung",
      message: "Hallo {name}! Dein {streak}-Tage-Streak ist in Gefahr! Lerne heute noch eine Lektion: {link}",
    },
  ];

  return Response.json({ templates });
}
