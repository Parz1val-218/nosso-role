tsx
"use client";

import { Role } from "@/data/types";

type FavoritosProps = {
  favoritos: Role[];
  onSelecionar: (role: Role) => void;
  onRemover: (id: string) => void;
};

export default function Favoritos({
  favoritos,
  onSelecionar,
  onRemover,
}: FavoritosProps) {
  return (
    <section>
      <div className="rounded-[26px] bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold">
          ❤️ Favoritos
        </h2>

        {favoritos.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-5 text-center">

            <div
              className="text-3xl"
              aria-hidden="true"
            >
              🤍
            </div>

            <p className="mt-2 text-sm text-[#77716c]">
              Nenhum favorito ainda.
            </p>

            <p className="mt-1 text-xs text-[#9a938d]">
              Salvem os rolês que vocês mais gostarem.
            </p>

          </div>
        ) : (
          <div className="mt-5 space-y-3">

            {favoritos.map((role) => (
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

                    <div
                      className="text-3xl"
                      aria-hidden="true"
                    >
                      {role.emoji}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="font-semibold">
                        {role.nome}
                      </div>

                      <div className="mt-1 text-xs text-[#8a847f]">
                        {role.categoria}
                      </div>

                      {role.localizacao?.cidade && (
                        <div className="mt-1 text-xs text-[#9a938d]">
                          📍 {role.localizacao.cidade}
                          {role.localizacao.estado
                            ? ` - ${role.localizacao.estado}`
                            : ""}
                        </div>
                      )}

                    </div>

                    <div className="text-[#aaa39c]">
                      →
                    </div>

                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onRemover(role.id)
                  }
                  className="mt-3 w-full rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#a05252] transition hover:bg-[#fff4f4]"
                >
                  ❤️ Remover dos favoritos
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

