import Link from "next/link";
import { HeroWheel } from "@/components/HeroWheel";
import { WheelCard } from "@/components/WheelCard";
import { IconArrow } from "@/components/Icons";
import { wheels } from "@/lib/wheels";
import { site } from "@/lib/site";

const credentials = ["Originál & forged", "Fitment na míru", `Doprava ${site.shipping}`, site.city];

const reasons = [
  {
    n: "01",
    title: "Kovaná kola",
    text: "Lehčí, pevnější a přesnější než lité. Vybíráme kusy, které vydrží okruh i denní provoz.",
  },
  {
    n: "02",
    title: "Fitment na míru",
    text: "Rozměr, ET, rozteč i středová díra doladěné přesně na konkrétní vozidlo.",
  },
  {
    n: "03",
    title: "Kola na zakázku",
    text: "Provedení, barva a leštění podle tvojí představy. Od OEM+ po čistý motorsport.",
  },
];

const steps = [
  { n: "01", title: "Vyber styl", text: "Z katalogu nebo podle reference. Poradíme se značkou i provedením." },
  { n: "02", title: "Zaměříme fitment", text: "Podle vozidla doladíme rozměr, ET a rozteč na milimetr." },
  { n: "03", title: "Vyrobíme a doručíme", text: "Objednáme, zkontrolujeme a pošleme po celé ČR (PPL / GLS)." },
];

export default function Home() {
  const featured = wheels.slice(0, 4);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="container-x relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-12 text-center">
          <span className="label rise">Kovaná kola &amp; fitment</span>

          <h1 className="rise mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-[5rem]">
            <span className="text-fg">Kola, která sedí</span>
            <br />
            <span className="text-champagne">přesně na tvoje auto</span>
          </h1>

          <p className="rise mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Prémiové kované ráfky, OEM+ styling a fitment na zakázku. Sídlíme v Ostravě, posíláme po
            celé ČR.
          </p>

          {/* 3D wheel — the centrepiece */}
          <div className="relative my-1 h-[clamp(320px,46vh,520px)] w-full max-w-3xl">
            <HeroWheel />
          </div>

          <div className="rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/katalog" className="btn btn-primary">
              Prohlédnout katalog
            </Link>
            <Link href="/kontakt#poptavka" className="btn btn-ghost">
              Nezávazná poptávka
            </Link>
          </div>
        </div>

        {/* credential strip */}
        <div className="border-y border-line">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
            {credentials.map((c) => (
              <span key={c} className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED WHEELS ---------------- */}
      <section className="container-x py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="label">Vybraná kola</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Z aktuální nabídky</h2>
          </div>
          <Link href="/katalog" className="link-quiet inline-flex items-center gap-2 text-sm font-medium">
            Celý katalog <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((w) => (
            <WheelCard key={w.slug} w={w} />
          ))}
        </div>
      </section>

      {/* ---------------- WHY (editorial ruled list, not card grid) ---------------- */}
      <section className="border-t border-line">
        <div className="container-x grid gap-x-16 gap-y-12 py-24 md:grid-cols-[0.8fr_1.2fr] md:py-32">
          <div className="md:sticky md:top-28 md:self-start">
            <span className="label">Proč oarts</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Detail, který je vidět
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              Nejde jen o vzhled. Správné kolo zlepší ovladatelnost, sníží neodpruženou hmotnost a drží
              hodnotu vozu.
            </p>
          </div>

          <div className="ruled">
            {reasons.map((r) => (
              <div key={r.n} className="grid grid-cols-[auto_1fr] gap-x-7 py-8 first:pt-0">
                <span className="font-mono text-sm text-champagne">{r.n}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{r.title}</h3>
                  <p className="mt-2 max-w-md text-muted">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="border-t border-line bg-bg-2">
        <div className="container-x grid gap-12 py-24 md:grid-cols-[0.9fr_1.1fr] md:py-32">
          <div>
            <span className="label">Jak to funguje</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Od výběru po montáž</h2>
            <Link href="/fitment" className="btn btn-ghost mt-8">
              Více o fitmentu
            </Link>
          </div>

          <div className="ruled">
            {steps.map((s) => (
              <div key={s.n} className="grid grid-cols-[auto_1fr] gap-x-7 py-7 first:pt-0">
                <span className="font-mono text-sm text-champagne">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t border-line">
        <div className="container-x py-24 text-center md:py-32">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Máš vyhlédnutý set? Pošli nezávaznou poptávku.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Napiš nám vozidlo a představu. Ozveme se s nabídkou a termínem.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/kontakt#poptavka" className="btn btn-primary">
              Nezávazná poptávka
            </Link>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Sledovat na Instagramu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
