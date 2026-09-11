import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import duoDisplays from './assets/duo-displays.jpg';
import duoHero from './assets/duo-hero.jpg';
import proColors from './assets/pro-colors.jpg';
import proHero from './assets/pro-hero.jpg';

export const design: DesignSystem = {
  palette: {
    bg: '#f5f5f7',
    text: '#1d1d1f',
    accent: '#8f3652',
  },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang TC", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang TC", system-ui, sans-serif',
  },
  typeScale: {
    hero: 176,
    body: 36,
  },
  radius: 34,
};

const color = {
  white: '#ffffff',
  black: '#000000',
  text: '#1d1d1f',
  muted: '#6e6e73',
  hairline: '#d2d2d7',
  burgundy: '#8f3652',
  ice: '#e9edf0',
};

const base = {
  width: '100%',
  height: '100%',
  position: 'relative' as const,
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.025em',
};

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    style={{
      fontSize: 24,
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,0.62)' : color.muted,
    }}
  >
    {children}
  </div>
);

const Source = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      bottom: 50,
      fontSize: 20,
      letterSpacing: '0.01em',
      color: light ? 'rgba(255,255,255,0.44)' : '#86868b',
      zIndex: 5,
    }}
  >
    {children}
  </div>
);

const Price = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 12,
      fontSize: 36,
      lineHeight: 1,
      fontWeight: 650,
      whiteSpace: 'nowrap',
      color: dark ? color.white : color.text,
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <div style={{ ...base, background: color.white }}>
    <div style={{ position: 'absolute', inset: 0, padding: '92px 120px' }}>
      <Eyebrow>Apple Event · September 9, 2026</Eyebrow>
      <h1
        style={{
          margin: '30px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 0.94,
          fontWeight: 700,
          letterSpacing: '-0.065em',
        }}
      >
        iPhone 2026
      </h1>
      <p
        style={{
          margin: '34px 0 0',
          fontSize: 42,
          lineHeight: 1.28,
          fontWeight: 550,
          color: color.muted,
        }}
      >
        Duo 首度折疊。Pro 聚焦相機、效能與續航。
      </p>
    </div>

    <img
      src={duoHero}
      alt="iPhone Duo"
      style={{
        position: 'absolute',
        right: 56,
        bottom: 0,
        width: 960,
        height: 540,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 116,
        width: 420,
        height: 8,
        borderRadius: 999,
        background: 'var(--osd-accent)',
      }}
    />
  </div>
);

const Lineup: Page = () => (
  <div style={{ ...base, background: color.white }}>
    <div style={{ padding: '92px 120px', width: 940, position: 'relative', zIndex: 3 }}>
      <Eyebrow>The new lineup</Eyebrow>
      <h2
        style={{
          margin: '24px 0 62px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 86,
          lineHeight: 1.04,
          fontWeight: 700,
          letterSpacing: '-0.055em',
        }}
      >
        三款新 iPhone，
        <br />
        兩種方向。
      </h2>

      <div style={{ width: 780, borderTop: `1px solid ${color.hairline}` }}>
        <div style={{ height: 132, display: 'grid', gridTemplateColumns: '1fr 250px', alignItems: 'center', borderBottom: `1px solid ${color.hairline}` }}>
          <div>
            <div style={{ fontSize: 38, fontWeight: 650 }}>iPhone Duo</div>
            <div style={{ marginTop: 8, fontSize: 26, color: color.muted }}>首款折疊 iPhone</div>
          </div>
          <Price>US$1,999 起</Price>
        </div>

        <div style={{ height: 132, display: 'grid', gridTemplateColumns: '1fr 250px', alignItems: 'center', borderBottom: `1px solid ${color.hairline}` }}>
          <div>
            <div style={{ fontSize: 38, fontWeight: 650 }}>iPhone 18 Pro</div>
            <div style={{ marginTop: 8, fontSize: 26, color: color.muted }}>Pro 相機，日常尺寸</div>
          </div>
          <Price>US$1,199 起</Price>
        </div>

        <div style={{ height: 132, display: 'grid', gridTemplateColumns: '1fr 250px', alignItems: 'center', borderBottom: `1px solid ${color.hairline}` }}>
          <div>
            <div style={{ fontSize: 38, fontWeight: 650 }}>iPhone 18 Pro Max</div>
            <div style={{ marginTop: 8, fontSize: 26, color: color.muted }}>最長 iPhone 續航</div>
          </div>
          <Price>US$1,299 起</Price>
        </div>
      </div>
    </div>

    <div style={{ position: 'absolute', right: 0, top: 0, width: 850, height: 1080, background: color.black }}>
      <img src={proHero} alt="iPhone 18 Pro" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.18), transparent 40%)' }} />
    </div>
    <Source>Apple Newsroom · U.S. starting prices</Source>
  </div>
);

const Duo: Page = () => (
  <div style={{ ...base, background: color.white }}>
    <img
      src={duoDisplays}
      alt="iPhone Duo inner and outer displays"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 36%, rgba(255,255,255,0) 62%)' }} />

    <div style={{ position: 'relative', zIndex: 3, width: 760, padding: '92px 0 0 120px' }}>
      <Eyebrow>iPhone Duo</Eyebrow>
      <h2
        style={{
          margin: '26px 0 36px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 92,
          lineHeight: 1.04,
          fontWeight: 700,
          letterSpacing: '-0.055em',
        }}
      >
        最大的 iPhone 螢幕，
        <br />
        放入口袋。
      </h2>

      <div style={{ display: 'flex', gap: 54, marginTop: 46 }}>
        <div>
          <div style={{ fontSize: 68, lineHeight: 1, fontWeight: 700 }}>7.6″</div>
          <div style={{ marginTop: 12, fontSize: 27, color: color.muted }}>內螢幕</div>
        </div>
        <div>
          <div style={{ fontSize: 68, lineHeight: 1, fontWeight: 700 }}>5.4″</div>
          <div style={{ marginTop: 12, fontSize: 27, color: color.muted }}>外螢幕</div>
        </div>
      </div>

      <p style={{ margin: '48px 0 32px', fontSize: 32, lineHeight: 1.5, color: color.muted }}>
        A20 Pro · 48MP Dual Fusion
        <br />
        鈦金屬機身與轉軸 · 雙電池
      </p>
      <Price>US$1,999 起</Price>
    </div>
    <Source>Apple Newsroom · iPhone Duo</Source>
  </div>
);

const Pro: Page = () => (
  <div style={{ ...base, background: color.black, color: color.white }}>
    <img
      src={proColors}
      alt="iPhone 18 Pro color lineup"
      style={{ position: 'absolute', right: -70, bottom: -50, width: 1240, height: 885, objectFit: 'cover', objectPosition: 'center' }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0.06) 100%)' }} />

    <div style={{ position: 'relative', zIndex: 3, width: 880, padding: '92px 0 0 120px' }}>
      <Eyebrow light>iPhone 18 Pro · Pro Max</Eyebrow>
      <h2
        style={{
          margin: '26px 0 34px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 104,
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: '-0.06em',
        }}
      >
        光圈，第一次
        <br />
        交給你。
      </h2>

      <div style={{ marginTop: 46, display: 'grid', gap: 26, fontSize: 31, lineHeight: 1.35, color: 'rgba(255,255,255,0.72)' }}>
        <div><span style={{ color: color.white, fontWeight: 650 }}>48MP</span> 可變光圈 Fusion 主相機</div>
        <div><span style={{ color: color.white, fontWeight: 650 }}>A20 Pro</span> + 新一代均熱板</div>
        <div><span style={{ color: color.white, fontWeight: 650 }}>36 / 45 小時</span> 影片播放</div>
        <div>黑 · 銀 · 冰川 · 勃艮第</div>
      </div>

      <div style={{ marginTop: 48 }}>
        <Price dark>Pro US$1,199 · Pro Max US$1,299 起</Price>
      </div>
    </div>
    <Source light>Apple Newsroom · iPhone 18 Pro lineup</Source>
  </div>
);

const Pricing: Page = () => (
  <div style={{ ...base, background: 'var(--osd-bg)' }}>
    <div style={{ padding: '88px 120px' }}>
      <Eyebrow>U.S. pricing & availability</Eyebrow>
      <h2
        style={{
          margin: '22px 0 56px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 92,
          lineHeight: 1.04,
          fontWeight: 700,
          letterSpacing: '-0.055em',
        }}
      >
        美國售價與上市時間
      </h2>

      <div style={{ background: color.white, borderRadius: 34, overflow: 'hidden', boxShadow: '0 18px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ height: 94, padding: '0 54px', display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 0.8fr', alignItems: 'center', fontSize: 23, fontWeight: 650, color: color.muted, borderBottom: `1px solid ${color.hairline}` }}>
          <div>MODEL</div><div>FROM</div><div>PRE-ORDER</div><div>AVAILABLE</div>
        </div>

        <div style={{ height: 150, padding: '0 54px', display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 0.8fr', alignItems: 'center', borderBottom: `1px solid ${color.hairline}` }}>
          <div style={{ fontSize: 40, fontWeight: 650 }}>iPhone Duo</div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>US$1,999</div>
          <div style={{ fontSize: 31 }}>10.16</div>
          <div style={{ fontSize: 31 }}>10.23</div>
        </div>

        <div style={{ height: 150, padding: '0 54px', display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 0.8fr', alignItems: 'center', borderBottom: `1px solid ${color.hairline}` }}>
          <div style={{ fontSize: 40, fontWeight: 650 }}>iPhone 18 Pro</div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>US$1,199</div>
          <div style={{ fontSize: 31 }}>09.12</div>
          <div style={{ fontSize: 31 }}>09.18</div>
        </div>

        <div style={{ height: 150, padding: '0 54px', display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 0.8fr', alignItems: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 650 }}>iPhone 18 Pro Max</div>
          <div style={{ fontSize: 38, fontWeight: 700 }}>US$1,299</div>
          <div style={{ fontSize: 31 }}>09.12</div>
          <div style={{ fontSize: 31 }}>09.18</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 34, fontSize: 25, color: color.muted }}>
        <div>三款皆由 256GB 起</div>
        <div>Apple 官方美國起售價</div>
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'Apple Event 2026 · iPhone',
  createdAt: '2026-09-11T01:54:20.921Z',
};

export default [Cover, Lineup, Duo, Pro, Pricing] satisfies Page[];
