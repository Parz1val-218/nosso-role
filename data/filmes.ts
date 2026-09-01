import { Filme } from "./types";

export const filmes: Filme[] = [
  {
    id: "filme-001",
    nome: "Filme de Exemplo",
    descricao: "Uma comédia leve para assistir juntos.",
    categoria: "filmes",
    emoji: "🎬",
    generos: ["Comédia"],
    ano: 2024,
    duracao: "1h 45min",
    streaming: ["Netflix"],
  },

  {
    id: "filme-002",
    nome: "Filme de Exemplo 2",
    descricao: "Uma aventura divertida para uma noite tranquila.",
    categoria: "filmes",
    emoji: "🎬",
    generos: ["Aventura", "Comédia"],
    ano: 2023,
    duracao: "2h 05min",
    streaming: ["Prime Video"],
  },

  {
    id: "filme-003",
    nome: "Filme de Exemplo 3",
    descricao: "Um filme para assistir juntos e discutir depois.",
    categoria: "filmes",
    emoji: "🎬",
    generos: ["Drama", "Romance"],
    ano: 2022,
    duracao: "1h 58min",
    streaming: ["Max"],
  },

  {
    id: "filme-004",
    nome: "Filme de Exemplo 4",
    descricao: "Uma opção divertida para uma sessão de cinema em casa.",
    categoria: "filmes",
    emoji: "🎬",
    generos: ["Comédia", "Romance"],
    ano: 2025,
    duracao: "1h 52min",
    streaming: ["Disney+"],
  },
];