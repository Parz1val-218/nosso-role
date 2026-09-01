tsx
"use client";

import { HistoricoItem } from "@/services/armazenamento";

type EstatisticasProps = {
  historico: HistoricoItem[];
  favoritos: number;
};

export default function Estatisticas({
  historico,
  favoritos,
}: EstatisticasProps) {
  const totalAvaliacoes = historico.filter(
    (role) => role.avaliacao
  ).length;

  const notas = historico
    .filter((role) => role.avaliacao)
    .map((role) => role.avaliacao!.nota);

  const mediaNota =
    notas.length > 0
      ? notas.reduce(
          (total, nota) => total + nota,
          0
        ) / notas.length
      : 0;

  const gastos = historico
    .map((role) => role.avaliacao?.gasto)
    .filter(
      (gasto): gasto is number =>
        gasto !== undefined
    );

  const totalGasto = gastos.reduce(
    (total, gasto) => total + gasto,
    0
  );

  const mediaGasto =
    gastos.length > 0
      ? totalGasto / gastos.length
      : 0;

  const categorias = historico.reduce<
    Record<string, number>
  >((resultado, role) => {
    resultado[role.categoria] =
      (resultado[role.categoria] || 0) + 1;

    return resultado;
  }, {});

  const categoriaMaisRealizada =
    Object.entries(categorias).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const nomeCategoria = (
    categoria: string
  ) => {
    const nomes: Record<string, string> = {
      cafes: "☕ Cafés",
      lanches: "🍔 Lanches",
      restaurantes: "🍝 Restaurantes",
      filmes: "🎬 Filmes",
      casa: "🏠 Em casa",
      passeios: "🚶 Passeios",
    };

    return (
      nomes[categoria] ?? categoria
    );
  };

  return (
    <section>
      <div className="rounded-[26px] bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold">
          📊 Estatísticas
        </h2>

        <p className="mt-1 text-sm text-[#77716c]">
          Um pequeno relatório da vida de vocês.
        </p>

        {historico.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-5 text-center">

            <div
              className="text-3xl"
              aria-hidden="true"
            >
              📈
            </div>

            <p className="mt-2 text-sm text-[#77716c]">
              Ainda não existem dados suficientes.
            </p>

            <p className="mt-1 text-xs text-[#9a938d]">
              Façam alguns rolês e avaliem depois.
            </p>

          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-[#f6f4f1] p-4">
              <div className="text-2xl">
                🎲
              </div>

              <div className="mt-2 text-2xl font-bold">
                {historico.length}
              </div>

              <div className="text-xs text-[#8a847f]">
                Rolês realizados
              </div>
            </div>

            <div className="rounded-2xl bg-[#f6f4f1] p-4">
              <div className="text-2xl">
                ❤️
              </div>

              <div className="mt-2 text-2xl font-bold">
                {favoritos}
              </div>

              <div className="text-xs text-[#8a847f]">
                Favoritos
              </div>
            </div>

            <div className="rounded-2xl bg-[#f6f4f1] p-4">
              <div className="text-2xl">
                ⭐
              </div>

              <div className="mt-2 text-2xl font-bold">
                {mediaNota > 0
                  ? mediaNota.toFixed(1)
                  : "-"}
              </div>

              <div className="text-xs text-[#8a847f]">
                Nota média
              </div>
            </div>

            <div className="rounded-2xl bg-[#f6f4f1] p-4">
              <div className="text-2xl">
                💰
              </div>

              <div className="mt-2 text-2xl font-bold">
                {totalGasto > 0
                  ? `R$ ${totalGasto.toFixed(2)}`
                  : "-"}
              </div>

              <div className="text-xs text-[#8a847f]">
                Total gasto
              </div>
            </div>

          </div>
        )}

        {historico.length > 0 && (
          <div className="mt-4 space-y-3">

            {totalAvaliacoes > 0 && (
              <div className="rounded-2xl bg-[#f6f4f1] p-4">

                <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
                  Avaliações
                </div>

                <div className="mt-2 text-sm text-[#514b46]">
                  {totalAvaliacoes === 1
                    ? "1 rolê avaliado"
                    : `${totalAvaliacoes} rolês avaliados`}
                </div>

                {mediaGasto > 0 && (
                  <div className="mt-1 text-xs text-[#8a847f]">
                    Gasto médio por rolê avaliado:
                    {" "}
                    R$ {mediaGasto.toFixed(2)}
                  </div>
                )}

              </div>
            )}

            {categoriaMaisRealizada && (
              <div className="rounded-2xl bg-[#f6f4f1] p-4">

                <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
                  Categoria favorita
                </div>

                <div className="mt-2 text-sm font-semibold text-[#514b46]">
                  {nomeCategoria(
                    categoriaMaisRealizada[0]
                  )}
                </div>

                <div className="mt-1 text-xs text-[#8a847f]">
                  {categoriaMaisRealizada[1]}{" "}
                  {categoriaMaisRealizada[1] === 1
                    ? "rolê"
                    : "rolês"}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

