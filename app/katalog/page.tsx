import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Katalog kol",
  description: "Kovaná a prémiová kola — BBS, Vossen, OZ Racing a další. Skladem i na míru.",
};

export default function KatalogPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="max-w-2xl">
        <span className="label">Katalog</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Kola</h1>
        <p className="mt-5 text-muted">
          Kované ráfky od BBS, Vossen, OZ Racing a dalších. Skladové kusy mají uvedenou cenu, kola na
          zakázku zpracujeme na poptávku.
        </p>
      </div>

      <div className="mt-12">
        <CatalogClient />
      </div>
    </div>
  );
}
