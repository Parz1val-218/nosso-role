import {
  buscarEstabelecimentos,
} from "./estabelecimentos";

async function testar() {
  try {
    const resultados =
      await buscarEstabelecimentos(
        "Campinas",
        "SP"
      );

    console.log(
      "Quantidade encontrada:",
      resultados.length
    );

    console.log(
      resultados.slice(0, 10)
    );
  } catch (erro) {
    console.error(
      "Erro:",
      erro
    );
  }
}

testar();