import { Fragment } from "react";
import { LINKS, type Copy } from "@/lib/content";

export default function About({ t }: { t: Copy }) {
  return (
    <div className="pane flex flex-wrap items-start gap-12">
      <div className="panel min-w-0 flex-[1_1_340px]">
        <div className="label border-b border-line px-3.5 py-3">{t.unitData}</div>
        <dl className="grid grid-cols-[130px_minmax(0,1fr)] px-3.5 pt-1.5 pb-3.5">
          {t.unit.map(([key, value], i) => {
            const rule = i < t.unit.length - 1 ? "border-b border-line" : "";
            return (
              <Fragment key={key}>
                <dt className={`label py-3 ${rule}`}>{key}</dt>
                <dd className={`py-3 ${rule}`}>{value}</dd>
              </Fragment>
            );
          })}
        </dl>
      </div>

      <div className="flex max-w-[700px] min-w-0 flex-[999_1_460px] flex-col gap-5">
        <div className="label">{t.logEntry}</div>
        <p className="text-[19px] leading-[1.7]">{t.aboutP1}</p>
        <p className="text-[17px] leading-[1.7] text-mute">{t.aboutP2}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a className="btn solid" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
