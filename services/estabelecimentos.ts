import { Role } from "@/data/types";

type ResultadoOSM = {
  place_id: number;
  lat: string;
  lon: string;
  name?: string;
  type?: string;
  category?: string;
  address?: {
    city?: string;
    town?: string;
    municipality?: string;
    village?: string;
    state?: string;
    state_code?: string;
    road?: string;
    house_number?: string;
  };
};

function normalizarEstado(
  estado?: string
): string {
  if (!estado) {
    return "";
  }

  if (
    estado.startsWith("BR-")
  ) {
    return estado
      .replace("BR-", "")
      .toUpperCase();
  }

  const estados: Record<
    string,
    string
  > = {
    Acre: "AC",
    Alagoas: "AL",
    Amapá: "AP",
    Amazonas: "AM",
    Bahia: "BA",
    Ceará: "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    Goiás: "GO",
    Maranhão: "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    Pará: "PA",
    Paraíba: "PB",
    Paraná: "PR",
    Pernambuco: "PE",
    Piauí: "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    Rondônia: "RO",
    Roraima: "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    Sergipe: "SE",
    Tocantins: "TO",
  };

  return (
    estados[estado] ??
    estado.toUpperCase()
  );
}

function determinarCategoria(
  resultado: ResultadoOSM
): Role["categoria"] | null {
  const tipo =
    `${resultado.type ?? ""} ${
      resultado.category ?? ""
    }`.toLowerCase();

  if (
    tipo.includes("cafe") ||
    tipo.includes("coffee")
  ) {
    return "cafes";
  }

  if (
    tipo.includes("restaurant") ||
    tipo.includes("food")
  ) {
    return "restaurantes";
  }

  if (
    tipo.includes("fast_food") ||
    tipo.includes("bakery")
  ) {
    return "lanches";
  }

  return null;
}

function criarRole(
  resultado: ResultadoOSM
): Role | null {
  if (!resultado.name) {
    return null;
  }

  const categoria =
    determinarCategoria(resultado);

  if (!categoria) {
    return null;
  }

  const endereco =
    resultado.address ?? {};

  const cidade =
    endereco.city ??
    endereco.town ??
    endereco.municipality ??
    endereco.village ??
    "";

  const estado =
    normalizarEstado(
      endereco.state_code ??
        endereco.state
    );

  return {
    id: `osm-${resultado.place_id}`,

    nome: resultado.name,

    descricao:
      categoria === "cafes"
        ? "Café encontrado próximo de vocês."
        : categoria ===
          "lanches"
        ? "Lugar para comer algo."
        : "Restaurante encontrado próximo de vocês.",

    categoria,

    emoji:
      categoria === "cafes"
        ? "☕"
        : categoria ===
          "lanches"
        ? "🍔"
        : "🍝",

    localizacao: {
      cidade,
      estado,

      latitude:
        Number(resultado.lat),

      longitude:
        Number(resultado.lon),
    },
  } as Role;
}

export async function buscarEstabelecimentos(
  cidade: string,
  estado: string
): Promise<Role[]> {
  if (
    !cidade.trim() ||
    !estado.trim()
  ) {
    return [];
  }

  const consulta = encodeURIComponent(
    `${cidade}, ${estado}, Brasil`
  );

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?format=jsonv2` +
    `&q=${consulta}` +
    `&limit=1` +
    `&addressdetails=1`;

  const resposta = await fetch(
    url,
    {
      headers: {
        Accept:
          "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível localizar a cidade."
    );
  }

  const cidades =
    await resposta.json();

  if (
    !Array.isArray(cidades) ||
    cidades.length === 0
  ) {
    throw new Error(
      "Cidade não encontrada."
    );
  }

  const latitude =
    Number(cidades[0].lat);

  const longitude =
    Number(cidades[0].lon);

  /*
   * Busca estabelecimentos
   * próximos ao centro da cidade.
   *
   * Esta etapa usa Overpass/OpenStreetMap.
   */

  const overpassQuery = `
[out:json][timeout:25];

(
  node["amenity"="cafe"](around:15000,${latitude},${longitude});
  node["amenity"="restaurant"](around:15000,${latitude},${longitude});
  node["amenity"="fast_food"](around:15000,${latitude},${longitude});
  node["amenity"="bakery"](around:15000,${latitude},${longitude});
);

out body;
`;

  const overpassResposta =
    await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain",
        },

        body: overpassQuery,
      }
    );

  if (
    !overpassResposta.ok
  ) {
    throw new Error(
      "Não foi possível buscar estabelecimentos."
    );
  }

  const dados =
    await overpassResposta.json();

  const elementos =
    Array.isArray(
      dados.elements
    )
      ? dados.elements
      : [];

  const resultados: ResultadoOSM[] =
    elementos.map(
      (elemento: any) => ({
        place_id:
          elemento.id,

        lat:
          String(
            elemento.lat
          ),

        lon:
          String(
            elemento.lon
          ),

        name:
          elemento.tags?.name,

        type:
          elemento.tags?.amenity,

        category:
          elemento.tags?.cuisine,

        address: {
          city,
          state: estado,
        },
      })
    );

  const roles = resultados
    .map(criarRole)
    .filter(
      (
        role
      ): role is Role =>
        role !== null
    );

  /*
   * Remove estabelecimentos
   * sem nome e duplicados.
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

  return unicos;
}