import { Passeio } from "./types";

export const passeios: Passeio[] = [
  // =========================================================
  // INDAIATUBA
  // =========================================================

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
    nome: "Caminhar pelo Parque Ecológico",
    descricao:
      "Escolham um trecho do Parque Ecológico e façam uma caminhada tranquila juntos.",
    categoria: "passeios",
    emoji: "🚶",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-003",
    nome: "Piquenique no Parque Ecológico",
    descricao:
      "Preparem algumas comidas, levem uma toalha e aproveitem uma tarde tranquila ao ar livre.",
    categoria: "passeios",
    emoji: "🧺",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Natureza", "Piquenique", "Romântico"],
    gratuito: false,
    precoMedio: 40,
  },

  {
    id: "passeio-004",
    nome: "Passeio de bicicleta em Indaiatuba",
    descricao:
      "Escolham uma rota tranquila e explorem a cidade de bicicleta.",
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
    nome: "Caminhada no Parque do Mirim",
    descricao:
      "Passeiem pelo Parque do Mirim, aproveitando a área verde e o ambiente ao ar livre.",
    categoria: "passeios",
    emoji: "🌿",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-006",
    nome: "Pôr do sol em Indaiatuba",
    descricao:
      "Escolham um lugar aberto com uma boa vista e parem para assistir ao pôr do sol juntos.",
    categoria: "passeios",
    emoji: "🌅",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Romântico", "Natureza", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-007",
    nome: "Explorar uma praça de Indaiatuba",
    descricao:
      "Escolham uma praça que vocês normalmente não frequentam e explorem a região caminhando.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Caminhada", "Exploração", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-008",
    nome: "Tour fotográfico por Indaiatuba",
    descricao:
      "Saiam com o celular ou câmera e tentem encontrar lugares, detalhes e construções interessantes para fotografar.",
    categoria: "passeios",
    emoji: "📸",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Fotografia", "Exploração", "Cultura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-009",
    nome: "Caminhada sem destino",
    descricao:
      "Escolham uma região da cidade e simplesmente caminhem sem planejar exatamente onde vão chegar.",
    categoria: "passeios",
    emoji: "🚶",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Caminhada", "Exploração", "Romântico"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-010",
    nome: "Passeio noturno pela cidade",
    descricao:
      "Saiam à noite para caminhar por uma região movimentada da cidade e descobrir novos lugares.",
    categoria: "passeios",
    emoji: "🌙",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Noturno", "Caminhada", "Romântico"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-011",
    nome: "Dia de parque",
    descricao:
      "Separem algumas horas para ficar no parque, caminhar, conversar e simplesmente não fazer nada com pressa.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Natureza", "Relaxante", "Romântico"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-012",
    nome: "Piquenique improvisado",
    descricao:
      "Comprem algumas coisas simples e façam um piquenique sem planejar muito.",
    categoria: "passeios",
    emoji: "🧺",
    localizacao: {
      cidade: "Indaiatuba",
      estado: "SP",
    },
    tipos: ["Piquenique", "Romântico", "Comida"],
    gratuito: false,
    precoMedio: 40,
  },

  // =========================================================
  // ITU
  // =========================================================

  {
    id: "passeio-013",
    nome: "Centro Histórico de Itu",
    descricao:
      "Passeio pelo centro histórico de Itu, conhecendo praças, construções antigas e pontos tradicionais.",
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
    id: "passeio-014",
    nome: "Praça Padre Miguel",
    descricao:
      "Conheçam a região central de Itu e caminhem pela tradicional praça da cidade.",
    categoria: "passeios",
    emoji: "⛪",
    localizacao: {
      cidade: "Itu",
      estado: "SP",
    },
    tipos: ["História", "Cultura", "Caminhada"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-015",
    nome: "Tour histórico por Itu",
    descricao:
      "Passem algumas horas caminhando pelo centro de Itu e observando a arquitetura histórica.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      cidade: "Itu",
      estado: "SP",
    },
    tipos: ["História", "Cultura", "Fotografia"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-016",
    nome: "Fotografar o centro de Itu",
    descricao:
      "Façam um passeio fotográfico pelo centro histórico procurando construções e detalhes interessantes.",
    categoria: "passeios",
    emoji: "📸",
    localizacao: {
      cidade: "Itu",
      estado: "SP",
    },
    tipos: ["Fotografia", "História", "Cultura"],
    gratuito: true,
    precoMedio: 0,
  },

  // =========================================================
  // SALTO
  // =========================================================

  {
    id: "passeio-017",
    nome: "Parque da Rocha Moutonnée",
    descricao:
      "Conheçam uma área de interesse geológico e aproveitem o passeio ao ar livre.",
    categoria: "passeios",
    emoji: "🪨",
    localizacao: {
      cidade: "Salto",
      estado: "SP",
    },
    tipos: ["Natureza", "História", "Exploração"],
    gratuito: false,
    precoMedio: 20,
  },

  {
    id: "passeio-018",
    nome: "Caminhada pela região do Rio Tietê em Salto",
    descricao:
      "Explore áreas próximas ao rio e conheça alguns dos pontos turísticos da cidade.",
    categoria: "passeios",
    emoji: "🌊",
    localizacao: {
      cidade: "Salto",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "História"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-019",
    nome: "Tour cultural por Salto",
    descricao:
      "Reserve algumas horas para conhecer pontos culturais e históricos de Salto.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      cidade: "Salto",
      estado: "SP",
    },
    tipos: ["Cultura", "História", "Exploração"],
    gratuito: false,
    precoMedio: 20,
  },

  // =========================================================
  // CAMPINAS
  // =========================================================

  {
    id: "passeio-020",
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
    id: "passeio-021",
    nome: "Parque Portugal",
    descricao:
      "Passeio ao ar livre pela região da Lagoa do Taquaral, com caminhada e áreas verdes.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Lazer"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-022",
    nome: "Lagoa do Taquaral",
    descricao:
      "Caminhem pela região da lagoa, conversem e aproveitem algumas horas ao ar livre.",
    categoria: "passeios",
    emoji: "🌊",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-023",
    nome: "Museu da Imagem e do Som de Campinas",
    descricao:
      "Uma opção cultural para conhecer exposições e atividades ligadas à história audiovisual.",
    categoria: "passeios",
    emoji: "🎞️",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Cultura", "Arte", "História"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-024",
    nome: "Passeio cultural em Campinas",
    descricao:
      "Escolham um museu, centro cultural ou espaço histórico e passem a tarde conhecendo a cidade.",
    categoria: "passeios",
    emoji: "🎨",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Cultura", "Arte", "Exploração"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-025",
    nome: "Tour fotográfico por Campinas",
    descricao:
      "Escolham uma região interessante da cidade e façam um passeio fotografando arquitetura e cenas urbanas.",
    categoria: "passeios",
    emoji: "📷",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Fotografia", "Cultura", "Exploração"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-026",
    nome: "Dia de parque em Campinas",
    descricao:
      "Escolham um parque diferente e passem algumas horas caminhando e descansando.",
    categoria: "passeios",
    emoji: "🌿",
    localizacao: {
      cidade: "Campinas",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  // =========================================================
  // JUNDIAÍ
  // =========================================================

  {
    id: "passeio-027",
    nome: "Jardim Botânico de Jundiaí",
    descricao:
      "Passeio tranquilo para conhecer áreas verdes, plantas e espaços para caminhar.",
    categoria: "passeios",
    emoji: "🌺",
    localizacao: {
      cidade: "Jundiaí",
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Fotografia"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-028",
    nome: "Serra do Japi",
    descricao:
      "Conheçam a região da Serra do Japi e explorem opções de contato com a natureza.",
    categoria: "passeios",
    emoji: "⛰️",
    localizacao: {
      cidade: "Jundiaí",
      estado: "SP",
    },
    tipos: ["Natureza", "Aventura", "Trilha"],
    gratuito: false,
    precoMedio: 50,
  },

  {
    id: "passeio-029",
    nome: "Centro de Jundiaí",
    descricao:
      "Caminhem pelo centro da cidade e descubram construções, praças e lugares diferentes.",
    categoria: "passeios",
    emoji: "🏙️",
    localizacao: {
      cidade: "Jundiaí",
      estado: "SP",
    },
    tipos: ["Caminhada", "Cultura", "Exploração"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-030",
    nome: "Passeio pelas vinícolas de Jundiaí",
    descricao:
      "Conheçam uma propriedade da região e aproveitem uma experiência ligada à produção local.",
    categoria: "passeios",
    emoji: "🍇",
    localizacao: {
      cidade: "Jundiaí",
      estado: "SP",
    },
    tipos: ["Gastronomia", "Turismo", "Experiência"],
    gratuito: false,
    precoMedio: 80,
  },

  // =========================================================
  // VINHEDO
  // =========================================================

  {
    id: "passeio-031",
    nome: "Passeio por Vinhedo",
    descricao:
      "Conheçam uma cidade diferente, caminhem pelo centro e descubram lugares locais.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      cidade: "Vinhedo",
      estado: "SP",
    },
    tipos: ["Exploração", "Cultura", "Bate-volta"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-032",
    nome: "Bate-volta para Vinhedo",
    descricao:
      "Escolham um dia tranquilo para conhecer Vinhedo e explorar seus pontos turísticos.",
    categoria: "passeios",
    emoji: "🚗",
    localizacao: {
      cidade: "Vinhedo",
      estado: "SP",
    },
    tipos: ["Bate-volta", "Exploração", "Viagem"],
    gratuito: false,
    precoMedio: 80,
  },

  // =========================================================
  // VALINHOS
  // =========================================================

  {
    id: "passeio-033",
    nome: "Passeio por Valinhos",
    descricao:
      "Explore a cidade, conheça praças e procure um lugar novo para passar a tarde.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      cidade: "Valinhos",
      estado: "SP",
    },
    tipos: ["Exploração", "Caminhada", "Bate-volta"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-034",
    nome: "Rota rural de Valinhos",
    descricao:
      "Explore a região rural de Valinhos e conheça propriedades e paisagens do interior.",
    categoria: "passeios",
    emoji: "🌾",
    localizacao: {
      cidade: "Valinhos",
      estado: "SP",
    },
    tipos: ["Natureza", "Turismo", "Exploração"],
    gratuito: false,
    precoMedio: 50,
  },

  // =========================================================
  // HORTOLÂNDIA
  // =========================================================

  {
    id: "passeio-035",
    nome: "Passeio por Hortolândia",
    descricao:
      "Escolham uma região da cidade e descubram parques, praças e lugares diferentes.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      cidade: "Hortolândia",
      estado: "SP",
    },
    tipos: ["Exploração", "Caminhada", "Bate-volta"],
    gratuito: true,
    precoMedio: 0,
  },

  // =========================================================
  // AMERICANA
  // =========================================================

  {
    id: "passeio-036",
    nome: "Passeio por Americana",
    descricao:
      "Conheçam uma cidade diferente da região e explorem parques, praças e pontos locais.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      cidade: "Americana",
      estado: "SP",
    },
    tipos: ["Exploração", "Cultura", "Bate-volta"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-037",
    nome: "Dia de parque em Americana",
    descricao:
      "Escolham um parque da cidade e aproveitem o dia ao ar livre.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      cidade: "Americana",
      estado: "SP",
    },
    tipos: ["Natureza", "Lazer", "Caminhada"],
    gratuito: true,
    precoMedio: 0,
  },

  // =========================================================
  // IDEIAS DE PASSEIO
  // =========================================================

  {
    id: "passeio-038",
    nome: "Conhecer uma cidade nova",
    descricao:
      "Escolham uma cidade próxima que vocês nunca visitaram e passem algumas horas explorando.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Bate-volta", "Exploração", "Aventura"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-039",
    nome: "Bate-volta surpresa",
    descricao:
      "Escolham aleatoriamente uma cidade próxima e façam um passeio sem planejar demais.",
    categoria: "passeios",
    emoji: "🚗",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Bate-volta", "Aventura", "Surpresa"],
    gratuito: false,
    precoMedio: 120,
  },

  {
    id: "passeio-040",
    nome: "Caça a lugares desconhecidos",
    descricao:
      "Escolham uma região da cidade e procurem lugares que vocês nunca visitaram.",
    categoria: "passeios",
    emoji: "🔎",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Exploração", "Aventura", "Surpresa"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-041",
    nome: "Tour gastronômico pela cidade",
    descricao:
      "Escolham uma região e parem em lugares diferentes para experimentar comidas e bebidas.",
    categoria: "passeios",
    emoji: "🍴",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Exploração", "Experiência"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-042",
    nome: "Visitar uma feira local",
    descricao:
      "Procurem uma feira livre, feira de artesanato ou evento local e passem algumas horas conhecendo as barracas.",
    categoria: "passeios",
    emoji: "🧺",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Cultura", "Gastronomia", "Exploração"],
    gratuito: true,
    precoMedio: 40,
  },

  {
    id: "passeio-043",
    nome: "Passeio em uma feira de antiguidades",
    descricao:
      "Procurem uma feira ou mercado de antiguidades e explorem objetos e histórias diferentes.",
    categoria: "passeios",
    emoji: "🏺",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Cultura", "História", "Exploração"],
    gratuito: true,
    precoMedio: 30,
  },

  {
    id: "passeio-044",
    nome: "Visitar um museu",
    descricao:
      "Escolham um museu que vocês ainda não conhecem e façam uma tarde cultural.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Cultura", "História", "Arte"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-045",
    nome: "Visitar uma exposição de arte",
    descricao:
      "Procurem uma exposição acontecendo na região e passem algumas horas conhecendo as obras.",
    categoria: "passeios",
    emoji: "🎨",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arte", "Cultura", "Experiência"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-046",
    nome: "Passeio arquitetônico",
    descricao:
      "Escolham uma região histórica e observem prédios, fachadas e detalhes arquitetônicos.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arquitetura", "Fotografia", "Cultura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-047",
    nome: "Desafio das fotografias",
    descricao:
      "Saiam para fotografar cinco coisas diferentes: uma construção, uma pessoa, uma paisagem, uma textura e algo inesperado.",
    categoria: "passeios",
    emoji: "📸",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Fotografia", "Aventura", "Criatividade"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-048",
    nome: "Passeio para fotografar o pôr do sol",
    descricao:
      "Escolham um lugar aberto e saiam especialmente para fotografar o fim do dia.",
    categoria: "passeios",
    emoji: "🌅",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Fotografia", "Natureza", "Romântico"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-049",
    nome: "Passeio para ver as estrelas",
    descricao:
      "Procurem um local afastado das luzes da cidade e aproveitem uma noite observando o céu.",
    categoria: "passeios",
    emoji: "🌌",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Natureza", "Romântico", "Noturno"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-050",
    nome: "Trilha leve",
    descricao:
      "Escolham uma trilha curta e adequada ao nível de vocês para passar algumas horas em contato com a natureza.",
    categoria: "passeios",
    emoji: "🥾",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Trilha", "Natureza", "Aventura"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-051",
    nome: "Caminhada em área verde",
    descricao:
      "Escolham uma área verde e façam uma caminhada sem pressa.",
    categoria: "passeios",
    emoji: "🌿",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Natureza", "Caminhada", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-052",
    nome: "Pedalar juntos",
    descricao:
      "Separem as bicicletas e façam uma rota tranquila pela cidade ou região.",
    categoria: "passeios",
    emoji: "🚲",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Esporte", "Natureza", "Aventura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-053",
    nome: "Passeio de patins",
    descricao:
      "Escolham um local adequado e façam um passeio de patins juntos.",
    categoria: "passeios",
    emoji: "🛼",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Esporte", "Aventura", "Lazer"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-054",
    nome: "Alugar bicicletas",
    descricao:
      "Procurem um local com aluguel de bicicletas e explorem uma região diferente.",
    categoria: "passeios",
    emoji: "🚲",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Esporte", "Exploração", "Aventura"],
    gratuito: false,
    precoMedio: 40,
  },

  {
    id: "passeio-055",
    nome: "Passeio de kart",
    descricao:
      "Façam uma corrida de kart e descubram quem consegue chegar primeiro.",
    categoria: "passeios",
    emoji: "🏎️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Esporte", "Diversão"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-056",
    nome: "Boliche",
    descricao:
      "Uma noite de boliche para competir, rir das jogadas ruins e descobrir quem leva a partida.",
    categoria: "passeios",
    emoji: "🎳",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Diversão", "Competição", "Noturno"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-057",
    nome: "Escape room",
    descricao:
      "Tentem resolver enigmas e escapar de uma sala temática trabalhando juntos.",
    categoria: "passeios",
    emoji: "🔐",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Diversão", "Desafio"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-058",
    nome: "Fliperama",
    descricao:
      "Voltem algumas décadas e passem algumas horas jogando máquinas de arcade.",
    categoria: "passeios",
    emoji: "🕹️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Diversão", "Jogos", "Noturno"],
    gratuito: false,
    precoMedio: 50,
  },

  {
    id: "passeio-059",
    nome: "Boliche + jantar",
    descricao:
      "Juntem uma atividade divertida com uma parada para comer depois.",
    categoria: "passeios",
    emoji: "🎳",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Diversão", "Gastronomia", "Noturno"],
    gratuito: false,
    precoMedio: 120,
  },

  {
    id: "passeio-060",
    nome: "Dia de shopping",
    descricao:
      "Passeiem pelo shopping, olhem lojas, experimentem coisas diferentes e escolham algum lugar para comer.",
    categoria: "passeios",
    emoji: "🛍️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Compras", "Gastronomia", "Lazer"],
    gratuito: true,
    precoMedio: 100,
  },

  {
    id: "passeio-061",
    nome: "Passeio de vitrines",
    descricao:
      "Entrem em lojas que vocês normalmente não visitariam e descubram coisas diferentes.",
    categoria: "passeios",
    emoji: "🛍️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Compras", "Exploração", "Lazer"],
    gratuito: true,
    precoMedio: 50,
  },

  {
    id: "passeio-062",
    nome: "Visitar uma livraria",
    descricao:
      "Passem um tempo em uma livraria procurando livros que chamem a atenção de vocês.",
    categoria: "passeios",
    emoji: "📚",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Cultura", "Relaxante", "Exploração"],
    gratuito: true,
    precoMedio: 50,
  },

  {
    id: "passeio-063",
    nome: "Tour de cafés",
    descricao:
      "Escolham dois ou três cafés diferentes e façam uma pequena rota gastronômica.",
    categoria: "passeios",
    emoji: "☕",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Exploração", "Romântico"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-064",
    nome: "Tour de sobremesas",
    descricao:
      "Escolham uma região e procurem lugares diferentes para experimentar sobremesas.",
    categoria: "passeios",
    emoji: "🍰",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Exploração", "Romântico"],
    gratuito: false,
    precoMedio: 70,
  },

  {
    id: "passeio-065",
    nome: "Experimentar uma comida nova",
    descricao:
      "Escolham uma culinária que vocês normalmente não comem e procurem um lugar para experimentar.",
    categoria: "passeios",
    emoji: "🍜",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Aventura", "Experiência"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-066",
    nome: "Feira gastronômica",
    descricao:
      "Procurem uma feira gastronômica e experimentem comidas diferentes em pequenas porções.",
    categoria: "passeios",
    emoji: "🍴",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Cultura", "Exploração"],
    gratuito: true,
    precoMedio: 80,
  },

  {
    id: "passeio-067",
    nome: "Passeio romântico ao ar livre",
    descricao:
      "Escolham um lugar tranquilo, levem alguma coisa para comer e aproveitem algumas horas juntos.",
    categoria: "passeios",
    emoji: "❤️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Romântico", "Natureza", "Relaxante"],
    gratuito: false,
    precoMedio: 40,
  },

  {
    id: "passeio-068",
    nome: "Date surpresa",
    descricao:
      "Uma pessoa escolhe o lugar e a outra só descobre quando chegar.",
    categoria: "passeios",
    emoji: "🎁",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Romântico", "Surpresa", "Aventura"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-069",
    nome: "Passeio sem celular",
    descricao:
      "Escolham um lugar tranquilo e passem algumas horas sem ficar mexendo no celular.",
    categoria: "passeios",
    emoji: "📵",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Romântico", "Relaxante", "Conversa"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-070",
    nome: "Caminhar conversando",
    descricao:
      "Escolham uma região tranquila e façam uma caminhada longa apenas conversando.",
    categoria: "passeios",
    emoji: "💬",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Caminhada", "Romântico", "Conversa"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-071",
    nome: "Passeio para desenhar",
    descricao:
      "Levem papel e lápis e escolham um lugar bonito para desenhar o que estiver ao redor.",
    categoria: "passeios",
    emoji: "✏️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arte", "Criatividade", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-072",
    nome: "Pintar ao ar livre",
    descricao:
      "Escolham uma paisagem interessante e tentem pintar juntos, mesmo que o resultado seja questionável.",
    categoria: "passeios",
    emoji: "🎨",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arte", "Criatividade", "Natureza"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-073",
    nome: "Tour de arquitetura",
    descricao:
      "Escolham uma cidade histórica e procurem construções interessantes para observar e fotografar.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arquitetura", "Fotografia", "Cultura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-074",
    nome: "Visitar uma igreja histórica",
    descricao:
      "Conheçam uma igreja histórica da região e observem sua arquitetura e detalhes.",
    categoria: "passeios",
    emoji: "⛪",
    localizacao: {
      estado: "SP",
    },
    tipos: ["História", "Arquitetura", "Cultura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-075",
    nome: "Tour pelas praças",
    descricao:
      "Escolham três praças de uma cidade e façam um passeio conhecendo cada uma delas.",
    categoria: "passeios",
    emoji: "🌳",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Caminhada", "Exploração", "Natureza"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-076",
    nome: "Explorar um bairro diferente",
    descricao:
      "Escolham um bairro que vocês quase nunca visitam e explorem suas ruas e comércios.",
    categoria: "passeios",
    emoji: "🗺️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Exploração", "Caminhada", "Aventura"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-077",
    nome: "Passeio de carro sem destino",
    descricao:
      "Entrem no carro, escolham uma direção e descubram algum lugar interessante pelo caminho.",
    categoria: "passeios",
    emoji: "🚗",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Exploração", "Surpresa"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-078",
    nome: "Rodar por estradas do interior",
    descricao:
      "Façam um passeio de carro pelas estradas da região, procurando paisagens e pequenas cidades.",
    categoria: "passeios",
    emoji: "🛣️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Viagem", "Exploração", "Aventura"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-079",
    nome: "Bate-volta para uma cidade histórica",
    descricao:
      "Escolham uma cidade histórica da região e passem o dia explorando seu centro.",
    categoria: "passeios",
    emoji: "🏛️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["História", "Viagem", "Bate-volta"],
    gratuito: false,
    precoMedio: 120,
  },

  {
    id: "passeio-080",
    nome: "Bate-volta gastronômico",
    descricao:
      "Escolham uma cidade próxima conhecida pela gastronomia e façam uma pequena viagem para comer.",
    categoria: "passeios",
    emoji: "🍽️",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Viagem", "Bate-volta"],
    gratuito: false,
    precoMedio: 150,
  },

  // =========================================================
  // MAIS EXPERIÊNCIAS
  // =========================================================

  {
    id: "passeio-081",
    nome: "Visitar um jardim",
    descricao:
      "Procurem um jardim ou espaço botânico da região e passem algumas horas caminhando.",
    categoria: "passeios",
    emoji: "🌺",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Natureza", "Fotografia", "Relaxante"],
    gratuito: true,
    precoMedio: 0,
  },

  {
    id: "passeio-082",
    nome: "Conhecer uma fazenda",
    descricao:
      "Procurem uma propriedade rural aberta à visitação e conheçam um pouco da vida no interior.",
    categoria: "passeios",
    emoji: "🐄",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Natureza", "Turismo", "Experiência"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-083",
    nome: "Turismo rural",
    descricao:
      "Escolham uma propriedade rural ou rota turística da região para passar o dia.",
    categoria: "passeios",
    emoji: "🌾",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Natureza", "Turismo", "Bate-volta"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-084",
    nome: "Visitar uma cervejaria artesanal",
    descricao:
      "Conheçam uma cervejaria da região e façam uma experiência gastronômica.",
    categoria: "passeios",
    emoji: "🍺",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Experiência", "Noturno"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-085",
    nome: "Noite de jogos",
    descricao:
      "Procurem um espaço de jogos de tabuleiro, cartas ou atividades semelhantes.",
    categoria: "passeios",
    emoji: "🎲",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Jogos", "Diversão", "Noturno"],
    gratuito: false,
    precoMedio: 50,
  },

  {
    id: "passeio-086",
    nome: "Aula experimental de dança",
    descricao:
      "Façam juntos uma aula experimental de algum estilo de dança.",
    categoria: "passeios",
    emoji: "💃",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Dança", "Diversão", "Experiência"],
    gratuito: false,
    precoMedio: 50,
  },

  {
    id: "passeio-087",
    nome: "Aula experimental de culinária",
    descricao:
      "Aprendam a preparar alguma receita diferente em uma aula ou workshop.",
    categoria: "passeios",
    emoji: "👨‍🍳",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Experiência", "Aprendizado"],
    gratuito: false,
    precoMedio: 120,
  },

  {
    id: "passeio-088",
    nome: "Workshop criativo",
    descricao:
      "Procurem uma oficina de cerâmica, pintura, desenho ou outra atividade artística.",
    categoria: "passeios",
    emoji: "🎨",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arte", "Criatividade", "Experiência"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-089",
    nome: "Visitar uma exposição de carros",
    descricao:
      "Procurem um evento ou exposição automotiva na região.",
    categoria: "passeios",
    emoji: "🚘",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Eventos", "Carros", "Diversão"],
    gratuito: false,
    precoMedio: 50,
  },

  {
    id: "passeio-090",
    nome: "Ir a um evento local",
    descricao:
      "Procurem shows, feiras, festivais ou eventos acontecendo na região.",
    categoria: "passeios",
    emoji: "🎪",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Eventos", "Diversão", "Cultura"],
    gratuito: false,
    precoMedio: 80,
  },

  {
    id: "passeio-091",
    nome: "Festival gastronômico",
    descricao:
      "Procurem um festival gastronômico acontecendo na região e experimentem coisas diferentes.",
    categoria: "passeios",
    emoji: "🍔",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Gastronomia", "Eventos", "Exploração"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-092",
    nome: "Feira de artesanato",
    descricao:
      "Conheçam uma feira de artesanato e procurem peças e trabalhos feitos por artistas locais.",
    categoria: "passeios",
    emoji: "🧶",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Arte", "Cultura", "Compras"],
    gratuito: true,
    precoMedio: 40,
  },

  {
    id: "passeio-093",
    nome: "Passeio de trem turístico",
    descricao:
      "Procurem uma experiência de trem turístico disponível na região e façam um passeio diferente.",
    categoria: "passeios",
    emoji: "🚂",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Turismo", "História", "Experiência"],
    gratuito: false,
    precoMedio: 150,
  },

  {
    id: "passeio-094",
    nome: "Visitar um observatório",
    descricao:
      "Procurem um observatório ou evento de astronomia aberto ao público.",
    categoria: "passeios",
    emoji: "🔭",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Ciência", "Noturno", "Experiência"],
    gratuito: false,
    precoMedio: 30,
  },

  {
    id: "passeio-095",
    nome: "Passeio de aventura",
    descricao:
      "Escolham uma atividade de aventura disponível na região, como arvorismo, escalada ou outra experiência.",
    categoria: "passeios",
    emoji: "🧗",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Esporte", "Experiência"],
    gratuito: false,
    precoMedio: 120,
  },

  {
    id: "passeio-096",
    nome: "Arvorismo",
    descricao:
      "Encarem um circuito de arvorismo e passem algumas horas fazendo algo diferente.",
    categoria: "passeios",
    emoji: "🌲",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Natureza", "Esporte"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-097",
    nome: "Paintball",
    descricao:
      "Divirtam-se em uma partida de paintball e descubram quem tem melhor estratégia.",
    categoria: "passeios",
    emoji: "🎯",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Aventura", "Competição", "Diversão"],
    gratuito: false,
    precoMedio: 100,
  },

  {
    id: "passeio-098",
    nome: "Parque de diversões",
    descricao:
      "Passem o dia em um parque de diversões aproveitando brinquedos e atrações.",
    categoria: "passeios",
    emoji: "🎢",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Diversão", "Aventura", "Família"],
    gratuito: false,
    precoMedio: 150,
  },

  {
    id: "passeio-099",
    nome: "Parque aquático",
    descricao:
      "Passem um dia diferente em um parque aquático da região.",
    categoria: "passeios",
    emoji: "🌊",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Diversão", "Aventura", "Lazer"],
    gratuito: false,
    precoMedio: 150,
  },

  {
    id: "passeio-100",
    nome: "Dia de turismo na região",
    descricao:
      "Escolham uma cidade próxima e montem um roteiro improvisado com três lugares para conhecer.",
    categoria: "passeios",
    emoji: "🧭",
    localizacao: {
      estado: "SP",
    },
    tipos: ["Turismo", "Exploração", "Bate-volta"],
    gratuito: false,
    precoMedio: 100,
  },
];