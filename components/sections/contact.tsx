import { useEffect, useRef, useState, type FormEvent } from "react";
import { LINKS, type Copy } from "@/lib/content";

interface ContactProps {
  t: Copy;
  sent: boolean;
  onSent: () => void;
}

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;
/** On narrow screens a long value drops below its label instead of overflowing the row. */
const ROW = "row flex-wrap gap-y-1 py-2";

export default function Contact({ t, sent, onSent }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  // Discord has no profile URL to link to, so the row copies the username instead.
  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.discord);
    } catch {
      return; // Clipboard blocked: the username is still readable in the row.
    }
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  // No backend: hand the message to the visitor's own email app.
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const name = field("name");
    const email = field("email");
    const subject = `${t.mailSubject} // ${name}`;
    const body = `${field("message")}\n\n${name}${email ? ` <${email}>` : ""}`;
    window.location.assign(`mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    onSent();
  };

  return (
    <div className="pane flex flex-wrap items-start gap-12">
      <div className="panel max-w-[460px] min-w-0 flex-[1_1_320px]">
        <div className="label border-b border-line px-3.5 py-3">{t.channels}</div>
        <a className={ROW} href={`mailto:${LINKS.email}`}>
          <span className="sq opacity-60" />
          {t.chEmail}
          <span className="tag">{LINKS.email}</span>
        </a>
        <a className={ROW} href={LINKS.linkedin} {...EXTERNAL}>
          <span className="sq opacity-60" />
          LinkedIn
          <span className="tag">Leonardo Goyas Ayllón</span>
        </a>
        <a className={ROW} href={LINKS.github} {...EXTERNAL}>
          <span className="sq opacity-60" />
          GitHub
          <span className="tag">github.com/Elyeet9</span>
        </a>
        <a className={ROW} href={LINKS.x} {...EXTERNAL}>
          <span className="sq opacity-60" />X / Twitter
          <span className="tag">@elyeettweets</span>
        </a>
        <button className={`${ROW} border-b-0`} onClick={copyDiscord}>
          <span className="sq opacity-60" />
          Discord
          <span className="tag" aria-live="polite">{`${LINKS.discord} // ${copied ? t.copied : t.copy}`}</span>
        </button>
      </div>

      <form className="panel flex max-w-[700px] min-w-0 flex-[999_1_420px] flex-col gap-4 p-5" onSubmit={send}>
        <div className="label">{t.transmission}</div>
        <p className="text-[17px] leading-[1.6] text-mute">{t.contactIntro}</p>
        <div className="flex flex-col gap-1.5">
          <label className="label" htmlFor="c-name">
            {t.fName}
          </label>
          <input id="c-name" name="name" className="field" type="text" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label" htmlFor="c-mail">
            {t.fEmail}
          </label>
          <input id="c-mail" name="email" className="field" type="email" autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label" htmlFor="c-msg">
            {t.fMsg}
          </label>
          <textarea id="c-msg" name="message" className="field" rows={5} required />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn solid">
            {t.send}
          </button>
          {sent && <span className="label">{t.sentNote}</span>}
        </div>
      </form>
    </div>
  );
}
