import Image from "next/image";
import { useState } from "react";
import { PROJECTS, type Copy, type ProjectMedia } from "@/lib/content";

interface ProjectsProps {
  t: Copy;
  project: number;
  /** A/B class that replays the glitch on the project detail. */
  fx: string;
  onPickProject: (index: number) => void;
}

export default function Projects({ t, project, fx, onPickProject }: ProjectsProps) {
  const meta = PROJECTS[project];
  const current = t.projects[meta.id];

  return (
    <div className="pane flex flex-wrap items-start gap-12">
      <div className="panel max-w-[420px] min-w-0 flex-[1_1_340px]">
        <div className="label border-b border-line px-3.5 py-3">{t.archive}</div>
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            className={`row py-2 leading-[1.3] ${i === project ? "on" : ""}`}
            aria-pressed={i === project}
            onClick={() => onPickProject(i)}
          >
            <span className="sq" />
            {t.projects[p.id].title}
            <span className="tag">0{i + 1}</span>
          </button>
        ))}
      </div>

      <div className={`fxg ${fx} flex min-w-0 flex-[999_1_460px] flex-col gap-5`}>
        {/* Keyed so the preview (and a playing demo) resets when another project is picked. */}
        <Preview key={meta.id} media={meta.media} title={current.title} t={t} />
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h2 className="text-[28px] font-semibold tracking-[.12em] uppercase">{current.title}</h2>
          <span className="label">{`${current.kind} // ${meta.year ?? t.featured}`}</span>
        </div>
        <p className="max-w-[680px] text-[18px] leading-[1.7]">{current.desc}</p>
        {current.features && (
          <div className="flex max-w-[680px] flex-col gap-3">
            <div className="label">{t.keyFeatures}</div>
            <ul className="flex flex-col gap-2">
              {current.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[16px] leading-[1.6]">
                  <span className="sq mt-[9px] size-1.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="label">{`${t.statusLabel} ${t.statuses[meta.status]}`}</div>
        <div className="flex flex-wrap gap-2">
          {current.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {meta.repos.length === 0 && <span className="label">{t.noRepo}</span>}
          {meta.repos.map((repo, i) => (
            <a key={repo.url} className={`btn ${i === 0 ? "solid" : ""}`} href={repo.url} target="_blank" rel="noopener noreferrer">
              {t.repoLabels[repo.kind]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Preview({ media, title, t }: { media: ProjectMedia; title: string; t: Copy }) {
  const [playing, setPlaying] = useState(false);

  if (media.type === "image") {
    return (
      <div className="hatch panel relative aspect-video w-full overflow-hidden">
        <Image
          src={media.src}
          alt={t.previewAlt.replace("{title}", title)}
          fill
          sizes="(min-width: 1000px) 900px, 100vw"
          loading="eager"
          unoptimized={media.animated}
          className="object-cover"
        />
      </div>
    );
  }

  if (playing && media.youtubeId) {
    return (
      <div className="hatch panel relative aspect-video w-full overflow-hidden">
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}?autoplay=1&rel=0`}
          title={t.demoTitle.replace("{title}", title)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="hatch panel relative aspect-video w-full overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        <Image
          src={media.src}
          alt=""
          width={240}
          height={240}
          loading="eager"
          className="aspect-square h-[45%] w-auto border border-line bg-panel object-cover"
        />
        {media.youtubeId ? (
          <button className="btn solid" onClick={() => setPlaying(true)}>
            <span className="sq size-1.5" />
            {t.playDemo}
          </button>
        ) : (
          <div className="label bg-panel px-3.5 py-2 text-center">{t.demoSoon}</div>
        )}
      </div>
    </div>
  );
}
