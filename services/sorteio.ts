import { Categoria, Role } from "@/data/types";

export interface FiltrosSorteio {
  categoria: Categoria;
  cidade?: string;
  estado?: string;
  precoMaximo?: number;
  excluirRealizados?: boolean;
}

export interface OpcoesSorteio {
  filtros: FiltrosSorteio;
  idsRealizados?: string[];
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

/*
 * Verifica se o rolê pertence à localização escolhida.
 *
 * Filmes e atividades em casa não dependem de cidade.
 */
function correspondeLocalizacao(
  role: Role,
  cidade?: string,
  estado?: string
): boolean {
  if (!cidade && !estado) {
    return true;
  }

  if (
    role.categoria === "filmes" ||
    role.categoria === "casa"
  ) {
    return true;
  }

  if (!role.localizacao) {
    return false;
  }

  if (cidade) {
    if (!role.localizacao.cidade) {
      return false;
    }

    if (
      normalizarTexto(role.localizacao.cidade) !==
      normalizarTexto(cidade)
    ) {
      return false;
    }
  }

  if (estado) {
    if (!role.localizacao.estado) {
      return false;
    }

    if (
      normalizarTexto(role.localizacao.estado) !==
      normalizarTexto(estado)
    ) {
      return false;
    }
  }

  return true;
}

/*
 * Verifica o limite de preço.
 */
function correspondePreco(
  role: Role,
  precoMaximo?: number
): boolean {
  if (precoMaximo === undefined) {
    return true;
  }

  /*
   * Filmes e atividades em casa não usam
   * o filtro de preço dos estabelecimentos.
   */
  if (
    role.categoria === "filmes" ||
    role.categoria === "casa"
  ) {
    return true;
  }

  /*
   * Passeios gratuitos sempre podem aparecer.
   */
  if (
    role.categoria === "passeios" &&
    role.gratuito
  ) {
    return true;
  }

  /*
   * Se não houver preço cadastrado,
   * não bloqueamos o rolê.
   */
  if (role.precoMedio === undefined) {
    return true;
  }

  return role.precoMedio <= precoMaximo;
}

/*
 * Aplica todos os filtros básicos.
 */
function filtrarRoles(
  roles: Role[],
  opcoes: OpcoesSorteio
): Role[] {
  const {
    filtros,
    idsRealizados = [],
  } = opcoes;

  const idsRealizadosSet =
    new Set(idsRealizados);

  return roles.filter((role) => {
    /*
     * Categoria
     */
    if (
      role.categoria !==
      filtros.categoria
    ) {
      return false;
    }

    /*
     * Localização
     */
    if (
      !correspondeLocalizacao(
        role,
        filtros.cidade,
        filtros.estado
      )
    ) {
      return false;
    }

    /*
     * Preço
     */
    if (
      !correspondePreco(
        role,
        filtros.precoMaximo
      )
    ) {
      return false;
    }

    /*
     * Evita os rolês que estão
     * dentro da lista de exclusão.
     */
    if (
      filtros.excluirRealizados &&
      idsRealizadosSet.has(role.id)
    ) {
      return false;
    }

    return true;
  });
}

function escolherAleatorio<T>(
  items: T[]
): T | null {
  if (items.length === 0) {
    return null;
  }

  const indice = Math.floor(
    Math.random() * items.length
  );

  return items[indice];
}

export interface ResultadoSorteio {
  sucesso: boolean;
  resultado: Role | null;
  candidatosDisponiveis: number;
  mensagem?: string;
}

/*
 * =========================================================
 * SORTEIO PRINCIPAL
 * =========================================================
 *
 * A lista idsRealizados deve representar os últimos
 * rolês realizados, e não necessariamente todo o histórico.
 *
 * O componente que chama esta função pode controlar
 * quantos IDs serão enviados.
 */
export function sortearRole(
  roles: Role[],
  opcoes: OpcoesSorteio
): ResultadoSorteio {
  /*
   * Primeiro tenta respeitar todos os filtros
   * e excluir os rolês recentes.
   */
  let candidatos =
    filtrarRoles(
      roles,
      opcoes
    );

  /*
   * Se não houver candidatos, tentamos novamente
   * sem a exclusão dos realizados.
   *
   * Isso impede que uma categoria pequena fique
   * completamente bloqueada.
   */
  if (
    candidatos.length === 0 &&
    opcoes.filtros.excluirRealizados
  ) {
    candidatos = filtrarRoles(
      roles,
      {
        ...opcoes,
        filtros: {
          ...opcoes.filtros,
          excluirRealizados: false,
        },
      }
    );
  }

  /*
   * Nenhum rolê encontrado mesmo depois
   * da segunda tentativa.
   */
  if (candidatos.length === 0) {
    return {
      sucesso: false,
      resultado: null,
      candidatosDisponiveis: 0,
      mensagem:
        "Nenhum rolê encontrado com esses filtros.",
    };
  }

  const resultado =
    escolherAleatorio(candidatos);

  return {
    sucesso: resultado !== null,
    resultado,
    candidatosDisponiveis:
      candidatos.length,
  };
}