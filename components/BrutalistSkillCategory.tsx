import { Skill } from "./types";

export function BrutalistSkillCategory({ category }: { category: Skill }) {
  // Convert text levels to percentages for the brutalist meter
  const getLevelPct = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes("advanced") || l.includes("expert")) return 90;
    if (l.includes("intermediate")) return 65;
    if (l.includes("basic") || l.includes("beginner")) return 35;
    return 50;
  };

  const levelPct = getLevelPct(category.level);

  return (
    <div className="bg-[var(--color-dark)] border-4 border-[var(--color-primary)] p-6 md:p-8 relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--color-accent)] border-4 border-[var(--color-dark)]"></div>
      
      <h3 className="font-jersey text-3xl md:text-4xl text-white uppercase tracking-widest mb-6 border-b-4 border-[var(--color-primary)] pb-4 inline-block">
        {category.name}
      </h3>
      
      {/* Brutalist Meter Representation */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between text-sm font-bold uppercase text-[var(--color-accent)] mb-1">
          <span>Proficiency: {category.level}</span>
        </div>
        <div className="w-full h-8 bg-[var(--color-dark)] border-4 border-[var(--color-primary)] flex">
          <div 
            className="h-full bg-white border-r-4 border-[var(--color-dark)]" 
            style={{ width: `${levelPct}%` }}
          />
          {/* Decorative striped empty remaining area */}
          <div className="flex-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.5)_4px,rgba(0,0,0,0.5)_8px)]"></div>
        </div>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-gray-300 font-medium leading-relaxed border-l-4 border-[var(--color-accent)] pl-4">
          {category.description}
        </p>
      )}
    </div>
  );
}
