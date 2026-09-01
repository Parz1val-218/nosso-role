
"use client";

import { useEffect, useState } from "react";

export type LocalizacaoSelecionada = {
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
  origem: "gps" | "manual";
};

export type LocalizacaoUsuario =
  LocalizacaoSelecionada;

type LocalizacaoProps = {
  cidade?: string;
  estado?: string;
  latitude?: number;
  longitude?: number;
  onChange?: (
    localizacao: LocalizacaoSelecionada | null
  ) => void;
  onLocalizacaoEncontrada?: (
    localizacao: LocalizacaoSelecionada
  ) => void;
};

const estados = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

function normalizarEstado(
  estado?: string
): string {
  if (!estado) {
    return "";
  }

  const valor = estado
    .trim()
    .toUpperCase();

  const encontrado = estados.find(
    (item) =>
      item.sigla === valor ||
      item.nome.toUpperCase() === valor
  );

  return encontrado?.sigla ?? valor;
}

export default function Localizacao({
  cidade,
  estado,
  latitude,
  longitude,
  onChange,
  onLocalizacaoEncontrada,
}: LocalizacaoProps) {
  const [cidadeInput, setCidadeInput] =
    useState(cidade ?? "");

  const [estadoInput, setEstadoInput] =
    useState(
      normalizarEstado(estado)
    );

  const [carregando, setCarregando] =
    useState(false);

  const [erro, setErro] =
    useState<string | null>(null);

  const [modo, setModo] =
    useState<"manual" | "gps" | null>(
      cidade && estado
        ? "manual"
        : null
    );

  useEffect(() => {
    setCidadeInput(cidade ?? "");
    setEstadoInput(
      normalizarEstado(estado)
    );
  }, [cidade, estado]);

  function comunicarLocalizacao(
    localizacao:
      LocalizacaoSelecionada | null
  ) {
    if (onChange) {
      onChange(localizacao);
    }

    if (
      localizacao &&
      onLocalizacaoEncontrada
    ) {
      onLocalizacaoEncontrada(
        localizacao
      );
    }
  }

  function selecionarManual() {
    setModo("manual");
    setErro(null);
  }

  function atualizarCidade(
    valor: string
  ) {
    setCidadeInput(valor);

    if (
      valor.trim() &&
      estadoInput
    ) {
      comunicarLocalizacao({
        cidade: valor.trim(),
        estado: estadoInput,
        origem: "manual",
      });
    } else {
      comunicarLocalizacao(null);
    }
  }

  function atualizarEstado(
    valor: string
  ) {
    setEstadoInput(valor);

    if (
      cidadeInput.trim() &&
      valor
    ) {
      comunicarLocalizacao({
        cidade: cidadeInput.trim(),
        estado: valor,
        origem: "manual",
      });
    } else {
      comunicarLocalizacao(null);
    }
  }

  async function usarMinhaLocalizacao() {
    setErro(null);

    if (!navigator.geolocation) {
      setErro(
        "Seu navegador não permite obter a localização."
      );
      return;
    }

    setCarregando(true);
    setModo("gps");

    navigator.geolocation.getCurrentPosition(
      async (posicao) => {
        const latitudeAtual =
          posicao.coords.latitude;

        const longitudeAtual =
          posicao.coords.longitude;

        try {
          const resposta =
            await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitudeAtual}&lon=${longitudeAtual}&zoom=18&addressdetails=1&accept-language=pt-BR`
            );

          if (!resposta.ok) {
            throw new Error(
              "Não foi possível descobrir a cidade."
            );
          }

          const dados =
            await resposta.json();

          const endereco =
            dados.address ?? {};

          /*
           * O Nominatim pode devolver
           * diferentes campos dependendo
           * do local.
           */
          const cidadeEncontrada =
            endereco.city ??
            endereco.town ??
            endereco.municipality ??
            endereco.village ??
            endereco.suburb ??
            endereco.city_district ??
            "";

          /*
           * Primeiro tenta state_code.
           * Caso não exista, tenta descobrir
           * a sigla através do nome do estado.
           */
          let estadoEncontrado =
            endereco.state_code
              ?.replace("BR-", "")
              .toUpperCase() ?? "";

          if (!estadoEncontrado) {
            const estadoNome =
              endereco.state ?? "";

            const estadoCorrespondente =
              estados.find(
                (item) =>
                  item.nome
                    .toLowerCase() ===
                  estadoNome
                    .toLowerCase()
              );

            estadoEncontrado =
              estadoCorrespondente?.sigla ??
              "";
          }

          if (
            !cidadeEncontrada ||
            !estadoEncontrado
          ) {
            console.error(
              "Resposta do Nominatim:",
              dados
            );

            throw new Error(
              "Não foi possível identificar sua cidade e estado."
            );
          }

          const novaLocalizacao: LocalizacaoSelecionada =
            {
              cidade:
                cidadeEncontrada,
              estado:
                estadoEncontrado,
              latitude:
                latitudeAtual,
              longitude:
                longitudeAtual,
              origem: "gps",
            };

          setCidadeInput(
            cidadeEncontrada
          );

          setEstadoInput(
            estadoEncontrado
          );

          setModo("gps");
          setErro(null);

          comunicarLocalizacao(
            novaLocalizacao
          );
        } catch (error) {
          console.error(
            "Erro ao obter localização:",
            error
          );

          setModo(null);

          setErro(
            "Não conseguimos identificar sua cidade automaticamente. Você pode informar cidade e estado manualmente."
          );

          comunicarLocalizacao(null);
        } finally {
          setCarregando(false);
        }
      },
      (error) => {
        console.error(
          "Erro do GPS:",
          error
        );

        setModo(null);
        setCarregando(false);

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          setErro(
            "Permissão de localização negada. Você pode informar sua cidade manualmente."
          );
        } else if (
          error.code ===
          error.TIMEOUT
        ) {
          setErro(
            "A localização demorou demais para responder. Tente novamente ou informe sua cidade manualmente."
          );
        } else {
          setErro(
            "Não foi possível obter sua localização. Tente novamente ou informe sua cidade manualmente."
          );
        }

        comunicarLocalizacao(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }

  function limparLocalizacao() {
    setCidadeInput("");
    setEstadoInput("");
    setModo(null);
    setErro(null);

    comunicarLocalizacao(null);
  }

  return (
    <div className="mt-5 rounded-[22px] bg-[#f6f4f1] p-5 text-left">

      <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
        📍 Localização
      </div>

      <p className="mt-2 text-sm leading-relaxed text-[#706a65]">
        Escolha onde vocês estão para encontrar
        opções próximas.
      </p>

      {/* GPS */}

      <button
        type="button"
        onClick={
          usarMinhaLocalizacao
        }
        disabled={carregando}
        className="mt-4 w-full rounded-2xl bg-[#5f7769] px-4 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {carregando
          ? "📍 Encontrando sua localização..."
          : modo === "gps"
          ? "📍 Usar minha localização novamente"
          : "📍 Usar minha localização"}
      </button>

      {/* OU */}

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e1dcd7]" />

        <span className="text-xs font-medium text-[#aaa39c]">
          ou informe manualmente
        </span>

        <div className="h-px flex-1 bg-[#e1dcd7]" />
      </div>

      {/* MANUAL */}

      <button
        type="button"
        onClick={
          selecionarManual
        }
        className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
          modo === "manual"
            ? "border-[#5f7769] bg-white text-[#5f7769]"
            : "border-[#e5e0db] bg-white text-[#635c56]"
        }`}
      >
        🏙️ Escolher cidade
      </button>

      {(modo === "manual" ||
        cidadeInput ||
        estadoInput) && (
        <div className="mt-4 space-y-3">

          {/* CIDADE */}

          <div>
            <label
              htmlFor="localizacao-cidade"
              className="text-sm font-semibold text-[#514b46]"
            >
              Cidade
            </label>

            <input
              id="localizacao-cidade"
              type="text"
              value={cidadeInput}
              onChange={(event) =>
                atualizarCidade(
                  event.target.value
                )
              }
              placeholder="Ex.: Campinas"
              autoComplete="address-level2"
              className="mt-2 w-full rounded-xl border border-[#e5e0db] bg-white px-4 py-3 text-sm text-[#514b46] outline-none focus:border-[#5f7769]"
            />
          </div>

          {/* ESTADO */}

          <div>
            <label
              htmlFor="localizacao-estado"
              className="text-sm font-semibold text-[#514b46]"
            >
              Estado
            </label>

            <select
              id="localizacao-estado"
              value={estadoInput}
              onChange={(event) =>
                atualizarEstado(
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-[#e5e0db] bg-white px-4 py-3 text-sm text-[#514b46] outline-none focus:border-[#5f7769]"
            >
              <option value="">
                Selecione o estado
              </option>

              {estados.map(
                (estadoItem) => (
                  <option
                    key={
                      estadoItem.sigla
                    }
                    value={
                      estadoItem.sigla
                    }
                  >
                    {estadoItem.nome} (
                    {
                      estadoItem.sigla
                    })
                  </option>
                )
              )}
            </select>
          </div>

          {/* STATUS */}

          {cidadeInput &&
            estadoInput && (
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-[#5f5954]">
                📍 Buscando opções em{" "}
                <strong>
                  {cidadeInput} -{" "}
                  {estadoInput}
                </strong>
              </div>
            )}

          {/* LIMPAR */}

          {(cidadeInput ||
            estadoInput) && (
            <button
              type="button"
              onClick={
                limparLocalizacao
              }
              className="w-full rounded-xl px-3 py-2 text-xs font-semibold text-[#a05252] transition hover:bg-white"
            >
              Limpar localização
            </button>
          )}
        </div>
      )}

      {/* ERRO */}

      {erro && (
        <div
          role="alert"
          className="mt-4 rounded-2xl bg-[#fff4f4] px-4 py-3 text-xs leading-relaxed text-[#a05252]"
        >
          {erro}
        </div>
      )}

      {/* LOCALIZAÇÃO ATUAL */}

      {latitude !== undefined &&
        longitude !== undefined && (
          <div className="mt-3 text-[10px] text-[#aaa39c]">
            Localização GPS obtida com sucesso.
          </div>
        )}

    </div>
  );
}

