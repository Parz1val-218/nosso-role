import { Lanche } from "./types";

export const lanches: Lanche[] = [
{
id: "lanche-001",
nome: "Lanche Exemplo",
descricao:
"Uma opção descontraída para matar a fome.",
categoria: "lanches",
emoji: "🍔",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
tipos: ["Hambúrguer"],
precoMedio: 35,
},

{
id: "lanche-002",
nome: "Lanche Exemplo 2",
descricao:
"Lanche caprichado para uma refeição rápida.",
categoria: "lanches",
emoji: "🍔",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
tipos: ["Hambúrguer", "Artesanal"],
precoMedio: 45,
},

{
id: "lanche-003",
nome: "Lanche Exemplo 3",
descricao:
"Uma opção leve para comer e continuar o rolê.",
categoria: "lanches",
emoji: "🌮",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
tipos: ["Mexicano"],
precoMedio: 40,
},

{
id: "lanche-004",
nome: "Lanche Exemplo 4",
descricao:
"Uma opção econômica para um lanche rápido.",
categoria: "lanches",
emoji: "🥪",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
tipos: ["Sanduíche"],
precoMedio: 25,
},
];
