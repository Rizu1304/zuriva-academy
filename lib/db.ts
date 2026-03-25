let prismaInstance: ReturnType<typeof createClient> | undefined;

function createClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  return new PrismaClient() as import("@prisma/client").PrismaClient;
}

export const prisma = (() => {
  if (typeof globalThis !== "undefined") {
    const g = globalThis as unknown as { __prisma?: ReturnType<typeof createClient> };
    if (!g.__prisma) {
      g.__prisma = createClient();
    }
    return g.__prisma;
  }
  if (!prismaInstance) {
    prismaInstance = createClient();
  }
  return prismaInstance;
})();
