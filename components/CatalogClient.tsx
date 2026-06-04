"use client";

import { useMemo, useState } from "react";
import { WheelCard } from "./WheelCard";
import { brands, wheels } from "@/lib/wheels";

const FILTERS = ["Vše", ...brands] as const;

export function CatalogClient() {
  const [brand, setBrand] = useState<string>("Vše");
  const [onlyStock, setOnlyStock] = useState(false);

  const list = useMemo(
    () =>
      wheels.filter(
        (w) => (brand === "Vše" || w.brand === brand) && (!onlyStock || w.inStock),
      ),
    [brand, onlyStock],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setBrand(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                brand === f
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-line text-muted hover:border-white/25 hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer select-none items-center gap-3 text-sm text-muted">
          <span>Jen skladem</span>
          <button
            type="button"
            role="switch"
            aria-checked={onlyStock}
            onClick={() => setOnlyStock((v) => !v)}
            className={`relative h-6 w-11 rounded-full border transition-colors ${
              onlyStock ? "border-accent/60 bg-accent/30" : "border-line bg-white/5"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-fg transition-all ${
                onlyStock ? "left-[1.55rem] bg-accent" : "left-0.5"
              }`}
            />
          </button>
        </label>
      </div>

      <p className="mt-5 text-sm text-muted">
        {list.length} {list.length === 1 ? "kolo" : list.length >= 2 && list.length <= 4 ? "kola" : "kol"}
      </p>

      {list.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => (
            <WheelCard key={w.slug} w={w} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted">
          Pro zvolený filtr nemáme aktuálně žádná kola.
        </div>
      )}
    </div>
  );
}
