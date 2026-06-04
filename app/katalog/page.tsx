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
        <span className="eyebrow">Katalog</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Kola</h1>
        <p className="mt-4 text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Skladové kusy mají uvedenou cenu,
          kola na míru zpracujeme na poptávku.
        </p>
      </div>

      <div className="mt-12">
        <CatalogClient />
      </div>
    </div>
  );
}
