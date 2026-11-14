import { SKILLS, type Copy } from "@/lib/content";

interface SkillsProps {
  t: Copy;
  category: number;
  /** A/B class that replays the row slide-in and the gauge fill. */
  fx: string;
  onPickCategory: (index: number) => void;
}

export default function Skills({ t, category, fx, onPickCategory }: SkillsProps) {
  const current = SKILLS[category];

  return (
    <div className="pane flex flex-wrap items-start gap-12">
      <div className="panel max-w-[380px] min-w-0 flex-[1_1_280px]">
        <div className="label border-b border-line px-3.5 py-3">{t.categories}</div>
        {SKILLS.map((cat, i) => (
          <button
            key={cat.id}
            className={`row ${i === category ? "on" : ""}`}
            aria-pressed={i === category}
            onClick={() => onPickCategory(i)}
          >
            <span className="sq" />
            {t.cats[cat.id]}
          </button>
        ))}
      </div>

      <div className={`panel fxs ${fx} min-w-0 flex-[999_1_460px]`}>
        <div className="label border-b border-line px-3.5 py-3">{t.cats[current.id]}</div>
        <div className="px-5 pt-2 pb-5">
          {current.items.map(([name, level]) => (
            <div key={name} className="srow flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line py-3.5">
              <div className="flex-[1_1_160px] text-[16px] tracking-[.08em]">{name}</div>
              <div className="gauge flex-[2_1_180px]" role="img" aria-label={t.levelAria.replace("{n}", String(level))}>
                <div style={{ width: `${level * 20}%` }} />
              </div>
              <div className="mono w-11 text-right text-[12px]">LV.{level}</div>
            </div>
          ))}
          <div className="label mt-4">{t.levelsNote}</div>
        </div>
      </div>
    </div>
  );
}
