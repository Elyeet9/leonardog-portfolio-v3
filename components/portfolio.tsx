"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DICT, SECTION_IDS, type Lang, type SectionId } from "@/lib/content";
import { setLang, useLang } from "@/lib/lang";
import About from "./sections/about";
import Contact from "./sections/contact";
import Experience from "./sections/experience";
import Home from "./sections/home";
import Projects from "./sections/projects";
import Skills from "./sections/skills";

type Phase = "" | "cover" | "reveal";

/** The seven strips of the screen wipe; odd ones sweep in from the opposite side. */
const STRIPS = [0, 1, 2, 3, 4, 5, 6].map(
  (n) => ({ "--i": n, "--o1": n % 2 ? "right" : "left", "--o2": n % 2 ? "left" : "right" }) as CSSProperties,
);
/** The screen is fully covered by now, so content can be swapped unseen. */
const SWAP_AT_MS = 410;
const REVEAL_MS = 420;
/** Keeps the mobile menu mounted long enough for its collapse animation. */
const MENU_OUT_MS = 340;
const NOISE = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789#/";

/** A/B class: swapping it restarts the CSS animation bound to it. */
const ab = (n: number) => (n % 2 ? "fxa" : "fxb");

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Portfolio() {
  const lang = useLang();
  const c = DICT[lang];

  const [section, setSection] = useState<SectionId>("home");
  const [menu, setMenu] = useState({ open: false, mounted: false });
  const [wipe, setWipe] = useState<{ phase: Phase; target: string }>({ phase: "", target: "" });
  const [titleText, setTitleText] = useState("");
  const [fx, setFx] = useState({ sec: 0, role: 0, skill: 0, proj: 0 });
  // Selections live here so they survive switching sections.
  const [role, setRole] = useState(0);
  const [skillCat, setSkillCat] = useState(0);
  const [project, setProject] = useState(0);
  const [sent, setSent] = useState(false);

  const live = useRef({
    busy: false,
    timers: [] as ReturnType<typeof setTimeout>[],
    scramble: undefined as ReturnType<typeof setInterval> | undefined,
  });

  useEffect(() => {
    const l = live.current;
    return () => {
      l.timers.forEach(clearTimeout);
      clearInterval(l.scramble);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const later = (fn: () => void, ms: number) => {
    live.current.timers.push(setTimeout(fn, ms));
  };

  /** Letters resolve left to right out of noise. */
  const scramble = (final: string) => {
    const l = live.current;
    let frame = 0;
    clearInterval(l.scramble);
    l.scramble = setInterval(() => {
      frame++;
      const shown = Math.floor((frame / 14) * final.length);
      const text = final
        .split("")
        .map((ch, i) => (i < shown || ch === " " ? ch : NOISE[Math.floor(Math.random() * NOISE.length)]))
        .join("");
      if (frame >= 16) {
        clearInterval(l.scramble);
        setTitleText("");
      } else {
        setTitleText(text);
      }
    }, 35);
  };

  const closeMenu = () => {
    setMenu((m) => ({ ...m, open: false }));
    later(() => setMenu((m) => (m.open ? m : { open: false, mounted: false })), MENU_OUT_MS);
  };

  const toggleMenu = () => {
    if (menu.open) closeMenu();
    else setMenu({ open: true, mounted: true });
  };

  /** Cover the screen with strips, run `swap` while nothing is visible, then uncover. */
  const wipeTo = (target: string, title: string, swap: () => void) => {
    const l = live.current;
    l.busy = true;
    setWipe({ phase: "cover", target });
    later(() => {
      swap();
      setWipe({ phase: "reveal", target });
      setFx((f) => ({ sec: f.sec + 1, role: f.role + 1, skill: f.skill + 1, proj: f.proj + 1 }));
      scramble(title);
    }, SWAP_AT_MS);
    later(() => {
      setWipe({ phase: "", target });
      l.busy = false;
    }, SWAP_AT_MS + REVEAL_MS);
  };

  const navigate = (id: SectionId) => {
    if (menu.open) closeMenu();
    if (live.current.busy || id === section) return;
    const show = () => {
      setSection(id);
      window.scrollTo(0, 0);
    };
    if (prefersReducedMotion()) {
      show();
      setFx((f) => ({ ...f, sec: f.sec + 1 }));
      return;
    }
    wipeTo(id, c.sections[id].toUpperCase(), show);
  };

  const toggleLang = () => {
    if (live.current.busy) return;
    const next: Lang = lang === "en" ? "es" : "en";
    if (prefersReducedMotion()) {
      setLang(next);
      return;
    }
    wipeTo(`lang:${next}`, DICT[next].sections[section].toUpperCase(), () => setLang(next));
  };

  const idx = SECTION_IDS.indexOf(section);
  const prev = SECTION_IDS[(idx + SECTION_IDS.length - 1) % SECTION_IDS.length];
  const next = SECTION_IDS[(idx + 1) % SECTION_IDS.length];
  const wipeLabel = wipe.target.startsWith("lang:")
    ? wipe.target.slice(5).toUpperCase()
    : wipe.target
      ? c.sections[wipe.target as SectionId]
      : "";

  return (
    <div className="nier flex min-h-screen flex-col" lang={lang}>
      {/* TOP BAR */}
      <header className="relative z-30 px-(--hp)">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-ink py-3 max-[430px]:gap-x-3">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div className="flex min-h-11 items-center gap-3.5">
              <div className="flex size-[22px] flex-none items-center justify-center bg-ink text-bg">
                <div className="sq" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="brandname text-[16px] font-semibold tracking-[.28em] whitespace-nowrap uppercase">{c.name}</div>
                <div className="label bsub text-[11px]">{c.portfolio}</div>
              </div>
            </div>
            <nav className="dnav" aria-label={c.navAria}>
              {SECTION_IDS.map((id, i) => (
                <button
                  key={id}
                  className={`navtab ${id === section ? "on" : ""}`}
                  aria-current={id === section ? "page" : undefined}
                  onClick={() => navigate(id)}
                >
                  <span className="num">0{i + 1}</span>
                  <span>{c.sections[id]}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="lg" aria-label={c.langAria} onClick={toggleLang}>
              <span className={lang === "en" ? "on" : ""}>EN</span>
              <span className={lang === "es" ? "on" : ""}>ES</span>
            </button>
            <button
              className={`btn mbtn ${menu.open ? "solid" : ""}`}
              aria-label={c.menuAria}
              aria-expanded={menu.open}
              aria-controls="mnav"
              onClick={toggleMenu}
            >
              <span className={`mi ${menu.open ? "open" : ""}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="mlabel">{c.menu}</span>
            </button>
          </div>
        </div>
        <div className="mx-auto mt-1 max-w-[1240px] border-b border-line" />
        <div className="mwrap">
          {menu.mounted && (
            <nav id="mnav" className={`mnav panel ${menu.open ? "" : "out"}`} aria-label={c.navAria}>
              {SECTION_IDS.map((id, i) => (
                <button
                  key={id}
                  className={`row ${id === section ? "on" : ""}`}
                  aria-current={id === section ? "page" : undefined}
                  onClick={() => navigate(id)}
                >
                  <span className="sq" />
                  {c.sections[id]}
                  <span className="tag">0{i + 1}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* SCREEN BODY */}
      <main className={`mx-auto w-full max-w-[1304px] flex-1 px-8 pt-10 pb-6 ${wipe.phase ? "shake" : ""}`}>
        {/* Below 560px the title tightens so the longest section name still fits on one row. */}
        <div className="mb-9 flex items-center gap-4 max-[560px]:gap-2.5">
          <div className="sq size-3" />
          <h1
            className={`ttl ${ab(fx.sec)} text-[26px] font-light tracking-[.38em] whitespace-nowrap uppercase max-[560px]:text-[clamp(16px,5vw,26px)] max-[560px]:tracking-[.24em]`}
            aria-label={c.sections[section]}
          >
            {titleText || c.sections[section]}
          </h1>
          <div className={`hdr-line ${ab(fx.sec)} h-px min-w-6 flex-1 bg-ink max-[560px]:min-w-0`} />
          <div className="label">0{idx + 1} / 06</div>
        </div>

        {section === "home" && (
          <Home
            t={c}
            role={role}
            fx={ab(fx.role)}
            onPickRole={(i) => {
              setRole(i);
              setFx((f) => ({ ...f, role: f.role + 1 }));
            }}
            onGo={navigate}
          />
        )}
        {section === "about" && <About t={c} />}
        {section === "skills" && (
          <Skills
            t={c}
            category={skillCat}
            fx={ab(fx.skill)}
            onPickCategory={(i) => {
              setSkillCat(i);
              setFx((f) => ({ ...f, skill: f.skill + 1 }));
            }}
          />
        )}
        {section === "projects" && (
          <Projects
            t={c}
            project={project}
            fx={ab(fx.proj)}
            onPickProject={(i) => {
              setProject(i);
              setFx((f) => ({ ...f, proj: f.proj + 1 }));
            }}
          />
        )}
        {section === "experience" && <Experience t={c} />}
        {section === "contact" && <Contact t={c} sent={sent} onSent={() => setSent(true)} />}
      </main>

      {/* FOOTER / PREV-NEXT */}
      <footer className="px-8 pb-8">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-t border-ink pt-4">
          <button className="btn" onClick={() => navigate(prev)}>
            <span aria-hidden="true">◂</span>
            {c.sections[prev]}
          </button>
          <div className="label">{c.footer}</div>
          <button className="btn" onClick={() => navigate(next)}>
            {c.sections[next]}
            <span aria-hidden="true">▸</span>
          </button>
        </div>
      </footer>

      <div className="scanband" aria-hidden="true" />

      {wipe.phase && (
        <div className={`ov ${wipe.phase}`} aria-hidden="true">
          {STRIPS.map((style, n) => (
            <div key={n} className="strip" style={style} />
          ))}
          <div className="tl mono">
            <div className="sq" />
            {`${c.loading} // ${wipeLabel}`}
            <span className="blink">_</span>
          </div>
        </div>
      )}
    </div>
  );
}
