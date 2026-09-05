'use client';

import Cal from '@calcom/embed-react';

interface CalEmbedProps {
  calLink: string;
}

export function CalEmbed({ calLink }: CalEmbedProps) {
  return (
    <Cal
      calLink={calLink}
      namespace='feinwerks-intro'
      config={{
        layout: 'month_view',
        theme: 'dark',
        useSlotsViewOnSmallScreen: 'true',
      }}
      className='min-h-[38rem] w-full'
    />
  );
}
