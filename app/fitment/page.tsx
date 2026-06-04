import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { IconTarget, IconWrench, IconShield, IconForged } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Fitment na míru",
  description: "Poradíme s rozměrem, ET, roztečí i středovou dírou. Kola, která dokonale sednou.",
};

const checklist = [
  { icon: IconTarget, title: "Rozměr & ET", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { icon: IconWrench, title: "Rozteč & středová díra", text: "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim." },
  { icon: IconShield, title: "Pneu & únosnost", text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea." },
  { icon: IconForged, title: "Distanční podložky", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse." },
];

export default function FitmentPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0" />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow">Fitment</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">Aby kola sedla</span> na milimetr
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {checklist.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-bg-2 py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Poradenství</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Nevíš, co na auto sedne?
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Napiš nám vozidlo a
              představu, my doladíme rozměr i provedení.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Lorem ipsum dolor sit amet consectetur.",
                "Adipiscing elit sed do eiusmod tempor.",
                "Incididunt ut labore et dolore magna.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-fg/85">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div id="poptavka" className="scroll-mt-24">
            <InquiryForm subject="Fitment – konzultace" />
          </div>
        </div>
      </section>
    </div>
  );
}
