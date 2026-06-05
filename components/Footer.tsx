import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { brands } from "@/lib/wheels";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-bg-2">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. {site.description} Sídlíme v Ostravě, posíláme po celé ČR ({site.shipping}).
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <InstagramIcon className="h-5 w-5" />
            {site.instagramHandle}
          </a>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sortiment</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {brands.map((b) => (
              <li key={b}>
                <Link href="/katalog" className="text-fg/80 transition-colors hover:text-accent">
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Web</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/katalog" className="text-fg/80 transition-colors hover:text-accent">
                Katalog kol
              </Link>
            </li>
            <li>
              <Link href="/fitment" className="text-fg/80 transition-colors hover:text-accent">
                Fitment na míru
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-fg/80 transition-colors hover:text-accent">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Kontakt</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-fg/80">
            <li>{site.city}, {site.region}</li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="text-xs text-muted">Doprava {site.shipping}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Všechna práva vyhrazena.</p>
          <p>{site.city}, Česká republika</p>
        </div>
      </div>
    </footer>
  );
}
