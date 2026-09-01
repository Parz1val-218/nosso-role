export type LocalizacaoSalva = {
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
  origem: "gps" | "manual";
};

const CHAVE_LOCALIZACAO =
  "nosso-role-localizacao";

export function carregarLocalizacao():
  LocalizacaoSalva | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const salvo =
      localStorage.getItem(
        CHAVE_LOCALIZACAO
      );

    if (!salvo) {
      return null;
    }

    const dados = JSON.parse(salvo);

    if (
      !dados ||
      typeof dados.cidade !== "string" ||
      typeof dados.estado !== "string"
    ) {
      return null;
    }

    return dados;
  } catch (erro) {
    console.error(
      "Erro ao carregar localização:",
      erro
    );

    return null;
  }
}

export function salvarLocalizacao(
  localizacao: LocalizacaoSalva
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      CHAVE_LOCALIZACAO,
      JSON.stringify(localizacao)
    );
  } catch (erro) {
    console.error(
      "Erro ao salvar localização:",
      erro
    );
  }
}

export function limparLocalizacao(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    CHAVE_LOCALIZACAO
  );
}