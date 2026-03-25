let prismaInstance: import("@prisma/client").PrismaClient | undefined;

function createClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }) as import("@prisma/client").PrismaClient;
}

const g = globalThis as unknown as { __prisma?: import("@prisma/client").PrismaClient };

export const prisma: import("@prisma/client").PrismaClient = g.__prisma ?? (() => {
  const client = createClient();
  if (process.env.NODE_ENV !== "production") g.__prisma = client;
  return client;
})();
