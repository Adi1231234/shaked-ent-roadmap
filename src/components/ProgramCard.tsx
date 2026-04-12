import { useState } from 'react';
import {
  ExternalLink,
  Clock,
  DollarSign,
  Target,
  ChevronDown,
  CheckCircle2,
  CalendarClock,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { Program, Tier } from '../types';

interface Props {
  program: Program;
  tier: Tier;
}

const statusConfig: Record<
  Program['status'],
  { icon: typeof CheckCircle2; className: string }
> = {
  open: { icon: CheckCircle2, className: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  seasonal: {
    icon: CalendarClock,
    className: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  'after-bachelor': {
    icon: CalendarClock,
    className: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  'info-only': { icon: Info, className: 'text-blue-600 bg-blue-50 border-blue-200' },
  'needs-check': {
    icon: AlertCircle,
    className: 'text-slate-600 bg-slate-50 border-slate-200',
  },
};

const relevanceColors: Record<Program['relevance'], string> = {
  'ישירה מאוד': 'text-rose-700 bg-rose-100',
  ישירה: 'text-pink-700 bg-pink-100',
  ייחודית: 'text-fuchsia-700 bg-fuchsia-100',
  עקיפה: 'text-slate-600 bg-slate-100',
  כללית: 'text-gray-600 bg-gray-100',
};

export function ProgramCard({ program, tier }: Props) {
  const [expanded, setExpanded] = useState(false);
  const StatusIcon = statusConfig[program.status].icon;
  const statusClass = statusConfig[program.status].className;

  return (
    <div
      className={`
        group relative rounded-2xl bg-white border-2 ${tier.accent.border}
        card-shadow hover:card-shadow-lg transition-all duration-300
        ${program.highlight ? 'ring-2 ' + tier.accent.ring : ''}
      `}
    >
      {program.highlight && (
        <div className="absolute -top-2.5 right-5 z-10">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${tier.accent.badge} text-[10px] font-bold shadow-sm`}
          >
            מומלץ ביותר
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-right p-4 sm:p-5"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`
              flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl
              ${tier.accent.badge}
              flex items-center justify-center
              text-lg sm:text-xl font-extrabold shadow-sm
            `}
          >
            {program.rank}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight mb-1">
              {program.title}
            </h3>
            {program.brand && (
              <p className={`text-xs sm:text-sm font-medium ${tier.accent.text} mb-2`}>
                {program.brand}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-2">
              <Pill icon={Clock} text={program.time} />
              <Pill icon={DollarSign} text={program.cost} />
              <Pill
                icon={Target}
                text={program.relevance}
                className={relevanceColors[program.relevance]}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full border ${statusClass}`}
              >
                <StatusIcon size={11} />
                {program.statusLabel}
              </span>
              {program.deadline && (
                <span className="text-[11px] text-amber-700 font-semibold">
                  {program.deadline}
                </span>
              )}
            </div>
          </div>

          <ChevronDown
            size={20}
            className={`flex-shrink-0 text-slate-400 transition-transform duration-300 mt-2 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 sm:px-5 pb-5 pr-16 sm:pr-20 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            {program.description}
          </p>

          {program.prerequisites && (
            <div className="text-xs bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="font-bold text-slate-700">תנאי מוקדם: </span>
              <span className="text-slate-600">{program.prerequisites}</span>
            </div>
          )}

          <a
            href={program.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-full
              bg-gradient-to-r ${tier.accent.gradient} text-white
              text-sm font-semibold shadow-sm
              hover:shadow-md hover:scale-[1.02] transition-all
            `}
          >
            לדף התוכנית
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Pill({
  icon: Icon,
  text,
  className,
}: {
  icon: typeof Clock;
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
        className ?? 'text-slate-600 bg-slate-100'
      }`}
    >
      <Icon size={10} />
      {text}
    </span>
  );
}
