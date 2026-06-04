import Link from "next/link";
import { HeroWheel } from "@/components/HeroWheel";
import { WheelCard } from "@/components/WheelCard";
import { IconForged, IconTarget, IconTruck, IconPin, IconWrench, IconShield, IconArrow } from "@/components/Icons";
import { wheels } from "@/lib/wheels";
import { site } from "@/lib/site";

const trust = [
  { icon: IconShield, label: "Originál & forged" },
  { icon: IconTarget, label: "Fitment na míru" },
  { icon: IconTruck, label: `Doprava ${site.shipping}` },
  { icon: IconPin, label: site.city },
];

const features = [
  {
    icon: IconForged,
    title: "Kovaná kola",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: IconTarget,
    title: "Fitment poradenství",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    icon: IconWrench,
    title: "Kola na míru",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
  },
];

const steps = [
  { n: "01", title: "Vyber styl", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do." },
  { n: "02", title: "Zaměříme fitment", text: "Tempor incididunt ut labore et dolore magna aliqua ut enim." },
  { n: "03", title: "Vyrobíme & doručíme", text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip." },
];

const stats = [
  { value: "150+", label: "realizací" },
  { value: "5", label: "let zkušeností" },
  { value: "20+", label: "značek kol" },
  { value: "48 h", label: "reakce na poptávku" },
];

export default function Home() {
  const featured = wheels.slice(0, 4);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(92,214,230,0.12), transparent 60%)" }}
        />

        <div className="container-x relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-10 text-center">
          <span className="eyebrow is-centered fade-up">Kovaná kola &amp; fitment</span>

          <h1 className="fade-up mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Kola, která sedí</span>
            <br />
            přesně na tvoje auto
          </h1>

          <p className="fade-up mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. OEM+ styling, custom kola a
            fitment na míru — {site.city}, doprava po celé ČR.
          </p>

          {/* 3D wheel — centerpiece */}
          <div className="relative my-2 h-[clamp(300px,42vh,470px)] w-full max-w-3xl">
            <HeroWheel />
          </div>

          <div className="fade-up flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/katalog" className="btn btn-primary">
              Prohlédnout katalog
            </Link>
            <Link href="/kontakt#poptavka" className="btn btn-ghost">
              Nezávazná poptávka
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST STRIP ---------------- */}
      <section className="border-y border-line bg-bg-2">
        <div className="container-x grid grid-cols-2 gap-px md:grid-cols-4">
          {trust.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 py-6 text-sm font-medium text-muted"
            >
              <Icon className="h-5 w-5 text-accent" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED WHEELS ---------------- */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Vybraná kola</span>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Z aktuální nabídky
            </h2>
          </div>
          <Link
            href="/katalog"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            Celý katalog <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((w) => (
            <WheelCard key={w.slug} w={w} />
          ))}
        </div>
      </section>

      {/* ---------------- WHY ---------------- */}
      <section className="border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Proč oarts</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Detail, který je vidět
            </h2>
            <p className="mt-4 text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Jak to funguje</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Od výběru po montáž
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore.
            </p>
            <Link href="/fitment" className="btn btn-ghost mt-8">
              Více o fitmentu
            </Link>
          </div>

          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-6 py-6 ${i !== steps.length - 1 ? "border-b border-line" : ""}`}
              >
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-y border-line bg-bg-2">
        <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-x py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white/[0.05] to-transparent px-6 py-16 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(92,214,230,0.14), transparent 70%)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Máš vyhlédnutý set? Pošli nám nezávaznou poptávku.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ozveme se do 48 hodin.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/kontakt#poptavka" className="btn btn-primary">
                Nezávazná poptávka
              </Link>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Sledovat na Instagramu
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
