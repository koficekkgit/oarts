import Link from "next/link";
import { Sparkle } from "./Sparkle";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="oarts — domů"
      className={`group inline-flex items-end gap-1 ${className}`}
    >
      <span className="text-2xl font-semibold lowercase leading-none tracking-tight text-white">
        oarts
      </span>
      <Sparkle className="mb-[3px] h-3 w-3 text-accent transition-transform duration-500 group-hover:rotate-[120deg]" />
    </Link>
  );
}
