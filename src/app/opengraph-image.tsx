import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const runtime = 'edge';
export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social share image, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0d0d0d',
          color: '#f5f5f3',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: 'rgba(16, 185, 129, 0.35)',
            filter: 'blur(120px)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width='64' height='64' viewBox='0 0 64 64'>
            <rect width='64' height='64' rx='16' fill='#f5f5f3' />
            <g fill='#0d0d0d'>
              <rect x='18' y='16' width='9' height='32' rx='1.5' />
              <rect x='18' y='16' width='28' height='9' rx='1.5' />
              <rect x='18' y='31' width='20' height='8' rx='1.5' />
            </g>
            <rect x='39' y='39' width='9' height='9' rx='1.5' fill='#10b981' />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
              Feinwerk
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: '#9a9a9a',
              }}
            >
              Software
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 0.98,
              maxWidth: 900,
            }}
          >
            Software built with precision.
          </div>
          <div style={{ fontSize: 30, color: '#b3b3b3', maxWidth: 900 }}>
            Full-stack products, AI systems and cloud automation. Islamabad and
            Fellbach, shipped worldwide.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#10b981',
          }}
        >
          <span>feinwerk software</span>
          <span>PK &middot; DE</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
