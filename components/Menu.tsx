"use client";

type MenuProps = {
pagina: string;
setPagina: (pagina: string) => void;
};

export default function Menu({
pagina,
setPagina,
}: MenuProps) {
const itens = [
{
id: "inicio",
emoji: "🏠",
nome: "Início",
},
{
id: "historico",
emoji: "📋",
nome: "Histórico",
},
{
id: "favoritos",
emoji: "❤️",
nome: "Favoritos",
},
{
id: "estatisticas",
emoji: "📊",
nome: "Estatísticas",
},
];

return ( <nav
   aria-label="Navegação principal"
   className="mb-5 rounded-2xl bg-white p-2 shadow-sm"
 > <div className="grid grid-cols-4 gap-1">
{itens.map((item) => {
const ativo = pagina === item.id;


      return (
        <button
          key={item.id}
          type="button"
          onClick={() => setPagina(item.id)}
          className={`rounded-xl px-2 py-3 text-center transition active:scale-[0.97] ${
            ativo
              ? "bg-[#5f7769] text-white"
              : "text-[#77716c] hover:bg-[#f6f4f1]"
          }`}
        >
          <div
            className="text-lg leading-none"
            aria-hidden="true"
          >
            {item.emoji}
          </div>

          <div className="mt-1 text-[10px] font-semibold">
            {item.nome}
          </div>
        </button>
      );
    })}
  </div>
</nav>


);
}
