import { Restaurante } from "./types";

export const restaurantes: Restaurante[] = [
{
id: "restaurante-001",
nome: "Restaurante Exemplo",
descricao:
"Restaurante aconchegante para um jantar a dois.",
categoria: "restaurantes",
emoji: "🍝",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
culinaria: ["Italiana", "Massas"],
precoMedio: 80,
},

{
id: "restaurante-002",
nome: "Restaurante Exemplo 2",
descricao:
"Uma opção descontraída para comer bem juntos.",
categoria: "restaurantes",
emoji: "🍽️",
localizacao: {
cidade: "Indaiatuba",
estado: "SP",
endereco: "Centro",
},
culinaria: ["Brasileira"],
precoMedio: 60,
},
];
