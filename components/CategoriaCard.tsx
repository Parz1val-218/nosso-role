type CategoriaCardProps = {
  id: string;
  emoji: string;
  nome: string;
  descricao: string;
  onClick: (id: string) => void;
};

export default function CategoriaCard({
  id,
  emoji,
  nome,
  descricao,
  onClick,
}: CategoriaCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      aria-label={`Escolher categoria ${nome}`}
      className="min-h-[125px] rounded-[20px] bg-white px-3 py-5 text-center shadow-[0_5px_18px_rgba(0,0,0,0.06)] transition active:scale-[0.96] hover:shadow-md"
    >
      <div
        className="mb-2 text-[34px]"
        aria-hidden="true"
      >
        {emoji}
      </div>

      <div className="text-base font-semibold">
        {nome}
      </div>

      <div className="mt-1 text-xs text-[#8a847f]">
        {descricao}
      </div>
    </button>
  );
}