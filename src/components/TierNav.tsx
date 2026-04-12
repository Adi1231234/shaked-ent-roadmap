import { useEffect, useState } from 'react';
import type { Tier } from '../types';

interface Props {
  tiers: Tier[];
}

export function TierNav({ tiers }: Props) {
  const [activeTier, setActiveTier] = useState<string>('S');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('tier-', '').toUpperCase();
            setActiveTier(id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    tiers.forEach((t) => {
      const el = document.getElementById(`tier-${t.id.toLowerCase()}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tiers]);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-rose-100/60">
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
          {tiers.map((tier) => {
            const isActive = activeTier === tier.id;
            return (
              <a
                key={tier.id}
                href={`#tier-${tier.id.toLowerCase()}`}
                className={`
                  flex-shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
                  text-xs sm:text-sm font-bold transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-r ${tier.accent.gradient} text-white shadow-md scale-105`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                <span>{tier.title}</span>
                {isActive && (
                  <span className="hidden sm:inline text-[10px] font-medium opacity-90">
                    {tier.tagline}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
