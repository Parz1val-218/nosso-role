
import { Passeio } from "./types";

export const passeios: Passeio[] = [
  {
    id: "passeio-001",
    nome: "Parque Ecológico de Indaiatuba",
    descricao:
      "Área verde para caminhar, conversar, fazer um piquenique e passar algumas horas ao ar livre.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
      endereco: "Av. Eng. Fábio Roberto Barnabé",
      latitude: -23.0916,
      longitude: -47.2096,
    },
    tipos: ["Natureza", "Caminhada", "Piquenique"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-002",
    nome: "Centro de Itu",
    descricao:
      "Passeio pelo centro histórico de Itu, conhecendo praças, construções antigas e pontos tradicionais da cidade.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      cidade: "Itu",
      estado: "SP",
      endereco: "Centro Histórico",
      latitude: -23.2642,
      longitude: -47.2995,
    },
    tipos: ["História", "Cultura", "Caminhada"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-003",
    nome: "Centro Histórico de Campinas",
    descricao:
      "Uma opção para caminhar pelo centro, conhecer construções históricas e descobrir lugares diferentes.",
    categoria: "passeios",
    emoji: "🏙️",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
      endereco: "Centro",
      latitude: -22.9056,
      longitude: -47.0608,
    },
    tipos: ["História", "Cultura", "Caminhada"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-004",
    nome: "Passeio de bicicleta",
    descricao:
      "Escolham uma rota tranquila, peguem as bicicletas e explorem a cidade juntos.",
    categoria: "passeios",
    emoji: "🚲",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Esporte", "Natureza", "Aventura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-005",
    nome: "Piquenique ao ar livre",
    descricao:
      "Preparem uma cesta com comidas e bebidas e escolham um parque ou área verde para passar a tarde.",
    categoria: "passeios",
    emoji: "🧺",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Natureza", "Comida", "Romântico"],
    gratuito: true,
    precoMedio: 30,
  },

  {
    id: "passeio-006",
    nome: "Explorar uma cidade vizinha",
    descricao:
      "Escolham uma cidade próxima que vocês ainda não conhecem e passem o dia explorando.",
    categoria: "passeios",
    emoji: "🚗",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Viagem", "Aventura", "Exploração"],
    gratuito: false,
    precoMedio: 100,
  },
];

