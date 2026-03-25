export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { handlers } = await import("@/lib/auth");
  return handlers.GET(request as unknown as Parameters<typeof handlers.GET>[0]);
}

export async function POST(request: Request) {
  const { handlers } = await import("@/lib/auth");
  return handlers.POST(request as unknown as Parameters<typeof handlers.POST>[0]);
}
