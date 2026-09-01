import { Role } from "@/data/types";

type RespostaBuscaInternet = {
  sucesso: boolean;
  cidade?: string;
  estado?: string;
  quantidade?: number;
  resultados?: Role[];
  mensagem?: string;
};

export async function buscarEstabelecimentosInternet(
  cidade: string,
  estado: string
): Promise<Role[]> {
  const resposta = await fetch(
    "/api/estabelecimentos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cidade,
        estado,
      }),
    }
  );

  /*
   * Primeiro verifica se o servidor realmente
   * devolveu JSON.
   */
  const texto = await resposta.text();

  let dados: RespostaBuscaInternet;

  try {
    dados = JSON.parse(texto);
  } catch {
    console.error(
      "Resposta da API não é JSON:",
      texto
    );

    throw new Error(
      `A API retornou uma resposta inválida (HTTP ${resposta.status}).`
    );
  }

  if (!resposta.ok || !dados.sucesso) {
    throw new Error(
      dados.mensagem ??
        "Não foi possível buscar estabelecimentos."
    );
  }

  return dados.resultados ?? [];
}