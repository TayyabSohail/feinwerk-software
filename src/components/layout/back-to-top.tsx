'use client';

import { ArrowUp } from 'lucide-react';

export function BackToTop({ label = 'Back to top' }: { label?: string }) {
  return (
    <button
      type='button'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='group inline-flex self-start items-center gap-2 border border-brand/40 bg-brand/[0.06] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-text transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white'
    >
      <ArrowUp className='h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5' />
      {label}
    </button>
  );
}
