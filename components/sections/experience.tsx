import type { Copy } from "@/lib/content";

export default function Experience({ t }: { t: Copy }) {
  return (
    <div className="pane flex max-w-[900px] flex-col">
      {t.experience.map((entry, i) => {
        const last = i === t.experience.length - 1;
        return (
          <div key={entry.date} className={`flex flex-wrap gap-x-7 gap-y-2 ${last ? "" : "pb-9"}`}>
            <div className="mono flex-[0_0_150px] pt-1 text-[13px] tracking-[.06em]">{entry.date}</div>
            <div className="flex flex-col items-center gap-1.5 text-ink">
              <div className="sq" />
              {!last && <div className="min-h-[100px] w-px flex-1 bg-line" />}
            </div>
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2">
              <h2 className="text-[20px] font-semibold tracking-[.12em] uppercase">{entry.title}</h2>
              <div className="label">{entry.place}</div>
              <p className="mt-1.5 text-[17px] leading-[1.65]">{entry.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
