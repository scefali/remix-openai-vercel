import type { Prisma } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";

export type Message = Prisma.PromiseReturnType<
  PrismaClient["message"]["create"]
>;

export type SerializedMessage = Omit<Message, "createdAt"> & {
  createdAt: string;
};
