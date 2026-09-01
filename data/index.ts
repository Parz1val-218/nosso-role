import { cafes } from "./cafes";
import { lanches } from "./lanches";
import { restaurantes } from "./restaurantes";
import { filmes } from "./filmes";
import { atividadesCasa } from "./casa";
import { passeios } from "./passeios";

export const dadosPorCategoria = {
cafes,
lanches,
restaurantes,
filmes,
casa: atividadesCasa,
passeios,
} as const;
