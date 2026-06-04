import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { IconPin, IconTruck } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Napište nám nezávaznou poptávku. Ostrava, doprava po celé ČR (PPL / GLS).",
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h3l2 5-2 1c1 2 2 3 4 4l1-2 5 2v3c0 1-1 2-2 2A14 14 0 014 6c0-1 1-2 1-2z" strokeLinejoin="round" />
    </svg>
  );
}
function InstaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function KontaktPage() {
  const contacts = [
    { icon: MailIcon, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: PhoneIcon, label: "Telefon", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: InstaIcon, label: "Instagram", value: site.instagramHandle, href: site.instagram },
    { icon: IconPin, label: "Sídlo", value: `${site.city}, ${site.region}`, href: undefined },
  ];

  return (
    <div className="container-x py-14 md:py-20">
      <div className="max-w-2xl">
        <span className="eyebrow">Kontakt</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Pojďme to probrat
        </h1>
        <p className="mt-4 text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vyplň poptávku níže nebo napiš na
          Instagram — ozveme se co nejdříve.
        </p>
        <p className="mt-3 text-xs text-muted">
          Pozn.: kontaktní údaje jsou zatím placeholder, doplníme reálné.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* contact cards */}
        <div className="space-y-4">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
                  <div className="mt-0.5 font-medium text-fg">{value}</div>
                </div>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card flex items-center gap-4 p-5"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="card flex items-center gap-4 p-5">
                {inner}
              </div>
            );
          })}

          <div className="card flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent">
              <IconTruck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">Doprava</div>
              <div className="mt-0.5 font-medium text-fg">{site.shipping} — po celé ČR</div>
            </div>
          </div>
        </div>

        {/* form */}
        <div id="poptavka" className="scroll-mt-24">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
