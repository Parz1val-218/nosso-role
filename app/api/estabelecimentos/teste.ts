import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    mensagem: "API do Nosso Rolê funcionando!",
  });
}