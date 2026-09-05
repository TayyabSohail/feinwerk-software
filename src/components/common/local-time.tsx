'use client';

import { useEffect, useState } from 'react';

interface LocalTimeProps {
  timezone: string;
  className?: string;
}

/** Live clock for a location, so visitors can see who is awake. */
export function LocalTime({ timezone, className }: LocalTimeProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
      }).format(new Date());

    setTime(format());
    const timer = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(timer);
  }, [timezone]);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? '--:--'}
    </span>
  );
}
