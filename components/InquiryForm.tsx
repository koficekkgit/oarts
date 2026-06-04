"use client";

import { useState } from "react";

type Props = {
  subject?: string;
  compact?: boolean;
};

export function InquiryForm({ subject, compact = false }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: napojit na reálné odesílání (e-mail / API).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-fg">Poptávka odeslána</h3>
        <p className="max-w-sm text-sm text-muted">
          Děkujeme! Ozveme se co nejdříve. (Demo — formulář zatím neodesílá reálná data.)
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-2 h-10 text-sm"
        >
          Odeslat další
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8"
    >
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg/90" htmlFor="name">
            Jméno *
          </label>
          <input id="name" name="name" required className="input" placeholder="Jan Novák" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg/90" htmlFor="contact">
            E-mail nebo telefon *
          </label>
          <input id="contact" name="contact" required className="input" placeholder="vas@email.cz" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg/90" htmlFor="car">
            Vozidlo
          </label>
          <input id="car" name="car" className="input" placeholder="Audi RS6 C8" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg/90" htmlFor="subject">
            Zájem o
          </label>
          <input
            id="subject"
            name="subject"
            className="input"
            defaultValue={subject}
            placeholder="Model kola / rozměr"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-fg/90" htmlFor="message">
          Zpráva
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input"
          placeholder="Napište nám, co potřebujete — rozměr, rozteč, barva, termín…"
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Odesláním souhlasíte se zpracováním údajů za účelem vyřízení poptávky.
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
          {status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
        </button>
      </div>
    </form>
  );
}
