"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  buscarEstabelecimentosInternet,
} from "@/services/buscaInternet";

import Header from "@/components/Header";
import Menu from "@/components/Menu";
import CategoriaCard from "@/components/CategoriaCard";
import ResultadoCard from "@/components/ResultadoCard";
import Filtros from "@/components/Filtros";
import Localizacao, {
  LocalizacaoUsuario,
} from "@/components/Localizacao";

import { dadosPorCategoria } from "@/data";
import { Categoria, Role } from "@/data/types";
import { sortearRole } from "@/services/sorteio";

import {
  carregarLocalizacao,
  salvarLocalizacao,
} from "@/services/localizacao";

import {
  Avaliacao,
  HistoricoItem,
  carregarFavoritos,
  carregarHistorico,
  salvarFavoritos,
  salvarAvaliacao,
  adicionarAoHistorico,
  removerDoHistorico,
} from "@/services/armazenamento";

/*
 * =========================================================
 * CONFIGURAÇÕES
 * =========================================================
 */

const categorias = [
  {
    id: "cafes",
    emoji: "☕",
    nome: "Cafés",
    descricao: "Um cafézinho?",
  },
  {
    id: "lanches",
    emoji: "🍔",
    nome: "Lanches",
    descricao: "Bateu aquela fome?",
  },
  {
    id: "restaurantes",
    emoji: "🍝",
    nome: "Restaurantes",
    descricao: "Hora de comer bem",
  },
  {
    id: "filmes",
    emoji: "🎬",
    nome: "Filmes",
    descricao: "Sessão cinema",
  },
  {
    id: "casa",
    emoji: "🏠",
    nome: "Em casa",
    descricao: "Ideias para ficar juntinhos",
  },
  {
    id: "passeios",
    emoji: "🚶",
    nome: "Passeios",
    descricao: "Vamos sair?",
  },
] as const;

type Pagina =
  | "inicio"
  | "sorteio"
  | "historico"
  | "favoritos"
  | "estatisticas";

const CATEGORIAS_COM_LOCALIZACAO: Categoria[] = [
  "cafes",
  "lanches",
  "restaurantes",
  "passeios",
];

/*
 * =========================================================
 * PÁGINA PRINCIPAL
 * =========================================================
 */

export default function Home() {
  /*
   * =======================================================
   * NAVEGAÇÃO
   * =======================================================
   */

  const [pagina, setPagina] =
    useState<Pagina>("inicio");

  /*
   * =======================================================
   * SORTEIO
   * =======================================================
   */

  const [
    categoriaSelecionada,
    setCategoriaSelecionada,
  ] = useState<Categoria | null>(null);

  const [resultado, setResultado] =
    useState<Role | null>(null);

  const [mensagemErro, setMensagemErro] =
    useState<string | null>(null);

  /*
   * Guarda os últimos sorteios feitos
   * durante a sessão atual.
   *
   * Isso impede que o botão "Novamente"
   * fique entregando a mesma coisa.
   */
  const [ultimosSorteios, setUltimosSorteios] =
    useState<string[]>([]);

  /*
   * =======================================================
   * FILTROS
   * =======================================================
   */

  const [precoMaximo, setPrecoMaximo] =
    useState<number | undefined>(undefined);

  const [excluirRealizados, setExcluirRealizados] =
    useState(true);

  /*
   * =======================================================
   * LOCALIZAÇÃO
   * =======================================================
   */

  const [localizacao, setLocalizacao] =
    useState<LocalizacaoUsuario | null>(null);

  /*
   * =======================================================
   * ESTABELECIMENTOS DA INTERNET
   * =======================================================
   */

  const [
    estabelecimentosInternet,
    setEstabelecimentosInternet,
  ] = useState<Role[]>([]);

  const [
    buscandoEstabelecimentos,
    setBuscandoEstabelecimentos,
  ] = useState(false);

  const [
    erroEstabelecimentos,
    setErroEstabelecimentos,
  ] = useState<string | null>(null);

  /*
   * Guarda a última cidade pesquisada.
   */
  const buscaRealizadaRef =
    useRef<string | null>(null);

  /*
   * Impede duas buscas simultâneas.
   */
  const buscaEmAndamentoRef =
    useRef<string | null>(null);

  /*
   * =======================================================
   * FAVORITOS
   * =======================================================
   */

  const [favoritos, setFavoritos] =
    useState<Role[]>([]);

  /*
   * =======================================================
   * HISTÓRICO
   * =======================================================
   */

  const [historico, setHistorico] =
    useState<HistoricoItem[]>([]);

  /*
   * =======================================================
   * AVALIAÇÃO
   * =======================================================
   */

  const [avaliando, setAvaliando] =
    useState<HistoricoItem | null>(null);

  const [nota, setNota] =
    useState<number>(5);

  const [gasto, setGasto] =
    useState<string>("");

  const [comentario, setComentario] =
    useState<string>("");

  /*
   * =======================================================
   * CARREGAMENTO INICIAL
   * =======================================================
   */

  useEffect(() => {
    setFavoritos(carregarFavoritos());
    setHistorico(carregarHistorico());

    const localizacaoSalva =
      carregarLocalizacao();

    if (localizacaoSalva) {
      setLocalizacao(localizacaoSalva);
    }
  }, []);

  /*
   * =======================================================
   * LOCALIZAÇÃO
   * =======================================================
   */

  function atualizarLocalizacao(
    novaLocalizacao: LocalizacaoUsuario | null
  ) {
    setLocalizacao(novaLocalizacao);

    if (novaLocalizacao) {
      salvarLocalizacao(novaLocalizacao);
    }
  }

  /*
   * =======================================================
   * BUSCA DE ESTABELECIMENTOS
   * =======================================================
   */

  useEffect(() => {
    if (
      !categoriaSelecionada ||
      !CATEGORIAS_COM_LOCALIZACAO.includes(
        categoriaSelecionada
      ) ||
      !localizacao?.cidade ||
      !localizacao?.estado
    ) {
      return;
    }

    const cidade =
      localizacao.cidade.trim();

    const estado =
      localizacao.estado.trim();

    if (!cidade || !estado) {
      return;
    }

    const chaveBusca =
      `${cidade.toLowerCase()}-${estado.toLowerCase()}`;

    /*
     * Já pesquisamos essa cidade.
     * Não precisamos consultar a internet novamente.
     */
    if (
      buscaRealizadaRef.current ===
      chaveBusca
    ) {
      return;
    }

    /*
     * Já existe uma busca em andamento
     * para essa cidade.
     */
    if (
      buscaEmAndamentoRef.current ===
      chaveBusca
    ) {
      return;
    }

    let cancelado = false;

    const timer = setTimeout(
      async () => {
        try {
          buscaEmAndamentoRef.current =
            chaveBusca;

          setBuscandoEstabelecimentos(true);
          setErroEstabelecimentos(null);

          const resultados =
            await buscarEstabelecimentosInternet(
              cidade,
              estado
            );

          if (cancelado) {
            return;
          }

          setEstabelecimentosInternet(
            resultados
          );

          buscaRealizadaRef.current =
            chaveBusca;
        } catch (erro) {
          if (cancelado) {
            return;
          }

          console.error(
            "Erro ao buscar estabelecimentos:",
            erro
          );

          setEstabelecimentosInternet([]);

          setErroEstabelecimentos(
            erro instanceof Error
              ? erro.message
              : "Não foi possível buscar estabelecimentos na internet."
          );
        } finally {
          if (
            buscaEmAndamentoRef.current ===
            chaveBusca
          ) {
            buscaEmAndamentoRef.current =
              null;
          }

          if (!cancelado) {
            setBuscandoEstabelecimentos(
              false
            );
          }
        }
      },
      800
    );

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [
    categoriaSelecionada,
    localizacao?.cidade,
    localizacao?.estado,
  ]);

  /*
   * =======================================================
   * FAVORITOS
   * =======================================================
   */

  function alternarFavorito() {
    if (!resultado) {
      return;
    }

    const jaExiste =
      favoritos.some(
        (role) =>
          role.id === resultado.id
      );

    const novosFavoritos =
      jaExiste
        ? favoritos.filter(
            (role) =>
              role.id !== resultado.id
          )
        : [...favoritos, resultado];

    setFavoritos(
      novosFavoritos
    );

    salvarFavoritos(
      novosFavoritos
    );
  }

  function resultadoEhFavorito() {
    if (!resultado) {
      return false;
    }

    return favoritos.some(
      (role) =>
        role.id === resultado.id
    );
  }

  function removerFavorito(
    id: string
  ) {
    const novosFavoritos =
      favoritos.filter(
        (role) =>
          role.id !== id
      );

    setFavoritos(
      novosFavoritos
    );

    salvarFavoritos(
      novosFavoritos
    );
  }

  /*
   * =======================================================
   * CATEGORIA
   * =======================================================
   */

  function selecionarCategoria(
    id: string
  ) {
    const categoria =
      id as Categoria;

    setCategoriaSelecionada(
      categoria
    );

    setResultado(null);
    setMensagemErro(null);

    /*
     * Nova categoria = nova sequência
     * de sorteios.
     */
    setUltimosSorteios([]);

    setPrecoMaximo(undefined);
    setExcluirRealizados(true);

    setPagina("sorteio");
  }

  /*
   * =======================================================
   * VOLTAR PARA INÍCIO
   * =======================================================
   */

  function voltarInicio() {
    setCategoriaSelecionada(null);
    setResultado(null);
    setMensagemErro(null);
    setAvaliando(null);

    /*
     * Limpa a sequência da sessão.
     */
    setUltimosSorteios([]);

    setPagina("inicio");
  }

  /*
   * =======================================================
   * CATEGORIA ATUAL
   * =======================================================
   */

  const categoriaAtual =
    categorias.find(
      (categoria) =>
        categoria.id ===
        categoriaSelecionada
    );

  /*
   * =======================================================
   * LOCALIZAÇÃO NECESSÁRIA
   * =======================================================
   */

  const categoriaUsaLocalizacao =
    categoriaSelecionada !== null &&
    CATEGORIAS_COM_LOCALIZACAO.includes(
      categoriaSelecionada
    );

  /*
   * =======================================================
   * SORTEIO
   * =======================================================
   */

  function realizarSorteio() {
    if (!categoriaSelecionada) {
      return;
    }

    setMensagemErro(null);

    const usaLocalizacao =
      CATEGORIAS_COM_LOCALIZACAO.includes(
        categoriaSelecionada
      );

    /*
     * Biblioteca local + estabelecimentos
     * encontrados na internet.
     */
    const roles = [
      ...dadosPorCategoria[
        categoriaSelecionada
      ],

      ...estabelecimentosInternet.filter(
        (role) =>
          role.categoria ===
          categoriaSelecionada
      ),
    ];

    /*
     * IDs dos rolês já aprovados.
     */
    const idsHistorico =
      historico.map(
        (item) => item.id
      );

    /*
     * IDs que devem ser evitados:
     *
     * 1. Rolês já realizados
     * 2. Resultado atualmente exibido
     * 3. Últimos sorteios da sessão
     */
    const idsParaEvitar = [
      ...idsHistorico,

      ...(resultado
        ? [resultado.id]
        : []),

      ...ultimosSorteios,
    ];

    /*
     * Remove duplicidades.
     */
    const idsRealizados =
      Array.from(
        new Set(idsParaEvitar)
      );

    /*
     * Primeiro tentamos respeitar
     * todos os bloqueios.
     */
    const sorteio =
      sortearRole(
        roles,
        {
          filtros: {
            categoria:
              categoriaSelecionada,

            cidade:
              usaLocalizacao &&
              localizacao?.cidade
                ? localizacao.cidade
                : undefined,

            estado:
              usaLocalizacao &&
              localizacao?.estado
                ? localizacao.estado
                : undefined,

            precoMaximo:
              usaLocalizacao
                ? precoMaximo
                : undefined,

            excluirRealizados,
          },

          idsRealizados,
        }
      );

    if (
      sorteio.sucesso &&
      sorteio.resultado
    ) {
      const novoResultado =
        sorteio.resultado;

      setResultado(
        novoResultado
      );

      /*
       * Guarda o novo resultado.
       *
       * Mantemos somente os últimos
       * 5 sorteios.
       */
      setUltimosSorteios(
        (anteriores) => {
          const atualizados = [
            ...anteriores.filter(
              (id) =>
                id !==
                novoResultado.id
            ),

            novoResultado.id,
          ];

          return atualizados.slice(
            -5
          );
        }
      );

      return;
    }

    /*
     * Se não encontrou uma opção porque
     * os últimos sorteios bloquearam tudo,
     * fazemos uma segunda tentativa
     * considerando apenas o histórico.
     *
     * Assim uma biblioteca pequena
     * não fica inutilizada.
     */
    if (
      excluirRealizados &&
      ultimosSorteios.length > 0
    ) {
      const sorteioAlternativo =
        sortearRole(
          roles,
          {
            filtros: {
              categoria:
                categoriaSelecionada,

              cidade:
                usaLocalizacao &&
                localizacao?.cidade
                  ? localizacao.cidade
                  : undefined,

              estado:
                usaLocalizacao &&
                localizacao?.estado
                  ? localizacao.estado
                  : undefined,

              precoMaximo:
                usaLocalizacao
                  ? precoMaximo
                  : undefined,

              excluirRealizados:
                true,
            },

            idsRealizados:
              idsHistorico,
          }
        );

      if (
        sorteioAlternativo.sucesso &&
        sorteioAlternativo.resultado
      ) {
        const novoResultado =
          sorteioAlternativo.resultado;

        setResultado(
          novoResultado
        );

        setUltimosSorteios(
          (anteriores) => {
            const atualizados = [
              ...anteriores.filter(
                (id) =>
                  id !==
                  novoResultado.id
              ),

              novoResultado.id,
            ];

            return atualizados.slice(
              -5
            );
          }
        );

        return;
      }
    }

    setResultado(null);

    setMensagemErro(
      sorteio.mensagem ??
        "Nenhum rolê encontrado com esses filtros."
    );
  }

  function sortearNovamente() {
    realizarSorteio();
  }

  /*
   * =======================================================
   * APROVAR RESULTADO
   * =======================================================
   */

  function aprovarRole() {
    if (!resultado) {
      return;
    }

    const novoHistorico =
      adicionarAoHistorico(
        resultado
      );

    setHistorico(
      novoHistorico
    );

    setResultado(null);
    setMensagemErro(null);

    setPagina("historico");
  }

  /*
   * =======================================================
   * ABRIR ITEM DO HISTÓRICO
   * =======================================================
   */

  function abrirHistoricoItem(
    item: HistoricoItem
  ) {
    setCategoriaSelecionada(
      item.categoria
    );

    setResultado(item);
    setMensagemErro(null);

    if (item.localizacao) {
      setLocalizacao({
        latitude:
          item.localizacao.latitude,

        longitude:
          item.localizacao.longitude,

        cidade:
          item.localizacao.cidade ??
          "",

        estado:
          item.localizacao.estado ??
          "",

        origem: "manual",
      });
    }

    setPagina("sorteio");
  }

  /*
   * =======================================================
   * EXCLUIR HISTÓRICO
   * =======================================================
   */

  function excluirItemHistorico(
    id: string
  ) {
    const novoHistorico =
      removerDoHistorico(id);

    setHistorico(
      novoHistorico
    );

    if (
      resultado?.id === id
    ) {
      setResultado(null);
    }
  }

  /*
   * =======================================================
   * ABRIR AVALIAÇÃO
   * =======================================================
   */

  function abrirAvaliacao(
    item: HistoricoItem
  ) {
    setAvaliando(item);

    setNota(
      item.avaliacao?.nota ?? 5
    );

    setGasto(
      item.avaliacao?.gasto !==
        undefined
        ? String(
            item.avaliacao.gasto
          )
        : ""
    );

    setComentario(
      item.avaliacao?.comentario ??
        ""
    );
  }

  /*
   * =======================================================
   * FECHAR AVALIAÇÃO
   * =======================================================
   */

  function fecharAvaliacao() {
    setAvaliando(null);
    setNota(5);
    setGasto("");
    setComentario("");
  }

  /*
   * =======================================================
   * SALVAR AVALIAÇÃO
   * =======================================================
   */

  function salvarAvaliacaoAtual() {
    if (!avaliando) {
      return;
    }

    const valorGasto =
      gasto.trim() === ""
        ? undefined
        : Number(
            gasto.replace(
              ",",
              "."
            )
          );

    const avaliacao: Avaliacao = {
      nota,

      gasto:
        valorGasto !== undefined &&
        !Number.isNaN(
          valorGasto
        )
          ? valorGasto
          : undefined,

      comentario:
        comentario.trim() ||
        undefined,
    };

    const novoHistorico =
      salvarAvaliacao(
        avaliando.id,
        avaliacao
      );

    setHistorico(
      novoHistorico
    );

    fecharAvaliacao();
  }

  /*
   * =======================================================
   * ABRIR FAVORITO
   * =======================================================
   */

  function abrirFavorito(
    role: Role
  ) {
    setCategoriaSelecionada(
      role.categoria
    );

    setResultado(role);
    setMensagemErro(null);

    if (role.localizacao) {
      setLocalizacao({
        latitude:
          role.localizacao.latitude,

        longitude:
          role.localizacao.longitude,

        cidade:
          role.localizacao.cidade ??
          "",

        estado:
          role.localizacao.estado ??
          "",

        origem: "manual",
      });
    }

    setPagina("sorteio");
  }

  /*
   * =======================================================
   * ESTATÍSTICAS
   * =======================================================
   */

  const estatisticas =
    useMemo(() => {
      const avaliados =
        historico.filter(
          (item) =>
            item.avaliacao &&
            typeof item.avaliacao.nota ===
              "number"
        );

      const totalAvaliacoes =
        avaliados.length;

      const media =
        totalAvaliacoes > 0
          ? avaliados.reduce(
              (
                total,
                item
              ) =>
                total +
                (item.avaliacao?.nota ??
                  0),
              0
            ) /
            totalAvaliacoes
          : 0;

      const totalGasto =
        avaliados.reduce(
          (
            total,
            item
          ) =>
            total +
            (item.avaliacao?.gasto ??
              0),
          0
        );

      const categoriasContagem =
        historico.reduce<
          Record<string, number>
        >(
          (
            resultado,
            item
          ) => {
            resultado[
              item.categoria
            ] =
              (resultado[
                item.categoria
              ] ?? 0) + 1;

            return resultado;
          },
          {}
        );

      const categoriaMaisFeita =
        Object.entries(
          categoriasContagem
        ).sort(
          (
            a,
            b
          ) =>
            b[1] -
            a[1]
        )[0];

      return {
        totalRealizados:
          historico.length,

        totalAvaliacoes,

        media,

        totalGasto,

        categoriaMaisFeita:
          categoriaMaisFeita?.[0] ??
          null,

        quantidadeCategoriaMaisFeita:
          categoriaMaisFeita?.[1] ??
          0,
      };
    }, [historico]);

  /*
   * =======================================================
   * RENDER
   * =======================================================
   */

  return (
    <main className="min-h-screen bg-[#f6f4f1] text-[#292624]">

      <div className="mx-auto min-h-screen max-w-[520px] px-[18px] pb-10 pt-6">

        <Header />

        <Menu
          pagina={pagina}
          setPagina={(novaPagina) =>
            setPagina(
              novaPagina as Pagina
            )
          }
        />

        {/* =================================================
            INÍCIO
        ================================================= */}

        {pagina === "inicio" && (
          <section>

            <div className="grid grid-cols-2 gap-3">

              {categorias.map(
                (
                  categoria
                ) => (
                  <CategoriaCard
                    key={
                      categoria.id
                    }
                    id={
                      categoria.id
                    }
                    emoji={
                      categoria.emoji
                    }
                    nome={
                      categoria.nome
                    }
                    descricao={
                      categoria.descricao
                    }
                    onClick={
                      selecionarCategoria
                    }
                  />
                )
              )}

            </div>

            <div className="mt-5 rounded-[20px] bg-white p-5 text-center shadow-sm">

              <div
                className="text-2xl"
                aria-hidden="true"
              >
                ✨
              </div>

              <h2 className="mt-2 text-base font-semibold">
                Nosso Rolê
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-[#77716c]">
                Escolham uma categoria e
                deixem o destino decidir
                por vocês.
              </p>

            </div>

          </section>
        )}

        {/* =================================================
            SORTEIO
        ================================================= */}

        {pagina === "sorteio" && (
          <section>

            {!resultado && (
              <div className="rounded-[26px] bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

                <div
                  className="text-[50px]"
                  aria-hidden="true"
                >
                  {
                    categoriaAtual?.emoji
                  }
                </div>

                <div className="mt-3 text-[11px] font-bold uppercase tracking-[1.4px] text-[#8b8179]">
                  {
                    categoriaAtual?.nome
                  }
                </div>

                <h2 className="mt-2 text-[27px] font-bold">
                  Vamos sortear?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#706a65]">
                  Deixem o destino decidir
                  o rolê de vocês.
                </p>

                {/* LOCALIZAÇÃO */}

                {categoriaUsaLocalizacao && (
                  <Localizacao
                    onLocalizacaoEncontrada={
                      atualizarLocalizacao
                    }
                  />
                )}

                {categoriaUsaLocalizacao &&
                  localizacao?.cidade &&
                  localizacao?.estado && (
                    <div className="mt-3 rounded-2xl bg-[#f6f4f1] px-4 py-3 text-left text-xs text-[#706a65]">

                      {buscandoEstabelecimentos ? (
                        <>
                          🔎 Procurando opções em{" "}
                          <strong>
                            {
                              localizacao.cidade
                            }{" "}
                            -{" "}
                            {
                              localizacao.estado
                            }
                          </strong>
                          ...
                        </>
                      ) : (
                        <>
                          📍{" "}
                          <strong>
                            {
                              estabelecimentosInternet.length
                            }
                          </strong>{" "}
                          opções encontradas na
                          internet em{" "}
                          <strong>
                            {
                              localizacao.cidade
                            }
                          </strong>
                          .
                        </>
                      )}

                    </div>
                  )}

                {erroEstabelecimentos && (
                  <div className="mt-3 rounded-2xl bg-[#fff4f4] px-4 py-3 text-left text-xs text-[#a05252]">
                    {
                      erroEstabelecimentos
                    }
                  </div>
                )}

                {/* FILTROS */}

                {categoriaSelecionada && (
                  <Filtros
                    categoria={
                      categoriaSelecionada
                    }
                    precoMaximo={
                      categoriaUsaLocalizacao
                        ? precoMaximo
                        : undefined
                    }
                    excluirRealizados={
                      excluirRealizados
                    }
                    onPrecoChange={
                      categoriaUsaLocalizacao
                        ? setPrecoMaximo
                        : () => {}
                    }
                    onExcluirRealizadosChange={
                      setExcluirRealizados
                    }
                  />
                )}

                {/* ERRO */}

                {mensagemErro && (
                  <div
                    role="alert"
                    className="mt-4 rounded-2xl bg-[#fff4f4] px-4 py-3 text-sm text-[#a05252]"
                  >
                    {
                      mensagemErro
                    }
                  </div>
                )}

                {/* BOTÕES */}

                <div className="mt-6 flex gap-2">

                  <button
                    type="button"
                    onClick={
                      voltarInicio
                    }
                    className="flex-1 rounded-2xl bg-[#eeeae5] px-4 py-4 text-sm font-semibold text-[#514b46] transition active:scale-[0.98]"
                  >
                    ← Voltar
                  </button>

                  <button
                    type="button"
                    onClick={
                      realizarSorteio
                    }
                    className="flex-1 rounded-2xl bg-[#5f7769] px-4 py-4 text-sm font-semibold text-white transition active:scale-[0.98]"
                  >
                    🎲 Sortear
                  </button>

                </div>

              </div>
            )}

            {/* RESULTADO */}

            {resultado && (
              <ResultadoCard
                resultado={
                  resultado
                }
                favorito={
                  resultadoEhFavorito()
                }
                onFavoritar={
                  alternarFavorito
                }
                onNovamente={
                  sortearNovamente
                }
                onAprovar={
                  aprovarRole
                }
                onVoltar={
                  voltarInicio
                }
              />
            )}

          </section>
        )}

        {/* =================================================
            HISTÓRICO
        ================================================= */}

        {pagina === "historico" && (
          <section>

            <div className="rounded-[26px] bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  📋 Histórico
                </h2>

                <span className="rounded-full bg-[#f6f4f1] px-3 py-1 text-xs font-semibold text-[#77716c]">
                  {
                    historico.length
                  }
                </span>

              </div>

              {historico.length ===
              0 ? (

                <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-5 text-center">

                  <div
                    className="text-3xl"
                    aria-hidden="true"
                  >
                    📭
                  </div>

                  <p className="mt-2 text-sm text-[#77716c]">
                    Nenhum rolê realizado
                    ainda.
                  </p>

                  <p className="mt-1 text-xs text-[#9a938d]">
                    Os rolês aprovados
                    aparecerão aqui.
                  </p>

                </div>

              ) : (

                <div className="mt-5 space-y-3">

                  {historico.map(
                    (
                      item
                    ) => (
                      <div
                        key={
                          item.id
                        }
                        className="rounded-2xl bg-[#f6f4f1] p-4"
                      >

                        <button
                          type="button"
                          onClick={() =>
                            abrirHistoricoItem(
                              item
                            )
                          }
                          className="w-full text-left"
                        >

                          <div className="flex items-center gap-3">

                            <div className="text-3xl">
                              {
                                item.emoji
                              }
                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="font-semibold">
                                {
                                  item.nome
                                }
                              </div>

                              <div className="mt-1 text-xs text-[#8a847f]">
                                {
                                  item.categoria
                                }
                              </div>

                              {item.avaliacao && (
                                <div className="mt-1 text-xs text-[#8a847f]">
                                  {"⭐".repeat(
                                    item.avaliacao
                                      .nota
                                  )}
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
                              abrirAvaliacao(
                                item
                              )
                            }
                            className="flex-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#5f7769]"
                          >
                            ⭐{" "}
                            {item.avaliacao
                              ? "Editar avaliação"
                              : "Avaliar"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluirItemHistorico(
                                item.id
                              )
                            }
                            className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#a05252]"
                          >
                            🗑️ Excluir
                          </button>

                        </div>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </section>
        )}

        {/* =================================================
            FAVORITOS
        ================================================= */}

        {pagina === "favoritos" && (
          <section>

            <div className="rounded-[26px] bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  ❤️ Favoritos
                </h2>

                <span className="rounded-full bg-[#f6f4f1] px-3 py-1 text-xs font-semibold text-[#77716c]">
                  {
                    favoritos.length
                  }
                </span>

              </div>

              {favoritos.length ===
              0 ? (

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
                    Salvem os rolês que
                    vocês mais gostarem.
                  </p>

                </div>

              ) : (

                <div className="mt-5 space-y-3">

                  {favoritos.map(
                    (
                      role
                    ) => (
                      <div
                        key={
                          role.id
                        }
                        className="rounded-2xl bg-[#f6f4f1] p-4"
                      >

                        <button
                          type="button"
                          onClick={() =>
                            abrirFavorito(
                              role
                            )
                          }
                          className="w-full text-left"
                        >

                          <div className="flex items-center gap-3">

                            <div className="text-3xl">
                              {
                                role.emoji
                              }
                            </div>

                            <div className="min-w-0 flex-1">

                              <div className="font-semibold">
                                {
                                  role.nome
                                }
                              </div>

                              <div className="mt-1 text-xs text-[#8a847f]">
                                {
                                  role.categoria
                                }
                              </div>

                            </div>

                            <div className="text-[#aaa39c]">
                              →
                            </div>

                          </div>

                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removerFavorito(
                              role.id
                            )
                          }
                          className="mt-3 w-full rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#a05252]"
                        >
                          ❤️ Remover dos favoritos
                        </button>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </section>
        )}

        {/* =================================================
            ESTATÍSTICAS
        ================================================= */}

        {pagina === "estatisticas" && (
          <section>

            <div className="rounded-[26px] bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                📊 Estatísticas
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-[#f6f4f1] p-4 text-center">

                  <div className="text-2xl">
                    🎲
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {
                      estatisticas.totalRealizados
                    }
                  </div>

                  <div className="text-xs text-[#8a847f]">
                    Rolês realizados
                  </div>

                </div>

                <div className="rounded-2xl bg-[#f6f4f1] p-4 text-center">

                  <div className="text-2xl">
                    ⭐
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {
                      estatisticas.media
                        ? estatisticas.media.toFixed(
                            1
                          )
                        : "-"
                    }
                  </div>

                  <div className="text-xs text-[#8a847f]">
                    Nota média
                  </div>

                </div>

                <div className="rounded-2xl bg-[#f6f4f1] p-4 text-center">

                  <div className="text-2xl">
                    💰
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    R${" "}
                    {estatisticas.totalGasto.toFixed(
                      2
                    )}
                  </div>

                  <div className="text-xs text-[#8a847f]">
                    Total gasto
                  </div>

                </div>

                <div className="rounded-2xl bg-[#f6f4f1] p-4 text-center">

                  <div className="text-2xl">
                    ❤️
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {
                      estatisticas.totalAvaliacoes
                    }
                  </div>

                  <div className="text-xs text-[#8a847f]">
                    Avaliações
                  </div>

                </div>

              </div>

              <div className="mt-4 rounded-2xl bg-[#f6f4f1] p-5">

                <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
                  Resumo
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#5f5954]">

                  {estatisticas.totalAvaliacoes ===
                  0
                    ? "Vocês ainda não avaliaram nenhum rolê."
                    : `${estatisticas.totalAvaliacoes} ${
                        estatisticas.totalAvaliacoes ===
                        1
                          ? "rolê avaliado"
                          : "rolês avaliados"
                      }, com média de ${estatisticas.media.toFixed(
                        1
                      )} estrelas.`}

                </p>

                {estatisticas.categoriaMaisFeita && (
                  <p className="mt-2 text-sm leading-relaxed text-[#5f5954]">
                    A categoria mais realizada
                    foi{" "}
                    <strong>
                      {
                        estatisticas.categoriaMaisFeita
                      }
                    </strong>{" "}
                    com{" "}
                    <strong>
                      {
                        estatisticas.quantidadeCategoriaMaisFeita
                      }
                    </strong>{" "}
                    rolê(s).
                  </p>
                )}

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            MODAL DE AVALIAÇÃO
        ================================================= */}

        {avaliando && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

            <div className="w-full max-w-[480px] rounded-[26px] bg-white p-6 shadow-2xl">

              <div className="text-center">

                <div className="text-4xl">
                  {
                    avaliando.emoji
                  }
                </div>

                <h2 className="mt-2 text-xl font-bold">
                  Avaliar rolê
                </h2>

                <p className="mt-1 text-sm text-[#77716c]">
                  {
                    avaliando.nome
                  }
                </p>

              </div>

              {/* NOTA */}

              <div className="mt-6">

                <label className="text-sm font-semibold text-[#514b46]">
                  ⭐ Nota
                </label>

                <div className="mt-3 flex justify-center gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (
                      valor
                    ) => (
                      <button
                        key={
                          valor
                        }
                        type="button"
                        onClick={() =>
                          setNota(
                            valor
                          )
                        }
                        aria-label={`Dar nota ${valor}`}
                        className={`text-3xl transition ${
                          valor <=
                          nota
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                      >
                        ⭐
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* GASTO */}

              <div className="mt-5">

                <label
                  htmlFor="gasto"
                  className="text-sm font-semibold text-[#514b46]"
                >
                  💰 Quanto vocês gastaram?
                </label>

                <input
                  id="gasto"
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    gasto
                  }
                  onChange={(
                    event
                  ) =>
                    setGasto(
                      event.target
                        .value
                    )
                  }
                  placeholder="Ex.: 85,00"
                  className="mt-2 w-full rounded-xl border border-[#e5e0db] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7769]"
                />

              </div>

              {/* COMENTÁRIO */}

              <div className="mt-5">

                <label
                  htmlFor="comentario"
                  className="text-sm font-semibold text-[#514b46]"
                >
                  💬 Comentário
                </label>

                <textarea
                  id="comentario"
                  value={
                    comentario
                  }
                  onChange={(
                    event
                  ) =>
                    setComentario(
                      event.target
                        .value
                    )
                  }
                  placeholder="Como foi a experiência?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-[#e5e0db] bg-white px-4 py-3 text-sm outline-none focus:border-[#5f7769]"
                />

              </div>

              {/* BOTÕES */}

              <div className="mt-5 flex gap-2">

                <button
                  type="button"
                  onClick={
                    fecharAvaliacao
                  }
                  className="flex-1 rounded-2xl bg-[#eeeae5] px-4 py-3.5 text-sm font-semibold text-[#514b46]"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={
                    salvarAvaliacaoAtual
                  }
                  className="flex-1 rounded-2xl bg-[#5f7769] px-4 py-3.5 text-sm font-semibold text-white"
                >
                  💾 Salvar
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            RODAPÉ
        ================================================= */}

        <footer className="mt-8 text-center text-[11px] text-[#aaa39c]">
          Feito por duas pessoas que nunca
          conseguem decidir o que fazer ❤️
        </footer>

      </div>
    </main>
  );
}