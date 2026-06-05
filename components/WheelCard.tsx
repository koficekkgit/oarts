import Link from "next/link";
import { WheelGraphic } from "./WheelGraphic";
import { formatPrice, type Wheel } from "@/lib/wheels";

export function WheelCard({ w }: { w: Wheel }) {
  return (
    <Link href={`/kolo/${w.slug}`} className="panel panel-hover group flex flex-col p-5">
      <div className="relative aspect-square overflow-hidden bg-bg-2">
        <div
          className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: `radial-gradient(circle at 50% 45%, ${w.accent}1f, transparent 62%)` }}
        />
        <WheelGraphic
          uid={w.slug}
          spokes={w.spokes}
          tone={w.tone}
          accent={w.accent}
          className="relative h-full w-full p-3 drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.05] group-hover:rotate-[10deg]"
        />

        {w.badge && <span className="chip absolute left-2 top-2 text-champagne">{w.badge}</span>}
        <span className="chip absolute right-2 top-2">
          <span className={`h-1.5 w-1.5 rounded-full ${w.inStock ? "bg-emerald-400/80" : "bg-champagne"}`} />
          {w.inStock ? "Skladem" : "Na objednávku"}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{w.brand}</span>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{w.model}</h3>
        <p className="text-sm text-muted">{w.finish}</p>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="text-[0.7rem] uppercase tracking-wider text-muted">{w.diameters}</div>
            <div className="mt-0.5 font-semibold text-fg">{formatPrice(w.price)}</div>
          </div>
          <span className="text-sm font-medium text-champagne opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
