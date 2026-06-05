import type { Tone } from "@/lib/wheels";

const TONES: Record<Tone, { hi: string; mid: string; lo: string }> = {
  silver: { hi: "#f1f0ec", mid: "#b6b3ab", lo: "#5d5b55" },
  graphite: { hi: "#cfcdc7", mid: "#76746e", lo: "#2c2b28" },
  champagne: { hi: "#f0e9da", mid: "#cabfa6", lo: "#6b6253" },
  black: { hi: "#7a7872", mid: "#3a3935", lo: "#161512" },
};

type Props = {
  uid: string;
  spokes?: number;
  tone?: Tone;
  accent?: string;
  className?: string;
};

const CX = 100;
const CY = 100;

function spokePath() {
  const inner = 28;
  const outer = 72;
  const wIn = 3.4;
  const wOut = 8.5;
  const yIn = CY - inner;
  const yOut = CY - outer;
  return `M ${CX - wIn} ${yIn} L ${CX - wOut} ${yOut} Q ${CX} ${yOut - 4} ${CX + wOut} ${yOut} L ${CX + wIn} ${yIn} Z`;
}

export function WheelGraphic({
  uid,
  spokes = 5,
  tone = "silver",
  accent = "#5cd6e6",
  className,
}: Props) {
  const c = TONES[tone];
  const metal = `metal-${uid}`;
  const tire = `tire-${uid}`;
  const dish = `dish-${uid}`;
  const sheen = `sheen-${uid}`;

  const path = spokePath();
  const lugCount = 5;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`Ilustrace ${tone} kola`}>
      <defs>
        <radialGradient id={metal} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={c.hi} />
          <stop offset="45%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.lo} />
        </radialGradient>
        <linearGradient id={tire} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#222428" />
          <stop offset="55%" stopColor="#0d0e10" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <radialGradient id={dish} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#1b1d21" />
          <stop offset="100%" stopColor="#070809" />
        </radialGradient>
        <radialGradient id={sheen} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Tire */}
      <circle cx={CX} cy={CY} r="96" fill={`url(#${tire})`} />
      <circle cx={CX} cy={CY} r="96" fill="none" stroke="#000" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r="83" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />

      {/* Outer rim lip */}
      <circle cx={CX} cy={CY} r="80" fill={`url(#${metal})`} />
      <circle cx={CX} cy={CY} r="80" fill="none" stroke={c.hi} strokeOpacity="0.35" strokeWidth="0.8" />

      {/* Dish face */}
      <circle cx={CX} cy={CY} r="73" fill={`url(#${dish})`} />

      {/* Spokes */}
      <g>
        {Array.from({ length: spokes }).map((_, i) => (
          <path
            key={i}
            d={path}
            fill={`url(#${metal})`}
            stroke={c.lo}
            strokeWidth="0.5"
            strokeLinejoin="round"
            transform={`rotate(${(i * 360) / spokes} ${CX} ${CY})`}
          />
        ))}
      </g>

      {/* Inner ring */}
      <circle cx={CX} cy={CY} r="30" fill="none" stroke={c.lo} strokeWidth="3" />
      <circle cx={CX} cy={CY} r="30" fill={`url(#${metal})`} fillOpacity="0.25" />

      {/* Hub */}
      <circle cx={CX} cy={CY} r="24" fill={`url(#${metal})`} />
      <circle cx={CX} cy={CY} r="24" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1" />

      {/* Lug bolts */}
      <g>
        {Array.from({ length: lugCount }).map((_, i) => {
          const a = (i * 2 * Math.PI) / lugCount - Math.PI / 2;
          const r = 16.5;
          return (
            <circle
              key={i}
              cx={CX + Math.cos(a) * r}
              cy={CY + Math.sin(a) * r}
              r="2.7"
              fill={c.lo}
              stroke="#000"
              strokeOpacity="0.5"
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      {/* Center cap */}
      <circle cx={CX} cy={CY} r="9.5" fill="#0c0e11" stroke={c.mid} strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r="4.5" fill={accent} />
      <circle cx={CX} cy={CY} r="4.5" fill={`url(#${sheen})`} />

      {/* Top sheen */}
      <ellipse cx="82" cy="68" rx="46" ry="30" fill={`url(#${sheen})`} transform="rotate(-30 82 68)" />
    </svg>
  );
}
