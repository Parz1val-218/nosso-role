tsx
"use client";

import { HistoricoItem } from "@/services/armazenamento";

type HistoricoProps = {
  historico: HistoricoItem[];
  onSelecionar: (role: HistoricoItem) => void;
  onAvaliar: (role: HistoricoItem) => void;
  onExcluir: (id: string) => void;
};

export default function Historico({
  historico,
  onSelecionar,
  onAvaliar,
  onExcluir,
}: HistoricoProps) {
  return (
    <section>
      <div className="rounded-[26px] bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold">
          📋 Histórico
        </h2>

        {historico.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-5 text-center">

            <div
              className="text-3xl"
              aria-hidden="true"
            >
              📭
            </div>

            <p className="mt-2 text-sm text-[#77716c]">
              Nenhum rolê realizado ainda.
            </p>

            <p className="mt-1 text-xs text-[#9a938d]">
              Os rolês aprovados aparecerão aqui.
            </p>

          </div>
        ) : (
          <div className="mt-5 space-y-3">

            {historico.map((role) => (
              <div
                key={role.id}
                className="rounded-2xl bg-[#f6f4f1] p-4"
              >

                <button
                  type="button"
                  onClick={() =>
                    onSelecionar(role)
                  }
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-3">

                    <div className="text-3xl">
                      {role.emoji}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="font-semibold">
                        {role.nome}
                      </div>

                      <div className="mt-1 text-xs text-[#8a847f]">
                        {role.categoria}
                      </div>

                      {role.avaliacao && (
                        <div className="mt-1 text-xs text-[#8a847f]">
                          ⭐ {role.avaliacao.nota}/5
                          {role.avaliacao.gasto !== undefined &&
                            ` • R$ ${role.avaliacao.gasto.toFixed(2)}`}
                        </div>
                      )}

                    </div>

                    <div className="text-[#aaa39c]">
                      →
                    </div>

                  </div>
                </button>

                <div className="mt-3 flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      onAvaliar(role)
                    }
                    className="flex-1 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#5f5954] transition hover:bg-[#faf9f7]"
                  >
                    {role.avaliacao
                      ? "✏️ Editar avaliação"
                      : "⭐ Avaliar"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onExcluir(role.id)
                    }
                    className="rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#a05252] transition hover:bg-[#fff4f4]"
                  >
                    🗑️
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

