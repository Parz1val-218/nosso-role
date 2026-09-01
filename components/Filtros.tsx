"use client";

import { Categoria } from "@/data/types";

type FiltrosProps = {
  categoria: Categoria;
  precoMaximo?: number;
  excluirRealizados: boolean;
  onPrecoChange: (preco: number | undefined) => void;
  onExcluirRealizadosChange: (excluir: boolean) => void;
};

export default function Filtros({
  categoria,
  precoMaximo,
  excluirRealizados,
  onPrecoChange,
  onExcluirRealizadosChange,
}: FiltrosProps) {
  const possuiFiltroPreco =
    categoria === "cafes" ||
    categoria === "lanches" ||
    categoria === "restaurantes" ||
    categoria === "passeios";

  return (
    <div className="mt-5 rounded-[22px] bg-[#f6f4f1] p-5 text-left">

      <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
        Filtros
      </div>

      {possuiFiltroPreco && (
        <div className="mt-4">

          <label
            htmlFor="preco-maximo"
            className="text-sm font-semibold text-[#514b46]"
          >
            💰 Preço máximo
          </label>

          <select
            id="preco-maximo"
            value={
              precoMaximo === undefined
                ? ""
                : precoMaximo
            }
            onChange={(event) => {
              const valor = event.target.value;

              if (valor === "") {
                onPrecoChange(undefined);
                return;
              }

              onPrecoChange(Number(valor));
            }}
            className="mt-2 w-full rounded-xl border border-[#e5e0db] bg-white px-4 py-3 text-sm text-[#514b46] outline-none focus:border-[#5f7769]"
          >
            <option value="">
              Qualquer valor
            </option>

            <option value="30">
              Até R$ 30
            </option>

            <option value="50">
              Até R$ 50
            </option>

            <option value="80">
              Até R$ 80
            </option>

            <option value="120">
              Até R$ 120
            </option>

          </select>

        </div>
      )}

      <label className="mt-5 flex cursor-pointer items-start gap-3">

        <input
          type="checkbox"
          checked={excluirRealizados}
          onChange={(event) =>
            onExcluirRealizadosChange(
              event.target.checked
            )
          }
          className="mt-0.5 h-4 w-4 accent-[#5f7769]"
        />

        <span>

          <span className="block text-sm font-semibold text-[#514b46]">
            Não sortear rolês já realizados
          </span>

          <span className="mt-1 block text-xs leading-relaxed text-[#8a847f]">
            Evita repetir experiências que vocês
            já fizeram.
          </span>

        </span>

      </label>

    </div>
  );
}