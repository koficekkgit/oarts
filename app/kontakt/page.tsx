import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Napište nám nezávaznou poptávku. Ostrava, doprava po celé ČR (PPL / GLS).",
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 4h3l2 5-2 1c1 2 2 3 4 4l1-2 5 2v3c0 1-1 2-2 2A14 14 0 014 6c0-1 1-2 1-2z" strokeLinejoin="round" />
    </svg>
  );
}
function InstaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export default function KontaktPage() {
  const contacts = [
    { icon: MailIcon, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { icon: PhoneIcon, label: "Telefon", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: InstaIcon, label: "Instagram", value: site.instagramHandle, href: site.instagram },
    { icon: PinIcon, label: "Sídlo", value: `${site.city}, doprava ${site.shipping}`, href: undefined },
  ];

  return (
    <div className="container-x py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="label">Kontakt</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Pojďme to probrat</h1>
        <p className="mt-5 text-muted">
          Vyplň poptávku níže nebo napiš na Instagram. Ozveme se co nejdříve s nabídkou a termínem.
        </p>
        <p className="mt-3 text-xs text-muted">
          Pozn.: kontaktní údaje jsou zatím placeholder, doplníme reálné.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="ruled border-t border-line">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-silver" />
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-muted">{label}</div>
                  <div className="mt-1 font-medium text-fg">{value}</div>
                </div>
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 py-5 transition-colors hover:text-champagne"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="flex items-start gap-4 py-5">
                {inner}
              </div>
            );
          })}
        </div>

        <div id="poptavka" className="scroll-mt-24">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
