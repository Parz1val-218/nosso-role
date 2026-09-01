import { Role } from "@/data/types";

type GooglePlace = {
  id: string;

  displayName?: {
    text?: string;
  };

  primaryType?: string;

  types?: string[];

  location?: {
    latitude?: number;
    longitude?: number;
  };
};

type RespostaGoogle = {
  places?: GooglePlace[];
};

function determinarCategoria(
  lugar: GooglePlace
): Role["categoria"] | null {
  const tipos = [
    lugar.primaryType ?? "",
    ...(lugar.types ?? []),
  ].map((tipo) => tipo.toLowerCase());

  /*
   * CAFÉS
   */
  if (
    tipos.includes("cafe") ||
    tipos.includes("coffee_shop")
  ) {
    return "cafes";
  }

  /*
   * LANCHES
   */
  const tiposLanche = [
    "fast_food_restaurant",
    "hamburger_restaurant",
    "pizza_restaurant",
    "sandwich_shop",
    "bakery",
    "ice_cream_shop",
    "dessert_shop",
  ];

  if (
    tipos.some((tipo) =>
      tiposLanche.includes(tipo)
    )
  ) {
    return "lanches";
  }

  /*
   * RESTAURANTES
   */
  if (
    tipos.includes("restaurant") ||
    tipos.some((tipo) =>
      tipo.endsWith("_restaurant")
    )
  ) {
    return "restaurantes";
  }

  return null;
}

function criarRole(
  lugar: GooglePlace,
  cidade: string,
  estado: string
): Role | null {
  const nome =
    lugar.displayName?.text?.trim();

  if (!nome) {
    return null;
  }

  const categoria =
    determinarCategoria(lugar);

  if (!categoria) {
    return null;
  }

  const emoji =
    categoria === "cafes"
      ? "☕"
      : categoria === "lanches"
      ? "🍔"
      : "🍝";

  return {
    id: `google-${lugar.id}`,

    nome,

    descricao:
      categoria === "cafes"
        ? "Café encontrado na região."
        : categoria === "lanches"
        ? "Lugar para comer algo."
        : "Restaurante encontrado na região.",

    categoria,

    emoji,

    localizacao: {
      cidade,
      estado,

      latitude:
        lugar.location?.latitude,

      longitude:
        lugar.location?.longitude,
    },
  } as Role;
}

export async function buscarLugaresGoogle(
  cidade: string,
  estado: string
): Promise<Role[]> {
  if (
    !cidade.trim() ||
    !estado.trim()
  ) {
    return [];
  }

  const resposta =
    await fetch(
      "/api/estabelecimentos/google",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          cidade,
          estado,
        }),
      }
    );

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível buscar estabelecimentos."
    );
  }

  const dados: RespostaGoogle =
    await resposta.json();

  const lugares =
    Array.isArray(dados.places)
      ? dados.places
      : [];

  return lugares
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
      ): role is Role =>
        role !== null
    );
}