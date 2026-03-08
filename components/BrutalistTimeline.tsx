import { GameJam } from "./types";

export function BrutalistTimeline({ jams }: { jams: GameJam[] }) {
  return (
    <div className="flex flex-col gap-12 relative">
      {/* Central axis line */}
      <div className="absolute left-[26px] top-6 bottom-6 w-2 bg-[var(--color-primary)]"></div>

      {jams.map((jam, index) => (
        <div key={index} className="relative flex items-start gap-8 z-10 w-full group">
          
          {/* Diamond Node */}
          <div className="w-[56px] h-[56px] bg-[var(--color-dark)] border-4 border-[var(--color-primary)] flex-shrink-0 flex items-center justify-center transform rotate-45 mt-2 group-hover:bg-[var(--color-primary)] transition-colors">
            <div className="w-4 h-4 bg-[var(--color-accent)] transform -rotate-45"></div>
          </div>

          {/* Jam Content Card */}
          <div className="flex-1 bg-[var(--color-dark)] border-4 border-[var(--color-primary)] p-6 md:p-8 relative">
            {/* Offset brutalist block shadow */}
            <div className="absolute -z-10 bg-[var(--color-primary)] inset-0 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:bg-[var(--color-accent)] transition-all"></div>

            <div className="flex flex-wrap items-baseline gap-4 mb-4 border-b-4 border-[var(--color-primary)] pb-4">
              <span className="font-jersey text-4xl md:text-5xl text-white uppercase tracking-widest leading-none">
                {jam.name}
              </span>
              {jam.year && (
                <span className="bg-[var(--color-primary)] text-[var(--color-dark)] px-3 py-1 font-bold text-sm tracking-widest uppercase">
                  {jam.year}
                </span>
              )}
              {jam.result && (
                <span className="bg-white text-black px-3 py-1 font-bold text-sm tracking-widest uppercase shadow-[2px_2px_0px_#000]">
                  🏆 {jam.result}
                </span>
              )}
            </div>

            <p className="text-gray-200 text-xl font-medium leading-relaxed mb-6">
              <span className="text-[var(--color-accent)] block mb-1 uppercase tracking-widest text-sm font-bold">Project: {jam.project}</span>
              {jam.role && <span className="block mt-2">Role: {jam.role}</span>}
            </p>

            <span className="inline-block bg-[var(--color-dark)] border-2 border-dashed border-[var(--color-primary)] text-gray-400 font-jersey text-xl uppercase tracking-widest px-6 py-2">
              [ ARCHIVED ]
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
