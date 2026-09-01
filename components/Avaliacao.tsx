"use client";

type AvaliacaoProps = {
  nota: number;
  onAvaliar: (nota: number) => void;
};

export default function Avaliacao({
  nota,
  onAvaliar,
}: AvaliacaoProps) {
  return (
    <div className="mt-5 rounded-2xl bg-[#f6f4f1] p-4 text-center">
      <div className="text-xs font-bold uppercase tracking-[1.2px] text-[#8b8179]">
        ⭐ Como foi esse rolê?
      </div>

      <div className="mt-3 flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((valor) => (
          <button
            key={valor}
            type="button"
            onClick={() => onAvaliar(valor)}
            aria-label={`Avaliar com ${valor} estrelas`}
            className="text-3xl transition active:scale-90"
          >
            {valor <= nota ? "★" : "☆"}
          </button>
        ))}
      </div>

      {nota > 0 && (
        <p className="mt-2 text-xs text-[#8a847f]">
          {nota === 1 && "Não foi muito bom 😕"}
          {nota === 2 && "Poderia ter sido melhor."}
          {nota === 3 && "Foi bom! 🙂"}
          {nota === 4 && "Gostamos bastante! ❤️"}
          {nota === 5 && "Foi incrível! 🥰"}
        </p>
      )}
    </div>
  );
}