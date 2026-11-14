import type { Copy, SectionId } from "@/lib/content";

interface HomeProps {
  t: Copy;
  role: number;
  /** A/B class that replays the glitch on the class data panel. */
  fx: string;
  onPickRole: (index: number) => void;
  onGo: (id: SectionId) => void;
}

export default function Home({ t, role, fx, onPickRole, onGo }: HomeProps) {
  const current = t.roles[role];

  return (
    <div className="pane flex flex-wrap items-start gap-12">
      <div className="@container flex min-w-0 flex-[1_1_420px] flex-col gap-6">
        <div className="label">{t.homeHello}</div>
        {/* Template size, capped so the longest word of the name never outgrows its column. */}
        <h2 className="text-[min(clamp(48px,8vw,104px),15.5cqw)] leading-[.95] font-light tracking-[.04em] uppercase">{t.name}</h2>
        <p className="max-w-[520px] text-[19px] leading-[1.6]">{t.homePitch}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <button className="btn solid" onClick={() => onGo("projects")}>
            <span className="sq size-1.5" />
            {t.btnProjects}
          </button>
          <button className="btn" onClick={() => onGo("contact")}>
            {t.btnContact}
          </button>
        </div>
        <div className="label mt-4 flex items-center gap-2.5">
          <span className="inline-block size-2 flex-none bg-accent" />
          {t.status}
        </div>
        <div className="label">
          {t.homeSelect}
          <span className="blink ml-2">_</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-5">
        <div className="panel">
          <div className="label border-b border-line px-3.5 py-3">{t.classSelect}</div>
          {t.roles.map((r, i) => (
            <button key={i} className={`row ${i === role ? "on" : ""}`} aria-pressed={i === role} onClick={() => onPickRole(i)}>
              <span className="sq" />
              {r.name}
            </button>
          ))}
        </div>
        <div className={`panel fxg ${fx} flex flex-col gap-3.5 p-5`}>
          <div className="label">{t.classData}</div>
          <h3 className="text-[20px] font-semibold tracking-[.14em] uppercase">{current.name}</h3>
          <p className="text-[16px] leading-[1.6]">{current.desc}</p>
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
