import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Fitment na míru",
  description: "Poradíme s rozměrem, ET, roztečí i středovou dírou. Kola, která dokonale sednou.",
};

const checklist = [
  { n: "01", title: "Rozměr a ET", text: "Šířka, průměr a zális (ET) podle blatníku, brzd a požadovaného postoje kol." },
  { n: "02", title: "Rozteč a středová díra", text: "Správná rozteč šroubů a vystředění přes náboj nebo centrovací kroužky." },
  { n: "03", title: "Pneumatiky a únosnost", text: "Doporučíme rozměr pneu i index nosnosti pro dané kolo a vozidlo." },
  { n: "04", title: "Distanční podložky", text: "Když je potřeba doladit lícování, poradíme s podložkami a delšími šrouby." },
];

export default function FitmentPage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="container-x py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="label">Fitment</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Aby kola sedla na milimetr
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Špatný fitment poznáš hned: kolo dře, trčí, nebo se ztrácí v blatníku. Pomůžeme ti
              vybrat rozměr, který sedne na tvoje auto i na tvůj vkus.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-[0.7fr_1.3fr]">
          <span className="label md:pt-2">Co řešíme</span>
          <div className="ruled">
            {checklist.map((c) => (
              <div key={c.n} className="grid grid-cols-[auto_1fr] gap-x-7 py-8 first:pt-0">
                <span className="font-mono text-sm text-champagne">{c.n}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 max-w-md text-muted">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-2 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <span className="label">Poradenství</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Nevíš, co na auto sedne?
            </h2>
            <p className="mt-5 max-w-md text-muted">
              Napiš nám vozidlo a představu. Doladíme rozměr, provedení i termín, ať to máš bez
              starostí.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Doporučení rozměru přesně na tvoje auto.",
                "Provedení a barva podle reference.",
                "Kontrola dostupnosti a termínu dodání.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-fg/85">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-champagne" fill="none" stroke="currentColor" strokeWidth="1.8">
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
