import { useIsActivePage, type DesignSystem, type Page, type SlideMeta, type SlideTransition } from '@open-slide/core';

import duoCamera from './assets/duo-camera.jpg';
import duoColors from './assets/duo-colors.jpg';
import duoDisplays from './assets/duo-displays.jpg';
import duoHero from './assets/duo-hero.jpg';
import proColors from './assets/pro-colors.jpg';
import proHero from './assets/pro-hero.jpg';
import proLowLight from './assets/pro-low-light.jpg';
import proReference from './assets/pro-reference.jpg';

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

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(-5px) scale(1.005)' },
    ],
  },
  enter: {
    duration: 260,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(10px) scale(0.99)', filter: 'blur(3px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
    ],
  },
};

const heroTransition: SlideTransition = {
  duration: 300,
  exit: {
    duration: 170,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 300,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'scale(0.975)', filter: 'blur(5px)' },
      { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' },
    ],
  },
};

const photoTransition: SlideTransition = {
  duration: 280,
  exit: {
    duration: 170,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 280,
    delay: 90,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'scale(1.018)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
  },
};

const motionCss = `
  @keyframes apple-fade-up {
    from { opacity: 0; transform: translateY(30px); filter: blur(5px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes apple-image-in {
    from { opacity: 0; transform: scale(1.045) translateY(14px); filter: blur(5px); }
    to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  @keyframes apple-line-in {
    from { transform: scaleX(0); opacity: 0; }
    to { transform: scaleX(1); opacity: 1; }
  }
  @keyframes apple-soft-glow {
    0% { opacity: 0; transform: scaleX(0.65); }
    55% { opacity: 0.8; }
    100% { opacity: 0.28; transform: scaleX(1); }
  }
  .apple-page.is-active .os-eyebrow {
    opacity: 0;
    animation: apple-fade-up 700ms ${EASE_OUT} 100ms both;
  }
  .apple-page.is-active h1,
  .apple-page.is-active h2 {
    opacity: 0;
    animation: apple-fade-up 900ms ${EASE_OUT} 180ms both;
  }
  .apple-page.is-active p {
    opacity: 0;
    animation: apple-fade-up 760ms ${EASE_OUT} 390ms both;
  }
  .apple-page.is-active img {
    opacity: 0;
    animation: apple-image-in 1250ms ${EASE_OUT} 120ms both;
  }
  .apple-page.is-active .os-price {
    opacity: 0;
    animation: apple-fade-up 720ms ${EASE_OUT} 600ms both;
  }
  .apple-page.is-active .os-line {
    transform-origin: left center;
    animation: apple-line-in 1000ms ${EASE_OUT} 520ms both;
  }
  .apple-page.is-active .os-stagger > * {
    opacity: 0;
    animation: apple-fade-up 720ms ${EASE_OUT} both;
  }
  .apple-page.is-active .os-stagger > *:nth-child(1) { animation-delay: 360ms; }
  .apple-page.is-active .os-stagger > *:nth-child(2) { animation-delay: 500ms; }
  .apple-page.is-active .os-stagger > *:nth-child(3) { animation-delay: 640ms; }
  .apple-page.is-active .os-stagger > *:nth-child(4) { animation-delay: 780ms; }
  .apple-page.is-active .os-stagger > *:nth-child(5) { animation-delay: 920ms; }
  .apple-page.is-active .os-glow {
    transform-origin: center;
    animation: apple-soft-glow 1400ms ${EASE_OUT} 320ms both;
  }
  .apple-page.is-active .os-source {
    opacity: 0;
    animation: apple-fade-up 560ms ${EASE_OUT} 980ms both;
  }
  @media (prefers-reduced-motion: reduce) {
    .apple-page.is-active *,
    .apple-page.is-active *::before,
    .apple-page.is-active *::after {
      animation-duration: 1ms !important;
      animation-delay: 0ms !important;
    }
  }
`;

const PageFrame = ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => {
  const active = useIsActivePage();
  return (
    <div className={`apple-page${active ? ' is-active' : ''}`} style={style}>
      <style>{motionCss}</style>
      {children}
    </div>
  );
};

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    className="os-eyebrow"
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
    className="os-source"
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
    className="os-price"
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
  <PageFrame style={{ ...base, background: color.white }}>
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
      className="os-line"
    />
  </PageFrame>
);

const Lineup: Page = () => (
  <PageFrame style={{ ...base, background: color.white }}>
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

      <div className="os-stagger" style={{ width: 780, borderTop: `1px solid ${color.hairline}` }}>
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
  </PageFrame>
);

const Duo: Page = () => (
  <PageFrame style={{ ...base, background: color.white }}>
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

      <div className="os-stagger" style={{ display: 'flex', gap: 54, marginTop: 46 }}>
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
  </PageFrame>
);

const DuoEngineering: Page = () => (
  <PageFrame style={{ ...base, background: color.white }}>
    <div style={{ padding: '90px 120px', width: 800, position: 'relative', zIndex: 3 }}>
      <Eyebrow>iPhone Duo · Engineering</Eyebrow>
      <h2 style={{ margin: '24px 0 48px', fontFamily: 'var(--osd-font-display)', fontSize: 84, lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.055em' }}>
        折疊結構
        <br />
        與耐用設計
      </h2>

      <div className="os-stagger" style={{ borderTop: `1px solid ${color.hairline}`, width: 690 }}>
        <div style={{ padding: '30px 0', borderBottom: `1px solid ${color.hairline}` }}>
          <div style={{ fontSize: 42, fontWeight: 700 }}>Grade 5 鈦金屬</div>
          <div style={{ marginTop: 8, fontSize: 27, lineHeight: 1.45, color: color.muted }}>鏡面拋光機身，3D 列印鉸鏈外蓋</div>
        </div>
        <div style={{ padding: '30px 0', borderBottom: `1px solid ${color.hairline}` }}>
          <div style={{ fontSize: 42, fontWeight: 700 }}>100+ 鉸鏈零件</div>
          <div style={{ marginTop: 8, fontSize: 27, lineHeight: 1.45, color: color.muted }}>支撐螢幕展平，磁鐵陣列確保閉合</div>
        </div>
        <div style={{ padding: '30px 0' }}>
          <div style={{ fontSize: 42, fontWeight: 700 }}>IP68 · Ceramic Shield 2</div>
          <div style={{ marginTop: 8, fontSize: 27, lineHeight: 1.45, color: color.muted }}>外螢幕抗刮提升 3 倍，內層聚合物剛性提升最高 40%</div>
        </div>
      </div>
    </div>

    <img src={duoColors} alt="iPhone Duo colors" style={{ position: 'absolute', right: 38, top: 132, width: 980, height: 780, objectFit: 'cover', objectPosition: 'center' }} />
    <Source>Apple Newsroom · iPhone Duo design and durability</Source>
  </PageFrame>
);

const DuoCamera: Page = () => (
  <PageFrame style={{ ...base, background: color.black, color: color.white }}>
    <img src={duoCamera} alt="Photo from the iPhone Duo Center Stage camera" style={{ position: 'absolute', left: 0, top: 0, width: 1040, height: 1080, objectFit: 'cover', objectPosition: 'center' }} />
    <div style={{ position: 'absolute', left: 800, top: 0, width: 420, height: 1080, background: 'linear-gradient(90deg, transparent, #000)' }} />

    <div style={{ position: 'absolute', right: 105, top: 90, width: 720 }}>
      <Eyebrow light>iPhone Duo · Camera</Eyebrow>
      <h2 style={{ margin: '24px 0 44px', fontFamily: 'var(--osd-font-display)', fontSize: 80, lineHeight: 1.04, fontWeight: 700, letterSpacing: '-0.055em' }}>
        雙螢幕改變拍攝方式
      </h2>

      <div className="os-stagger" style={{ display: 'grid', gap: 30, fontSize: 30, lineHeight: 1.42, color: 'rgba(255,255,255,0.72)' }}>
        <div><span style={{ color: color.white, fontWeight: 700 }}>48MP Fusion 主相機</span><br />24MP 預設輸出，支援零快門延遲與光學品質 2 倍望遠</div>
        <div><span style={{ color: color.white, fontWeight: 700 }}>48MP Fusion 超廣角</span><br />支援微距，Center Stage 前鏡頭可自動擴展視角</div>
        <div><span style={{ color: color.white, fontWeight: 700 }}>4K 120 fps Dolby Vision</span><br />外螢幕可顯示預覽，機身可半折固定拍攝</div>
      </div>
    </div>
    <Source light>Apple Newsroom · iPhone Duo camera system</Source>
  </PageFrame>
);

const A20Pro: Page = () => (
  <PageFrame style={{ ...base, background: color.black, color: color.white }}>
    <div style={{ padding: '90px 120px' }}>
      <Eyebrow light>A20 Pro · 2 nm</Eyebrow>
      <h2 style={{ margin: '24px 0 54px', fontFamily: 'var(--osd-font-display)', fontSize: 92, lineHeight: 1.03, fontWeight: 700, letterSpacing: '-0.06em' }}>
        晶片與散熱系統
      </h2>

      <div className="os-stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 68, marginTop: 18 }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.24)', paddingTop: 30 }}>
          <div style={{ fontSize: 104, lineHeight: 1, fontWeight: 700 }}>+20%</div>
          <div style={{ marginTop: 20, fontSize: 29, lineHeight: 1.45, color: 'rgba(255,255,255,0.64)' }}>6 核心 CPU<br />相較 A19 Pro</div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.24)', paddingTop: 30 }}>
          <div style={{ fontSize: 104, lineHeight: 1, fontWeight: 700 }}>+40%</div>
          <div style={{ marginTop: 20, fontSize: 29, lineHeight: 1.45, color: 'rgba(255,255,255,0.64)' }}>7 核心 GPU<br />效能更高且更省電</div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.24)', paddingTop: 30 }}>
          <div style={{ fontSize: 104, lineHeight: 1, fontWeight: 700 }}>2×</div>
          <div style={{ marginTop: 20, fontSize: 29, lineHeight: 1.45, color: 'rgba(255,255,255,0.64)' }}>雙 16 核心 Neural Engine<br />共 32 核心</div>
        </div>
      </div>

      <div className="os-stagger" style={{ marginTop: 72, paddingTop: 34, borderTop: '1px solid rgba(255,255,255,0.14)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 86 }}>
        <div style={{ fontSize: 31, lineHeight: 1.5 }}><span style={{ fontWeight: 700 }}>50% 更多記憶體頻寬</span><br /><span style={{ color: 'rgba(255,255,255,0.62)' }}>支援裝置端 AI 與高負載圖形運算</span></div>
        <div style={{ fontSize: 31, lineHeight: 1.5 }}><span style={{ fontWeight: 700 }}>均熱板直接連接晶片封裝</span><br /><span style={{ color: 'rgba(255,255,255,0.62)' }}>Pro 持續效能最高提升 40%，Duo 提升 35%</span></div>
      </div>
    </div>
    <Source light>Apple Newsroom · A20 Pro and thermal management</Source>
  </PageFrame>
);

const ProCamera: Page = () => (
  <PageFrame style={{ ...base, background: color.black, color: color.white }}>
    <img src={proLowLight} alt="Low-light photo captured on iPhone 18 Pro" style={{ position: 'absolute', right: 0, top: 0, width: 1030, height: 1080, objectFit: 'cover', objectPosition: 'center' }} />
    <div style={{ position: 'absolute', left: 670, top: 0, width: 420, height: 1080, background: 'linear-gradient(90deg, #000, transparent)' }} />

    <div style={{ position: 'relative', zIndex: 3, width: 850, padding: '90px 0 0 120px' }}>
      <Eyebrow light>iPhone 18 Pro · Camera</Eyebrow>
      <h2 style={{ margin: '24px 0 42px', fontFamily: 'var(--osd-font-display)', fontSize: 82, lineHeight: 1.04, fontWeight: 700, letterSpacing: '-0.055em' }}>
        48MP 可變光圈
        <br />
        Fusion 主相機
      </h2>
      <p style={{ margin: 0, width: 680, fontSize: 30, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)' }}>
        六片雷射切割葉片由轉子控制，提供四段光圈。相機可自動調整，Pro controls 也可手動操作。
      </p>

      <div className="os-stagger" style={{ marginTop: 52, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: 720, gap: 30 }}>
        <div><div style={{ fontSize: 68, fontWeight: 700 }}>ƒ/1.48</div><div style={{ marginTop: 10, fontSize: 25, color: 'rgba(255,255,255,0.58)' }}>低光源</div></div>
        <div><div style={{ fontSize: 68, fontWeight: 700 }}>ƒ/1.8</div><div style={{ marginTop: 10, fontSize: 25, color: 'rgba(255,255,255,0.58)' }}>人像平衡</div></div>
        <div><div style={{ fontSize: 68, fontWeight: 700 }}>ƒ/4</div><div style={{ marginTop: 10, fontSize: 25, color: 'rgba(255,255,255,0.58)' }}>群體景深</div></div>
      </div>

      <div className="os-stagger" style={{ marginTop: 54, fontSize: 29, lineHeight: 1.55, color: 'rgba(255,255,255,0.68)' }}>
        手動控制：光圈、快門速度、白平衡與直方圖
        <br />
        影片：拍攝後加入最高 60 fps 電影級效果
      </div>
    </div>
    <Source light>Apple Newsroom · iPhone 18 Pro variable aperture</Source>
  </PageFrame>
);

const ProSystem: Page = () => (
  <PageFrame style={{ ...base, background: color.black, color: color.white }}>
    <img
      src={proColors}
      alt="iPhone 18 Pro color lineup"
      style={{ position: 'absolute', right: -70, bottom: -50, width: 1240, height: 885, objectFit: 'cover', objectPosition: 'center' }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.98) 35%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0.06) 100%)' }} />

    <div style={{ position: 'relative', zIndex: 3, width: 880, padding: '92px 0 0 120px' }}>
      <Eyebrow light>iPhone 18 Pro · Platform</Eyebrow>
      <h2
        style={{
          margin: '26px 0 34px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: '-0.06em',
        }}
      >
        效能、連線與電池
      </h2>

      <div className="os-stagger" style={{ marginTop: 42, display: 'grid', gap: 28, fontSize: 30, lineHeight: 1.4, color: 'rgba(255,255,255,0.7)' }}>
        <div><span style={{ color: color.white, fontWeight: 700 }}>N1</span><br />Wi-Fi 7、Bluetooth 6 與 Thread</div>
        <div><span style={{ color: color.white, fontWeight: 700 }}>C2</span><br />上傳更快，能耗比 C1X 低 15%，美國支援 mmWave</div>
        <div><span style={{ color: color.white, fontWeight: 700 }}>36 / 45 小時</span><br />Pro 與 Pro Max 的影片播放時間</div>
        <div><span style={{ color: color.white, fontWeight: 700 }}>約 15 分鐘充至 50%</span><br />適用 iPhone 18 Pro 有線充電</div>
      </div>

      <div style={{ marginTop: 48 }}>
        <Price dark>Pro US$1,199 · Pro Max US$1,299 起</Price>
      </div>
    </div>
    <Source light>Apple Newsroom · Pro platform and battery</Source>
  </PageFrame>
);

const ReferenceImage: Page = () => (
  <PageFrame style={{ ...base, background: color.black, color: color.white }}>
    <img src={proReference} alt="Apple Reference Image comparison" style={{ position: 'absolute', right: 30, top: 118, width: 990, height: 660, objectFit: 'contain' }} />
    <div className="os-glow" style={{ position: 'absolute', right: 60, bottom: 90, width: 900, height: 120, background: 'radial-gradient(ellipse, rgba(143,54,82,0.28), transparent 68%)', filter: 'blur(22px)' }} />

    <div style={{ position: 'relative', zIndex: 3, width: 820, padding: '90px 0 0 120px' }}>
      <Eyebrow light>iOS 27 · Image authenticity</Eyebrow>
      <h2 style={{ margin: '24px 0 40px', fontFamily: 'var(--osd-font-display)', fontSize: 82, lineHeight: 1.04, fontWeight: 700, letterSpacing: '-0.055em' }}>
        Apple Reference Image
      </h2>
      <p style={{ margin: 0, width: 660, fontSize: 31, lineHeight: 1.5, color: 'rgba(255,255,255,0.72)' }}>
        主相機感光元件可簽署每個像素。Reference 模式保留簽署過的感光元件資料，並透過 Private Cloud Compute 建立不可變更的參考影像。
      </p>

      <div className="os-stagger" style={{ marginTop: 54, width: 640, borderTop: '1px solid rgba(255,255,255,0.22)', paddingTop: 28, fontSize: 28, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>
        Photos 可並列原始參考影像與編輯版本
        <br />
        Metadata 與即將支援的 SynthID 協助辨識 AI 編修
        <br />
        Siri AI 於 iOS 27 以 beta 形式推出
      </div>
    </div>
    <Source light>Apple Newsroom · Apple Reference Image and iOS 27</Source>
  </PageFrame>
);

const Pricing: Page = () => (
  <PageFrame style={{ ...base, background: 'var(--osd-bg)' }}>
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

      <div className="os-stagger" style={{ background: color.white, borderRadius: 34, overflow: 'hidden', boxShadow: '0 18px 60px rgba(0,0,0,0.06)' }}>
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
  </PageFrame>
);

Cover.transition = heroTransition;
Duo.transition = heroTransition;
DuoCamera.transition = photoTransition;
A20Pro.transition = heroTransition;
ProCamera.transition = photoTransition;
ProSystem.transition = heroTransition;
ReferenceImage.transition = photoTransition;
Pricing.transition = heroTransition;

export const meta: SlideMeta = {
  title: 'Apple Event 2026 · iPhone',
  createdAt: '2026-09-11T01:54:20.921Z',
};

export default [Cover, Lineup, Duo, DuoEngineering, DuoCamera, A20Pro, ProCamera, ProSystem, ReferenceImage, Pricing] satisfies Page[];
