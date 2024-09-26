import { PrismaClient } from "@prisma/client";


const client = global.prismadb || new PrismaClient();

declare global {
    namespace globalThis {
        var prismadb: PrismaClient | undefined;
    }
}

if (process.env.NODE_ENV !== "production") global.prismadb = client;
export default client;
