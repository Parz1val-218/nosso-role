import { Role } from "@/data/types";

type ResultadoCardProps = {
  resultado: Role;
  favorito: boolean;
  onFavoritar: () => void;
  onNovamente: () => void;
  onAprovar: () => void;
  onVoltar: () => void;
};

export default function ResultadoCard({
  resultado,
  favorito,
  onFavoritar,
  onNovamente,
  onAprovar,
  onVoltar,
}: ResultadoCardProps) {
  return (
    <section aria-label="Resultado do sorteio">

      <div className="rounded-[26px] bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        {/* EMOJI */}

        <div
          className="text-[52px]"
          aria-hidden="true"
        >
          {resultado.emoji}
        </div>

        {/* CATEGORIA */}

        <div className="mt-3 text-[11px] font-bold uppercase tracking-[1.4px] text-[#8b8179]">
          {resultado.categoria}
        </div>

        {/* NOME */}

        <h2 className="mt-2 text-[27px] font-bold leading-tight">
          {resultado.nome}
        </h2>

        {/* DESCRIÇÃO */}

        {resultado.descricao && (
          <p className="mt-3 text-sm leading-relaxed text-[#706a65]">
            {resultado.descricao}
          </p>
        )}

        {/* =================================================
            INFORMAÇÕES DOS ESTABELECIMENTOS
        ================================================= */}

        {(resultado.categoria === "cafes" ||
          resultado.categoria === "lanches" ||
          resultado.categoria === "restaurantes") && (

          <div className="mt-5 space-y-2 text-left">

            {/* AVALIAÇÃO GOOGLE */}

            {resultado.avaliacaoGoogle !== undefined &&
              resultado.avaliacaoGoogle !== null && (

                <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">

                  <div className="flex items-center justify-between">

                    <span>
                      ⭐{" "}
                      <strong>
                        {resultado.avaliacaoGoogle.toFixed(1)}
                      </strong>
                    </span>

                    {resultado.quantidadeAvaliacoesGoogle !==
                      undefined &&
                      resultado.quantidadeAvaliacoesGoogle !==
                        null && (

                        <span className="text-xs text-[#8a847f]">
                          {resultado.quantidadeAvaliacoesGoogle.toLocaleString(
                            "pt-BR"
                          )}{" "}
                          avaliações
                        </span>
                      )}

                  </div>

                </div>
              )}

            {/* PREÇO */}

            {resultado.precoMedio !== undefined && (
              <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
                💰 Preço médio:{" "}
                <strong>
                  R$ {resultado.precoMedio.toFixed(2)}
                </strong>
              </div>
            )}

            {/* TELEFONE */}

            {resultado.telefone && (
              <a
                href={`tel:${resultado.telefone}`}
                className="block rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954] transition hover:bg-[#eeeae5]"
              >
                📞 {resultado.telefone}
              </a>
            )}

            {/* SITE */}

            {resultado.websiteUri && (
              <a
                href={resultado.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm font-semibold text-[#5f7769] transition hover:bg-[#eeeae5]"
              >
                🌐 Visitar site
              </a>
            )}

            {/* GOOGLE MAPS */}

            {resultado.googleMapsUri && (
              <a
                href={resultado.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm font-semibold text-[#5f7769] transition hover:bg-[#eeeae5]"
              >
                📍 Ver no Google Maps
              </a>
            )}

          </div>
        )}

        {/* =================================================
            LOCALIZAÇÃO
        ================================================= */}

        {resultado.localizacao && (
          <div className="mt-5 space-y-2 text-left">

            {resultado.localizacao.cidade && (
              <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
                📍 {resultado.localizacao.cidade}
                {resultado.localizacao.estado
                  ? ` - ${resultado.localizacao.estado}`
                  : ""}
              </div>
            )}

            {resultado.localizacao.endereco && (
              <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
                🗺️ {resultado.localizacao.endereco}
              </div>
            )}

          </div>
        )}

        {/* =================================================
            FILMES
        ================================================= */}

        {resultado.categoria === "filmes" && (
          <div className="mt-5 space-y-2 text-left">

            <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
              📅 {resultado.ano}
            </div>

            {resultado.duracao && (
              <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
                ⏱️ {resultado.duracao}
              </div>
            )}

            {resultado.generos?.length > 0 && (
              <div className="rounded-xl bg-[#f6f4f1] px-4 py-3 text-sm text-[#5f5954]">
                🎭 {resultado.generos?.join(", ")}
              </div>
            )}

          </div>
        )}

        {/* =================================================
            STREAMING
        ================================================= */}

        {resultado.categoria === "filmes" &&
          resultado.streaming?.length > 0 && (

            <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-4 text-left">

              <div className="text-xs font-bold uppercase tracking-wide text-[#8b8179]">
                🎬 Onde assistir
              </div>

              <div className="mt-2 flex flex-wrap gap-2">

                {resultado.streaming?.map((servico) => (
                  <span
                    key={servico}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#5f5954] shadow-sm"
                  >
                    {servico}
                  </span>
                ))}

              </div>

            </div>
          )}

        {/* =================================================
            PASSEIOS
        ================================================= */}

        {resultado.categoria === "passeios" &&
          resultado.tipos?.length > 0 && (

            <div className="mt-5 flex flex-wrap justify-center gap-2">

              {resultado.tipos.map((tipo) => (
                <span
                  key={tipo}
                  className="rounded-full bg-[#f6f4f1] px-3 py-1.5 text-xs font-semibold text-[#5f5954]"
                >
                  {tipo}
                </span>
              ))}

            </div>
          )}

        {/* =================================================
            CASA
        ================================================= */}

        {resultado.categoria === "casa" &&
          resultado.tipos?.length > 0 && (

            <div className="mt-5 flex flex-wrap justify-center gap-2">

              {resultado.tipos.map((tipo) => (
                <span
                  key={tipo}
                  className="rounded-full bg-[#f6f4f1] px-3 py-1.5 text-xs font-semibold text-[#5f5954]"
                >
                  {tipo}
                </span>
              ))}

            </div>
          )}

        {/* =================================================
            TIPOS DE LANCHES
        ================================================= */}

        {resultado.categoria === "lanches" &&
          resultado.tipos?.length > 0 && (

            <div className="mt-5 flex flex-wrap justify-center gap-2">

              {resultado.tipos.map((tipo) => (
                <span
                  key={tipo}
                  className="rounded-full bg-[#f6f4f1] px-3 py-1.5 text-xs font-semibold text-[#5f5954]"
                >
                  {tipo}
                </span>
              ))}

            </div>
          )}

        {/* =================================================
            CULINÁRIA DOS RESTAURANTES
        ================================================= */}

        {resultado.categoria === "restaurantes" &&
          resultado.culinaria?.length > 0 && (

            <div className="mt-5 flex flex-wrap justify-center gap-2">

              {resultado.culinaria.map((tipo) => (
                <span
                  key={tipo}
                  className="rounded-full bg-[#f6f4f1] px-3 py-1.5 text-xs font-semibold text-[#5f5954]"
                >
                  {tipo}
                </span>
              ))}

            </div>
          )}

        {/* =================================================
            FAVORITO
        ================================================= */}

        <button
          type="button"
          onClick={onFavoritar}
          aria-pressed={favorito}
          className={`mt-6 w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition active:scale-[0.98] ${
            favorito
              ? "border-[#d7b8b8] bg-[#fff4f4] text-[#a05252]"
              : "border-[#e5e0db] bg-white text-[#635c56] hover:bg-[#f8f6f3]"
          }`}
        >
          {favorito
            ? "❤️ Remover dos favoritos"
            : "♡ Adicionar aos favoritos"}
        </button>

      </div>

      {/* =================================================
          AÇÕES
      ================================================= */}

      <div className="mt-3 flex gap-2">

        <button
          type="button"
          onClick={onNovamente}
          className="flex-1 rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-[#514b46] shadow-sm transition active:scale-[0.98] hover:bg-[#faf9f7]"
        >
          🔄 Novamente
        </button>

        <button
          type="button"
          onClick={onAprovar}
          className="flex-1 rounded-2xl bg-[#5f7769] px-4 py-4 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-[#52695d]"
        >
          ❤️ Vamos fazer isso!
        </button>

      </div>

      {/* VOLTAR */}

      <button
        type="button"
        onClick={onVoltar}
        className="mt-3 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-[#77716c] transition hover:bg-white"
      >
        ← Escolher outra categoria
      </button>

    </section>
  );
}