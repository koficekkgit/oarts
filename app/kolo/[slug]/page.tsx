import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WheelGraphic } from "@/components/WheelGraphic";
import { InquiryForm } from "@/components/InquiryForm";
import { IconArrow } from "@/components/Icons";
import { getWheel, wheels, formatPrice, LOREM } from "@/lib/wheels";

export function generateStaticParams() {
  return wheels.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWheel(slug);
  if (!w) return { title: "Kolo nenalezeno" };
  return {
    title: `${w.brand} ${w.model}`,
    description: `${w.brand} ${w.model} — ${w.finish}. ${formatPrice(w.price)}.`,
  };
}

export default async function WheelDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWheel(slug);
  if (!w) notFound();

  const specs: { label: string; value: string }[] = [
    { label: "Značka", value: w.brand },
    { label: "Model", value: w.model },
    { label: "Provedení", value: w.finish },
    { label: "Průměry", value: w.diameters },
    { label: "Rozměry", value: w.sizes.join(" · ") },
    { label: "Rozteče", value: w.boltPatterns.join(" · ") },
  ];

  const related = wheels.filter((x) => x.slug !== w.slug).slice(0, 3);

  return (
    <div className="container-x py-10 md:py-14">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/katalog" className="transition-colors hover:text-accent">
          Katalog
        </Link>
        <span>/</span>
        <span className="text-fg">{w.brand} {w.model}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative">
          <div className="sticky top-24 overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-white/[0.05] to-transparent p-6">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(circle at 50% 40%, ${w.accent}22, transparent 65%)` }}
            />
            <WheelGraphic
              uid={w.slug}
              spokes={w.spokes}
              tone={w.tone}
              accent={w.accent}
              className="relative mx-auto aspect-square w-full max-w-md drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {w.brand}
            </span>
            <span className="chip">
              <span className={`h-1.5 w-1.5 rounded-full ${w.inStock ? "bg-emerald-400" : "bg-amber-400"}`} />
              {w.inStock ? "Skladem" : "Na objednávku"}
            </span>
            {w.badge && <span className="chip text-accent">{w.badge}</span>}
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{w.model}</h1>
          <p className="mt-3 text-muted">{w.finish}</p>

          <div className="mt-6 flex items-end gap-3 border-y border-line py-6">
            <span className="text-3xl font-semibold tracking-tight">{formatPrice(w.price)}</span>
            {w.price != null && <span className="pb-1 text-sm text-muted">/ sada (4 ks)</span>}
          </div>

          <p className="mt-6 leading-relaxed text-muted">{LOREM}</p>

          {/* specs */}
          <dl className="mt-8 overflow-hidden rounded-2xl border border-line">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm ${
                  i % 2 ? "bg-white/[0.015]" : ""
                }`}
              >
                <dt className="text-muted">{s.label}</dt>
                <dd className="font-medium text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#poptavka" className="btn btn-primary flex-1">
              Poptat tento set
            </Link>
            <Link href="/katalog" className="btn btn-ghost">
              Zpět na katalog
            </Link>
          </div>
        </div>
      </div>

      {/* Inquiry */}
      <div id="poptavka" className="mt-20 scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label">Poptávka</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Mám zájem o {w.brand} {w.model}
          </h2>
          <p className="mt-3 text-muted">
            Lorem ipsum dolor sit amet. Napište nám rozměr a rozteč, ozveme se s nabídkou.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <InquiryForm subject={`${w.brand} ${w.model}`} />
        </div>
      </div>

      {/* Related */}
      <div className="mt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Mohlo by se hodit</h2>
          <Link href="/katalog" className="link-underline inline-flex items-center gap-2 text-sm text-accent">
            Katalog <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/kolo/${r.slug}`}
              className="panel panel-hover group flex items-center gap-4 p-4"
            >
              <WheelGraphic
                uid={`rel-${r.slug}`}
                spokes={r.spokes}
                tone={r.tone}
                accent={r.accent}
                className="h-20 w-20 shrink-0 transition-transform duration-500 group-hover:rotate-12"
              />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted">{r.brand}</div>
                <div className="truncate font-semibold">{r.model}</div>
                <div className="mt-1 text-sm text-accent">{formatPrice(r.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
