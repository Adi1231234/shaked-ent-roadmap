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

  const activeTierData = tiers.find((t) => t.id === activeTier);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-rose-100/60">
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {tiers.map((tier) => {
            const isActive = activeTier === tier.id;
            return (
              <a
                key={tier.id}
                href={`#tier-${tier.id.toLowerCase()}`}
                aria-label={`Tier ${tier.id}`}
                className={`
                  flex-shrink-0 inline-flex items-center justify-center
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-xl font-extrabold text-base sm:text-lg
                  transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-br ${tier.accent.gradient} text-white shadow-lg scale-110 ring-4 ring-white`
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:scale-105'
                  }
                `}
              >
                {tier.id}
              </a>
            );
          })}
        </div>

        {activeTierData && (
          <div
            key={activeTierData.id}
            className="text-center mt-2 text-[11px] sm:text-xs font-semibold text-slate-600 animate-fade-in"
          >
            <span className={activeTierData.accent.text}>TIER {activeTierData.id}</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span>{activeTierData.tagline}</span>
          </div>
        )}
      </div>
    </nav>
  );
}
