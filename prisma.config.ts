import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:Zuriva2026!@db.ggtkqiuxgxrdlkupeyml.supabase.co:6543/postgres?pgbouncer=true",
  },
});
