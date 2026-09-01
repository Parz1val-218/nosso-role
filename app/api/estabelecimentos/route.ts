import { NextResponse } from "next/server";

type GooglePlace = {
  id?: string;

  displayName?: {
    text?: string;
  };

  location?: {
    latitude?: number;
    longitude?: number;
  };

  types?: string[];

  priceLevel?: string;

  rating?: number;

  userRatingCount?: number;

  nationalPhoneNumber?: string;

  websiteUri?: string;

  googleMapsUri?: string;

  photos?: {
    name?: string;
  }[];
};

function determinarCategoria(
  tipos: string[]
): "cafes" | "lanches" | "restaurantes" | null {
  const tiposNormalizados = tipos.map((tipo) =>
    tipo.toLowerCase()
  );

  /*
   * CAFÉS
   */

  if (
    tiposNormalizados.includes("coffee_shop") ||
    tiposNormalizados.includes("cafe")
  ) {
    return "cafes";
  }

  /*
   * LANCHES
   */

  const tiposLanche = [
    "fast_food_restaurant",
    "hamburger_restaurant",
    "sandwich_shop",
    "pizza_restaurant",
    "bakery",
    "dessert_shop",
    "ice_cream_shop",
  ];

  if (
    tiposNormalizados.some((tipo) =>
      tiposLanche.includes(tipo)
    )
  ) {
    return "lanches";
  }

  /*
   * RESTAURANTES
   */

  if (
    tiposNormalizados.includes("restaurant") ||
    tiposNormalizados.some((tipo) =>
      tipo.endsWith("_restaurant")
    )
  ) {
    return "restaurantes";
  }

  return null;
}

function converterPreco(
  priceLevel?: string
): number | undefined {
  switch (priceLevel) {
    case "PRICE_LEVEL_FREE":
      return 0;

    case "PRICE_LEVEL_INEXPENSIVE":
      return 30;

    case "PRICE_LEVEL_MODERATE":
      return 70;

    case "PRICE_LEVEL_EXPENSIVE":
      return 120;

    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return 200;

    default:
      return undefined;
  }
}

function criarRole(
  lugar: GooglePlace,
  cidade: string,
  estado: string
) {
  const nome = lugar.displayName?.text;

  if (!nome) {
    return null;
  }

  const categoria = determinarCategoria(
    lugar.types ?? []
  );

  if (!categoria) {
    return null;
  }

  const latitude =
    lugar.location?.latitude;

  const longitude =
    lugar.location?.longitude;

  return {
    id: `google-${lugar.id ?? nome}`,

    nome,

    descricao:
      categoria === "cafes"
        ? "Café encontrado próximo de vocês."
        : categoria === "lanches"
        ? "Lugar para comer algo."
        : "Restaurante encontrado próximo de vocês.",

    categoria,

    emoji:
      categoria === "cafes"
        ? "☕"
        : categoria === "lanches"
        ? "🍔"
        : "🍝",

    localizacao: {
      cidade,
      estado,

      ...(latitude !== undefined
        ? { latitude }
        : {}),

      ...(longitude !== undefined
        ? { longitude }
        : {}),
    },

    precoMedio: converterPreco(
      lugar.priceLevel
    ),

    avaliacaoGoogle:
      lugar.rating,

    quantidadeAvaliacoesGoogle:
      lugar.userRatingCount,

    telefone:
      lugar.nationalPhoneNumber,

    websiteUri:
      lugar.websiteUri,

    googleMapsUri:
      lugar.googleMapsUri,

    fotos:
      lugar.photos?.map(
        (foto) => foto.name
      ).filter(
        (foto): foto is string =>
          Boolean(foto)
      ),
  };
}

export async function POST(
  request: Request
) {
  try {
    const corpo =
      await request.json();

    const cidade =
      typeof corpo.cidade === "string"
        ? corpo.cidade.trim()
        : "";

    const estado =
      typeof corpo.estado === "string"
        ? corpo.estado.trim()
        : "";

    if (!cidade || !estado) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Cidade e estado são obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error(
        "GOOGLE_MAPS_API_KEY não configurada."
      );

      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Chave da API do Google não configurada.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * =====================================================
     * BUSCAS
     * =====================================================
     */

    const consultas = [
      `restaurantes em ${cidade}, ${estado}, Brasil`,
      `lanchonetes em ${cidade}, ${estado}, Brasil`,
      `cafés em ${cidade}, ${estado}, Brasil`,
    ];

    const resultadosGoogle: GooglePlace[] = [];

    /*
     * =====================================================
     * GOOGLE PLACES
     * =====================================================
     */

    for (const textQuery of consultas) {
      const resposta = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "X-Goog-Api-Key":
              apiKey,

            "X-Goog-FieldMask": [
              "places.id",
              "places.displayName",
              "places.location",
              "places.types",
              "places.priceLevel",
              "places.rating",
              "places.userRatingCount",
              "places.nationalPhoneNumber",
              "places.websiteUri",
              "places.googleMapsUri",
              "places.photos",
            ].join(","),
          },

          body: JSON.stringify({
            textQuery,

            languageCode: "pt-BR",

            regionCode: "BR",

            pageSize: 20,
          }),

          cache: "no-store",
        }
      );

      if (!resposta.ok) {
        const erro =
          await resposta.text();

        console.error(
          "Erro Google Places:",
          erro
        );

        continue;
      }

      const dados =
        await resposta.json();

      if (
        Array.isArray(
          dados.places
        )
      ) {
        resultadosGoogle.push(
          ...dados.places
        );
      }
    }

    /*
     * =====================================================
     * TRANSFORMAR
     * =====================================================
     */

    const roles =
      resultadosGoogle
        .map((lugar) =>
          criarRole(
            lugar,
            cidade,
            estado
          )
        )
        .filter(
          (
            role
          ): role is NonNullable<
            ReturnType<typeof criarRole>
          > =>
            role !== null
        );

    /*
     * =====================================================
     * REMOVER DUPLICADOS
     * =====================================================
     */

    const unicos =
      Array.from(
        new Map(
          roles.map(
            (role) => [
              role.id,
              role,
            ]
          )
        ).values()
      );

    /*
     * =====================================================
     * RETORNO
     * =====================================================
     */

    return NextResponse.json({
      sucesso: true,

      cidade,

      estado,

      quantidade:
        unicos.length,

      resultados:
        unicos,
    });
  } catch (erro) {
    console.error(
      "Erro na API de estabelecimentos:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,

        mensagem:
          erro instanceof Error
            ? erro.message
            : "Erro desconhecido ao buscar estabelecimentos.",
      },
      {
        status: 500,
      }
    );
  }
}