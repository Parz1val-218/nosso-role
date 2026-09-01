import { Categoria, Role } from "@/data/types";
import { dadosPorCategoria } from "@/data";
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

function correspondeLocalizacao(
role: Role,
cidade?: string,
estado?: string
): boolean {
if (!cidade && !estado) {
return true;
}

if (role.categoria === "filmes") {
return true;
}

if (role.categoria === "casa") {
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

function correspondePreco(
role: Role,
precoMaximo?: number
): boolean {
if (precoMaximo === undefined) {
return true;
}

if (
role.categoria === "filmes" ||
role.categoria === "casa"
) {
return true;
}

if (
role.categoria === "passeios" &&
role.gratuito
) {
return true;
}

if (role.precoMedio === undefined) {
return true;
}

return role.precoMedio <= precoMaximo;
}

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
if (
role.categoria !==
filtros.categoria
) {
return false;
}


if (
  !correspondeLocalizacao(
    role,
    filtros.cidade,
    filtros.estado
  )
) {
  return false;
}

if (
  !correspondePreco(
    role,
    filtros.precoMaximo
  )
) {
  return false;
}

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

export function sortearRole(
roles: Role[],
opcoes: OpcoesSorteio
): ResultadoSorteio {
const candidatos =
filtrarRoles(
roles,
opcoes
);

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
escolherAleatorio(
candidatos
);

return {
sucesso: resultado !== null,
resultado,
candidatosDisponiveis:
candidatos.length,
};
}
