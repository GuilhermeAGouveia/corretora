import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { serialize } from "v8";

export default function handleErrorPrisma(
  error: PrismaClientKnownRequestError
) {
  const msg = {
    P2002: "Primary key violation",
    P2003: "Foreign key violation",
    P2004: "Unique constraint violation",
    default: "Unknown error",
  };
  let message: string = "";
  if (error.code in msg) {
    message = msg[error.code as keyof typeof msg];
  }

  if (error.meta?.cause) {
    message = error.meta.cause as string;
  }

  message = message || msg["default"];
  return { error: error.code, message };
}
