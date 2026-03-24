import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
```

**Ctrl+S** speichern → Notepad schliessen.

**2.** Neuen Ordner erstellen — im Terminal:
```
mkdir app\dashboard
```

**3.** Neue Datei erstellen:
```
notepad app\dashboard\page.tsx
