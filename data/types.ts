export type Categoria =
  | "cafes"
  | "lanches"
  | "restaurantes"
  | "filmes"
  | "casa"
  | "passeios";

export type Localizacao = {
  cidade?: string;
  estado?: string;
  endereco?: string;
  latitude?: number;
  longitude?: number;
};

export type RoleBase = {
  id: string;
  nome: string;
  descricao: string;
  categoria: Categoria;
  emoji: string;

  localizacao?: Localizacao;

  precoMedio?: number;

  // Dados vindos do Google
  avaliacaoGoogle?: number | null;
  quantidadeAvaliacoesGoogle?: number | null;
  telefone?: string | null;
  websiteUri?: string | null;
  googleMapsUri?: string | null;
};

export type Cafe = RoleBase & {
  categoria: "cafes";
  localizacao: Localizacao;
};

export type Lanche = RoleBase & {
  categoria: "lanches";
  localizacao: Localizacao;
  tipos: string[];
};

export type Restaurante = RoleBase & {
  categoria: "restaurantes";
  localizacao: Localizacao;
  culinaria: string[];
};

export type Filme = RoleBase & {
  categoria: "filmes";
  generos: string[];
  ano: number;
  duracao: string;
  streaming: string[];
};

export type Passeio = RoleBase & {
  categoria: "passeios";
  localizacao: Localizacao;
  tipos: string[];
  gratuito: boolean;
};

export type Casa = RoleBase & {
  categoria: "casa";
  tipos: string[];
  publico: ("casal" | "sozinho" | "grupo")[];

  // Algumas atividades de casa podem permitir
  // sorteio de filme.
  sorteiaFilme?: boolean;
};

export type Role =
  | Cafe
  | Lanche
  | Restaurante
  | Filme
  | Passeio
  | Casa;