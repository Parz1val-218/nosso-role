
import { Role } from "@/data/types";

export type Avaliacao = {
  nota: number;
  gasto?: number;
  comentario?: string;
};

export type HistoricoItem = Role & {
  avaliacao?: Avaliacao;
};

const CHAVE_FAVORITOS = "nosso-role-favoritos";
const CHAVE_HISTORICO = "nosso-role-historico";

function ler<T>(chave: string, valorPadrao: T): T {
  if (typeof window === "undefined") {
    return valorPadrao;
  }

  try {
    const salvo = localStorage.getItem(chave);

    if (!salvo) {
      return valorPadrao;
    }

    const dados = JSON.parse(salvo);

    return dados ?? valorPadrao;
  } catch (erro) {
    console.error(
      `Não foi possível carregar ${chave}.`,
      erro
    );

    return valorPadrao;
  }
}

function salvar<T>(chave: string, dados: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      chave,
      JSON.stringify(dados)
    );
  } catch (erro) {
    console.error(
      `Não foi possível salvar ${chave}.`,
      erro
    );
  }
}

/* ================================
   FAVORITOS
================================ */

export function carregarFavoritos(): Role[] {
  const dados = ler<unknown>(
    CHAVE_FAVORITOS,
    []
  );

  return Array.isArray(dados)
    ? dados
    : [];
}

export function salvarFavoritos(
  favoritos: Role[]
): void {
  salvar(
    CHAVE_FAVORITOS,
    favoritos
  );
}

export function adicionarFavorito(
  role: Role
): Role[] {
  const favoritos =
    carregarFavoritos();

  const jaExiste =
    favoritos.some(
      (item) =>
        item.id === role.id
    );

  if (jaExiste) {
    return favoritos;
  }

  const novosFavoritos = [
    ...favoritos,
    role,
  ];

  salvarFavoritos(
    novosFavoritos
  );

  return novosFavoritos;
}

export function removerFavorito(
  id: string
): Role[] {
  const favoritos =
    carregarFavoritos();

  const novosFavoritos =
    favoritos.filter(
      (role) =>
        role.id !== id
    );

  salvarFavoritos(
    novosFavoritos
  );

  return novosFavoritos;
}

/* ================================
   HISTÓRICO
================================ */

export function carregarHistorico(): HistoricoItem[] {
  const dados = ler<unknown>(
    CHAVE_HISTORICO,
    []
  );

  return Array.isArray(dados)
    ? dados
    : [];
}

export function salvarHistorico(
  historico: HistoricoItem[]
): void {
  salvar(
    CHAVE_HISTORICO,
    historico
  );
}

export function adicionarAoHistorico(
  role: Role
): HistoricoItem[] {
  const historico =
    carregarHistorico();

  const jaExiste =
    historico.some(
      (item) =>
        item.id === role.id
    );

  if (jaExiste) {
    return historico;
  }

  const novoHistorico: HistoricoItem[] = [
    {
      ...role,
      avaliacao: undefined,
    },
    ...historico,
  ];

  salvarHistorico(
    novoHistorico
  );

  return novoHistorico;
}

export function removerDoHistorico(
  id: string
): HistoricoItem[] {
  const historico =
    carregarHistorico();

  const novoHistorico =
    historico.filter(
      (role) =>
        role.id !== id
    );

  salvarHistorico(
    novoHistorico
  );

  return novoHistorico;
}

/* ================================
   AVALIAÇÃO
================================ */

export function salvarAvaliacao(
  id: string,
  avaliacao: Avaliacao
): HistoricoItem[] {
  const historico =
    carregarHistorico();

  const novoHistorico =
    historico.map(
      (role) => {
        if (role.id !== id) {
          return role;
        }

        return {
          ...role,
          avaliacao: {
            nota: avaliacao.nota,
            gasto:
              avaliacao.gasto,
            comentario:
              avaliacao.comentario,
          },
        };
      }
    );

  salvarHistorico(
    novoHistorico
  );

  return novoHistorico;
}

export function buscarAvaliacao(
  id: string
): Avaliacao | undefined {
  const historico =
    carregarHistorico();

  const item =
    historico.find(
      (role) =>
        role.id === id
    );

  return item?.avaliacao;
}

/* ================================
   LIMPAR DADOS
================================ */

export function limparFavoritos(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    CHAVE_FAVORITOS
  );
}

export function limparHistorico(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    CHAVE_HISTORICO
  );
}

export function limparTudo(): void {
  limparFavoritos();
  limparHistorico();
}

