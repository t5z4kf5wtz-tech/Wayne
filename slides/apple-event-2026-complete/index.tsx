import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useIsActivePage, type DesignSystem, type Page, type SlideMeta, type SlideTransition } from '@open-slide/core';

// Preserve the existing layout while presenting every item immediately.
const Steps = Fragment;
const Step = Fragment;
import seriesHero from './assets/series-hero.jpg';
import readiness from './assets/readiness.jpg';
import ceramic from './assets/ceramic.jpg';
import ceramicBlue from './assets/ceramic-blue.jpg';
import ultraHero from './assets/ultra-hero.jpg';
import ultraSensor from './assets/ultra-sensor.jpg';
import ultraRun from './assets/ultra-run.jpg';
import sound from './assets/sound.jpg';
import recap from './assets/recap.jpg';
import airpodsHero from './assets/airpods-hero.jpg';
import airpodsCase from './assets/airpods-case.jpg';
import airpodsLife from './assets/airpods-life.jpg';
import duoHero from './assets/duo-hero.jpg';
import duoDisplays from './assets/duo-displays.jpg';
import duoColors from './assets/duo-colors.jpg';
import duoCamera from './assets/duo-camera.jpg';
import duoApp from './assets/duo-app.jpg';
import proHero from './assets/pro-hero.jpg';
import proColors from './assets/pro-colors.jpg';
import proLow from './assets/pro-low-light.jpg';
import proPortrait from './assets/pro-portrait.jpg';
import proGroup from './assets/pro-group.jpg';
import proControls from './assets/pro-controls.jpg';
import proReference from './assets/pro-reference.jpg';

export const design: DesignSystem = {
  palette: { bg: '#000000', text: '#f5f5f7', accent: '#b3f870' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang TC", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang TC", sans-serif',
  },
  typeScale: { hero: 140, body: 34 },
  radius: 28,
};
const ease = 'cubic-bezier(.16,1,.3,1)';
export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 160, easing: 'ease-in', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 260, delay: 80, easing: ease, keyframes: [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};
const chapter: SlideTransition = {
  duration: 280,
  exit: { duration: 180, easing: 'ease-in', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 280, delay: 100, easing: ease, keyframes: [{ opacity: 0, transform: 'scale(.98)' }, { opacity: 1, transform: 'scale(1)' }] },
};
const css = `
@keyframes wear-rise {from {opacity:0;transform:translateY(24px);filter:blur(5px)} to {opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes wear-image {from {opacity:0;transform:scale(1.045)} to {opacity:1;transform:scale(1)}}
@keyframes wear-glow {from {opacity:.15} to {opacity:.55}}
.wear-page .wear-title,.wear-page .wear-sub,.wear-page .wear-picture {animation:none}
.wear-page.active .wear-picture {animation:wear-photo-settle 1100ms cubic-bezier(.16,1,.3,1) both}
@keyframes wear-photo-settle {from {opacity:.65;transform:scale(1.018)} to {opacity:1;transform:scale(1)}}
.wear-page .wear-glow {animation:none;opacity:.35}
.wear-page h1,.wear-page h2,.wear-page p {margin:0}
@media (prefers-reduced-motion:reduce){.wear-page *{animation:none!important;transition:none!important}}
`;
const Frame = ({ children, light = false }: { children: ReactNode; light?: boolean }) => {
  const active = useIsActivePage();
  return <section className={`wear-page${active ? ' active' : ''}`} style={{ width: '100%', height: '100%', position: 'relative', textAlign: 'left', background: light ? '#fafafa' : 'var(--osd-bg)', color: light ? '#1d1d1f' : 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', letterSpacing: '-.035em' }}><style>{css}</style>{children}</section>;
};
const At = ({ children, x = 120, y = 100, w = 1680, style }: { children: ReactNode; x?: number; y?: number; w?: number; style?: CSSProperties }) => <div style={{ position: 'absolute', left: x, top: y, width: w, ...style }}>{children}</div>;
const Heading = ({ product, title, subtitle }: { product: string; title: ReactNode; subtitle?: string }) => <At><div style={{ fontSize: 38, fontWeight: 600, marginBottom: 28 }}>{product}</div><h2 className="wear-title" style={{ fontSize: 68, fontWeight: 650, lineHeight: 1.15 }}>{title}</h2>{subtitle && <p className="wear-sub" style={{ fontSize: 32, lineHeight: 1.5, color: '#86868b', marginTop: 24 }}>{subtitle}</p>}</At>;
const Photo = ({ src, alt, x, y, w, h, fit = 'contain', style }: { src: string; alt: string; x: number; y: number; w: number; h: number; fit?: 'contain' | 'cover'; style?: CSSProperties }) => <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, ...style }}><img className="wear-picture" src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: fit, borderRadius: 24 }} /></div>;
const Fine = ({ children }: { children: ReactNode }) => <At y={994}><p style={{ fontSize: 23, lineHeight: 1.4, color: '#86868b', letterSpacing: '-.015em' }}>{children}</p></At>;
const Count = ({ value }: { value: number }) => {
  const active = useIsActivePage();
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return; }
    setN(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setN(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return <span aria-label={String(value)} style={{ fontVariantNumeric: 'tabular-nums' }}>{active ? n : value}</span>;
};
const Metric = ({ value, unit, label, detail, size = 146, accent }: { value: number; unit: string; label: string; detail?: string; size?: number; accent?: string }) => <div><div style={{ fontSize: size, lineHeight: 1.05, fontWeight: 650, color: accent }}><Count value={value} /><span style={{ fontSize: 36, marginLeft: 10 }}>{unit}</span></div><div style={{ fontSize: 32, fontWeight: 550, marginTop: 22 }}>{label}</div>{detail && <p style={{ fontSize: 25, color: '#86868b', lineHeight: 1.5, marginTop: 12 }}>{detail}</p>}</div>;
const Feature = ({ title, text }: { title: string; text: string }) => <div style={{ marginBottom: 42 }}><h3 style={{ fontSize: 36, margin: '0 0 14px', fontWeight: 600 }}>{title}</h3><p style={{ fontSize: 30, color: '#86868b', lineHeight: 1.5 }}>{text}</p></div>;

const EventCover: Page = () => <Frame>
  <At y={155}><div className="wear-sub" style={{ fontSize: 32, color: '#86868b' }}>APPLE EVENT / SEPTEMBER 9, 2026</div><h1 className="wear-title" style={{ fontSize: 154, fontWeight: 650, lineHeight: 1.12, marginTop: 55 }}>Apple 秋季發表會</h1><p className="wear-sub" style={{ fontSize: 42, marginTop: 34, color: '#a1a1a6' }}>iPhone、Apple Watch 與 AirPods</p></At>
  <At y={695} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 100 }}><Steps><Step><Feature title="iPhone Duo / 18 Pro" text="折疊螢幕、可變光圈與 A20 Pro" /></Step><Step><Feature title="Series 12 / Ultra 4" text="全新健康感測系統與 S11" /></Step><Step><Feature title="AirPods 5" text="開放式主動降噪與智慧音訊" /></Step></Steps></At>
  <Fine>17 頁精華版。產品特色與核心規格。非 Apple 官方簡報。</Fine>
</Frame>;
const OverviewColumn = ({ name, models, purpose, highlight }: { name: string; models: string; purpose: string; highlight: string }) => <div><h3 style={{ fontSize: 58, margin: 0, fontWeight: 650 }}>{name}</h3><p style={{ fontSize: 28, color: '#86868b', marginTop: 22 }}>{models}</p><p style={{ fontSize: 36, lineHeight: 1.5, marginTop: 56 }}>{purpose}</p><p style={{ fontSize: 32, lineHeight: 1.6, color: '#a1a1a6', marginTop: 32 }}>{highlight}</p></div>;
const ProductOverview: Page = () => <Frame>
  <Heading product="產品總覽" title="三大產品，各自的升級重點" />
  <At y={350} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 85 }}>
    <OverviewColumn name="iPhone" models="Duo / 18 Pro / Pro Max" purpose="行動工作與影像創作" highlight="Duo 展開雙 App 工作空間。Pro 以可變光圈控制景深，共用 A20 Pro。" />
    <OverviewColumn name="Apple Watch" models="Series 12 / Ultra 4" purpose="日常健康與戶外運動" highlight="Series 聚焦健康感測。Ultra 提供更長續航，支援長距離訓練。" />
    <OverviewColumn name="AirPods" models="AirPods 5" purpose="日常聆聽與通話" highlight="開放式配戴加入主動降噪，依環境調整音訊，提供兩種充電盒。" />
  </At>
  <Photo src={proColors} alt="iPhone Pro 色彩陣容" x={120} y={760} w={500} h={220} />
  <Photo src={ultraHero} alt="Apple Watch Ultra 產品外觀" x={705} y={760} w={500} h={220} />
  <Photo src={airpodsHero} alt="AirPods 耳機與充電盒" x={1290} y={760} w={500} h={220} style={{ background: '#fafafa', borderRadius: 24 }} />
</Frame>;
const SeriesCompact: Page = () => <Frame light>
  <Heading product="Apple Watch Series 12" title="日常健康，掌握恢復狀態" />
  <Photo src={seriesHero} alt="Apple Watch Series 12 與健康感測器" x={910} y={280} w={860} h={355} />
  <Photo src={readiness} alt="Apple Watch Readiness 每日身體狀態畫面" x={910} y={660} w={860} h={280} />
  <At y={330} w={700}>
    <Feature title="S11 與全新健康感測系統" text="更頻繁收集心率與 HRV，觀察壓力與恢復。" />
    <Feature title="Readiness 0–10 分" text="整合睡眠、活動與訓練負荷，評估每日身體狀態。" />
    <Feature title="24 小時日常續航，最長" text="42 / 46 mm，提供鋁金屬、鈦金屬與陶瓷。" />
  </At>
  <Fine>充電 15 分鐘可增加最長 12 小時續航。電池依設定與使用方式而異。</Fine>
</Frame>;
const UltraCompact: Page = () => <Frame>
  <Heading product="Apple Watch Ultra 4" title="長距離運動，更長續航" />
  <Photo src={ultraRun} alt="佩戴 Apple Watch Ultra 的戶外跑者" x={930} y={290} w={500} h={635} fit="cover" />
  <Photo src={ultraSensor} alt="Ultra 背面健康感測系統" x={1460} y={290} w={310} h={635} />
  <At y={330} w={720}>
    <Feature title="49 mm 鈦金屬，3,000 尼特" text="廣視角常亮螢幕，共用 S11 與健康感測系統。" />
    <Feature title="50 小時一般使用，最長" text="低耗電模式最長 84 小時。" />
    <Feature title="25 / 45 小時訓練模式" text="分別為 Extended 與 Max Extended Workout，最長值。" />
  </At>
  <Fine>續航依模式與使用方式而異。Max 模式調整部分量測，不可與一般模式直接互換。</Fine>
</Frame>;
const AirPodsCompact: Page = () => <Frame light>
  <Heading product="AirPods 5" title="開放式配戴，主動降噪" />
  <Photo src={airpodsLife} alt="在餐廳配戴 AirPods 的聆聽情境" x={970} y={280} w={790} h={390} fit="cover" />
  <Photo src={airpodsHero} alt="AirPods 5 耳機與充電盒" x={1140} y={695} w={460} h={265} />
  <At y={335} w={760}>
    <Feature title="噪音消除最高提升 50%" text="相較 AirPods 4 主動降噪款，兩個版本皆支援 ANC。" />
    <Feature title="Adaptive Audio" text="依環境混合降噪與通透，開口說話時降低音量。" />
    <Feature title="Live Translation" text="搭配相容 iPhone 與 Apple Intelligence 進行翻譯。" />
  </At>
  <Fine>降噪效果依配戴與環境而異。翻譯需下載語言，支援範圍依裝置、語言與地區。</Fine>
</Frame>;
const DuoIntro: Page = () => <Frame light>
  <Photo src={duoHero} alt="展開的 iPhone Duo" x={600} y={0} w={1200} h={760} />
  <At y={790}><h1 className="wear-title" style={{ fontSize: 150, fontWeight: 650, lineHeight: 1 }}>iPhone Duo</h1><p className="wear-sub" style={{ fontSize: 36, color: '#86868b', marginTop: 28 }}>首款折疊 iPhone，展開更大的工作空間</p></At>
</Frame>;
const DuoDesign: Page = () => <Frame light>
  <Heading product="iPhone Duo" title="5 級鈦金屬，精密折疊結構" />
  <Photo src={duoColors} alt="星光白與夜空色 iPhone Duo" x={865} y={285} w={900} h={605} />
  <At y={340} w={650}><Steps><Step><Feature title="100+ 鉸鏈零件" text="支撐中央螢幕，磁鐵陣列協助閉合。" /></Step><Step><Feature title="3D 列印鉸鏈外蓋" text="鏡面拋光機身，搭配微噴砂表面。" /></Step><Step><Feature title="IP68 / Ceramic Shield 2" text="外螢幕抗刮能力為前代的 3 倍。" /></Step></Steps></At>
  <Fine>提供 Star White 與 Night Sky。抗刮與防護數據依 Apple 測試，防水能力可能隨使用降低。</Fine>
</Frame>;
const DuoDisplay: Page = () => <Frame light>
  <Photo src={duoDisplays} alt="iPhone Duo 內外螢幕比較" x={820} y={190} w={1040} h={720} />
  <At w={760}><div style={{ fontSize: 38 }}>iPhone Duo</div><h2 className="wear-title" style={{ fontSize: 76, lineHeight: 1.2, marginTop: 35 }}>兩個螢幕，<br />相同比例</h2></At>
  <At y={400} w={740}><div style={{ fontSize: 146, fontWeight: 650, lineHeight: 1 }}>7.6<span style={{ fontSize: 36 }}> 吋</span></div><p style={{ fontSize: 32, color: '#86868b', marginTop: 20 }}>內螢幕，奈米紋理降低反光</p><div style={{ fontSize: 120, fontWeight: 650, marginTop: 55 }}>5.4<span style={{ fontSize: 36 }}> 吋</span></div><p style={{ fontSize: 32, color: '#86868b' }}>外螢幕，方便單手使用</p></At>
  <Fine>Super Retina XDR、ProMotion、常亮顯示，戶外峰值亮度最高 3,000 尼特。</Fine>
</Frame>;
const DuoApps: Page = () => <Frame light>
  <Heading product="iPhone Duo" title="兩個 App，並排使用" subtitle="Split View 支援同時開啟兩個 App，也能儲存常用 App 配對。" />
  <Photo src={duoApp} alt="Slack 在 iPhone Duo 展開的工作介面" x={760} y={335} w={1030} h={565} />
  <At y={420} w={560}><Steps><Step><Feature title="同一 App，兩個視窗" text="例如並排瀏覽 Safari 頁面。" /></Step><Step><Feature title="邊看內容，邊問 Siri" text="內外螢幕與折疊姿態自動適應。" /></Step><Step><Feature title="StandBy" text="放置後可顯示時鐘、照片與小工具。" /></Step></Steps></At>
</Frame>;
const DuoPhoto: Page = () => <Frame light>
  <Heading product="iPhone Duo" title="48MP 雙 Fusion 相機" />
  <Photo src={duoCamera} alt="iPhone Duo Center Stage 多人自拍範例" x={120} y={325} w={850} h={565} fit="cover" />
  <At x={1080} y={355} w={700}><Steps><Step><Feature title="48MP 主相機與超廣角" text="24MP 預設輸出、零快門延遲與光學品質 2 倍望遠。" /></Step><Step><Feature title="外螢幕即時預覽" text="用後置鏡頭自拍，或讓被攝者確認構圖。" /></Step><Step><Feature title="4K 120 fps Dolby Vision" text="半折放置，支援免手持拍攝。" /></Step></Steps></At>
</Frame>;
const Chip: Page = () => <Frame>
  <Heading product="iPhone Duo / iPhone 18 Pro" title="A20 Pro，2 奈米製程" subtitle="6 核心 CPU、7 核心 GPU，雙 16 核心 Neural Engine。" />
  <At y={410} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 70 }}><Steps><Step><Metric value={20} unit="%" label="CPU 速度最高提升" detail="相較 A19 Pro" /></Step><Step><Metric value={40} unit="%" label="GPU 速度最高提升" detail="效能與能源效率同步提升" /></Step><Step><Metric value={2} unit="倍" label="Neural Engine 運算能力" detail="支援裝置端 AI" /></Step></Steps></At>
  <At y={820}><p className="wear-sub" style={{ fontSize: 38, color: '#a1a1a6' }}>記憶體頻寬增加 50%，晶片封裝直接連接均熱板</p></At>
</Frame>;
const DuoPower: Page = () => <Frame light>
  <Heading product="iPhone Duo" title="雙電池，依使用方式管理電力" />
  <At y={375} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 70 }}><Steps><Step><Metric value={31} unit="小時" label="內螢幕影片播放，最長" /></Step><Step><Metric value={44} unit="小時" label="外螢幕影片播放，最長" /></Step><Step><Metric value={24} unit="小時" label="內外螢幕均等使用，最長" /></Step></Steps></At>
  <At y={820}><p style={{ fontSize: 42 }}>約 20 分鐘，有線充電至 50%</p></At><Fine>不同情境的續航不可直接混用。續航與充電速度依使用方式、配件及環境而異。</Fine>
</Frame>;
const DuoPrice: Page = () => <Frame light>
  <Heading product="iPhone Duo" title="美國 US$1,999 起" subtitle="256GB 起，提供 Star White 與 Night Sky。" />
  <At y={420} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 140 }}><div><div className="wear-title" style={{ fontSize: 175, fontWeight: 650 }}>10.16</div><p style={{ fontSize: 36 }}>開放預購</p></div><div><div className="wear-title" style={{ fontSize: 175, fontWeight: 650 }}>10.23</div><p style={{ fontSize: 36 }}>正式開賣</p></div></At>
  <At y={820}><p style={{ fontSize: 34, color: '#86868b' }}>全球採 eSIM。N1 支援 Wi-Fi 7、Bluetooth 6 與 Thread。</p></At><Fine>2026 年美國起售價，未含銷售稅。電信服務與 mmWave 支援依國家及電信業者。</Fine>
</Frame>;
const ProIntro: Page = () => <Frame>
  <Photo src={proHero} alt="iPhone 18 Pro 與 Pro Max" x={560} y={0} w={1190} h={745} />
  <At y={775}><h1 className="wear-title" style={{ fontSize: 150, fontWeight: 650, lineHeight: 1 }}>iPhone 18 Pro</h1><p className="wear-sub" style={{ fontSize: 34, color: '#86868b', marginTop: 30 }}>與 iPhone 18 Pro Max，可變光圈與更長續航</p></At>
</Frame>;
const ProFinishes: Page = () => <Frame>
  <Heading product="iPhone 18 Pro" title="四種色彩，全新勃根地紅" subtitle="Black、Silver、Glacier、Burgundy。" />
  <Photo src={proColors} alt="iPhone 18 Pro 四種顏色" x={260} y={330} w={1410} h={610} />
</Frame>;
const Aperture: Page = () => <Frame>
  <Heading product="iPhone 18 Pro" title="同一顆主相機，不同景深" subtitle="48MP Fusion 主相機，六片雷射切割葉片控制光圈。" />
  <Photo src={proLow} alt="f/1.48 低光拍攝" x={120} y={365} w={500} h={420} fit="cover" />
  <Photo src={proPortrait} alt="f/1.8 人像拍攝" x={710} y={365} w={500} h={420} fit="cover" />
  <Photo src={proGroup} alt="f/4 群體景深拍攝" x={1300} y={365} w={500} h={420} fit="cover" />
  <At y={830} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 90 }}><Steps><Step><Feature title="ƒ/1.48" text="低光源，收進更多光線。" /></Step><Step><Feature title="ƒ/1.8" text="人像，平衡光線與景深。" /></Step><Step><Feature title="ƒ/4" text="群體合照，增加清晰範圍。" /></Step></Steps></At>
  <Fine>此頁示範三種情境。原生相機提供四段手動設定，開發者可透過 API 進一步控制。</Fine>
</Frame>;
const ProControl: Page = () => <Frame>
  <Heading product="iPhone 18 Pro" title="手動控制，與可驗證的影像" subtitle="Pro controls 與 Apple Reference Image。" />
  <Photo src={proControls} alt="手動快門保留主體與動態背景" x={120} y={350} w={720} h={420} fit="cover" />
  <Photo src={proReference} alt="Apple Reference Image 原始參考影像比較" x={980} y={350} w={820} h={420} />
  <At y={825} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 110 }}><Steps><Step><Feature title="光圈、快門、白平衡與直方圖" text="依創作需求調整曝光。" /></Step><Step><Feature title="感光元件簽署像素資料" text="透過 Private Cloud Compute 建立參考影像。" /></Step></Steps></At>
</Frame>;
const ProPower: Page = () => <Frame>
  <div className="wear-glow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 35%, #273b1f, transparent 70%)' }} />
  <At><div style={{ fontSize: 38 }}>iPhone 18 Pro Max</div><div className="wear-title" style={{ fontSize: 300, fontWeight: 650, lineHeight: 1.1, marginTop: 60 }}><Count value={45} /><span style={{ fontSize: 52 }}>小時</span></div><h2 style={{ fontSize: 60, marginTop: 25 }}>影片播放，最長續航</h2></At>
  <At y={720} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 70 }}><Steps><Step><Metric value={36} unit="小時" label="iPhone 18 Pro 影片播放" size={106} /></Step><Step><Metric value={15} unit="分鐘" label="Pro 有線充電至 50%，約" size={106} /></Step><Step><Metric value={40} unit="%" label="Pro 持續效能最高提升" detail="相較 iPhone 17 Pro" size={106} /></Step></Steps></At>
  <Fine>36／45 小時適用美國等市場的 eSIM-only 機型。實體 SIM 機型少 2 小時。</Fine>
</Frame>;
const ProPrice: Page = () => <Frame>
  <Heading product="iPhone 18 Pro" title="美國售價與開賣日期" />
  <At y={330} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120 }}><div><div style={{ fontSize: 38 }}>iPhone 18 Pro</div><div className="wear-title" style={{ fontSize: 120, fontWeight: 650, marginTop: 30 }}>US$1,199<span style={{ fontSize: 32 }}> 起</span></div></div><div><div style={{ fontSize: 38 }}>iPhone 18 Pro Max</div><div className="wear-title" style={{ fontSize: 120, fontWeight: 650, marginTop: 30 }}>US$1,299<span style={{ fontSize: 32 }}> 起</span></div></div></At>
  <At y={670}><p style={{ fontSize: 36, color: '#86868b' }}>256GB、512GB、1TB、2TB</p><div style={{ display: 'flex', gap: 190, marginTop: 60 }}><div style={{ fontSize: 62 }}>09.12 <span style={{ fontSize: 30 }}>預購</span></div><div style={{ fontSize: 62 }}>09.18 <span style={{ fontSize: 30 }}>開賣</span></div></div></At><Fine>Apple 官方美國起售價，未含銷售稅。iOS 27 於 2026/09/14 推出。</Fine>
</Frame>;

const Series: Page = () => <Frame light>
  <Photo src={seriesHero} alt="Apple Watch Series 12 正面與全新健康感測系統" x={480} y={30} w={1140} h={710} />
  <At y={770}><h1 className="wear-title" style={{ fontSize: 136, fontWeight: 650, lineHeight: 1.1 }}>Apple Watch Series 12</h1><p className="wear-sub" style={{ fontSize: 34, color: '#86868b', marginTop: 24 }}>全新健康感測系統，搭配 S11 晶片</p></At>
</Frame>;
const Sensing: Page = () => <Frame>
  <Heading product="Apple Watch Series 12" title="更頻繁的量測，更完整的身體訊號" subtitle="重新設計光學與電極式心率感測器，搭配更大、更省電的綠光 LED。" />
  <At y={410} w={1680} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 65 }}><Steps>
    <Step><Metric value={5} unit="秒" label="一次背景心率量測" detail="全天持續收集" accent="#b3f870" /></Step>
    <Step><Metric value={24} unit="倍" label="HRV 量測頻率" detail="相較 Series 11" accent="#b3f870" /></Step>
    <Step><div><div style={{ fontSize: 140, fontWeight: 650 }}>S11</div><p style={{ fontSize: 32, marginTop: 24 }}>感測與運算協同設計</p><p style={{ fontSize: 25, color: '#86868b', marginTop: 16 }}>支援新的步數演算法</p></div></Step>
  </Steps></At>
  <Fine>Recovery HRV 用於觀察每日壓力與恢復，Overall HRV 提供較長期的健康趨勢。</Fine>
</Frame>;
const Readiness: Page = () => <Frame light>
  <Heading product="Apple Watch Series 12" title="Readiness 身體準備程度" subtitle="分析近期活動、訓練負荷、生命徵象與睡眠，提供 0–10 分的每日評估。" />
  <Photo src={readiness} alt="Series 12 的三種 Readiness 準備程度畫面" x={280} y={330} w={1360} h={530} />
  <At y={893} style={{ display: 'flex', gap: 120 }}><Steps><Step><div style={{ fontSize: 32 }}>隨白天新資料更新</div></Step><Step><div style={{ fontSize: 32 }}>顯示影響分數的因素</div></Step></Steps></At>
</Frame>;
const Materials: Page = () => <Frame light>
  <Heading product="Apple Watch Series 12" title="42 與 46 mm，三種錶殼材質" />
  <Photo src={ceramic} alt="珍珠白陶瓷 Series 12" x={870} y={250} w={410} h={650} />
  <Photo src={ceramicBlue} alt="夜藍色陶瓷 Series 12" x={1350} y={250} w={410} h={650} />
  <At y={350} w={660}><Steps>
    <Step><Feature title="鋁金屬" text="深古銅、黑、淺金與太空灰，配備 Ceramic Shield 2。" /></Step>
    <Step><Feature title="鈦金屬與陶瓷" text="鈦金屬提供金色與原色，陶瓷提供珍珠白與夜藍色。" /></Step>
    <Step><Feature title="WR 50M / IP6X" text="具備 50 公尺防水等級與防塵能力。" /></Step>
  </Steps></At>
  <Fine>鋁金屬款玻璃強韌度較前代 Ion-X 提升 60%（Apple 測試）。防水等級不等同建議下潛深度。</Fine>
</Frame>;
const SeriesBattery: Page = () => <Frame light>
  <Heading product="Apple Watch Series 12" title="24 小時日常續航" />
  <At y={325}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 140 }}><Metric value={24} unit="小時" label="一般使用，最長" size={230} /><Metric value={10} unit="小時" label="戶外體能訓練，最長" detail="比前代增加 25%" size={230} /></div></At>
  <At y={790}><Steps><Step><div style={{ borderTop: '1px solid #d2d2d7', paddingTop: 42, fontSize: 44 }}>充電 15 分鐘，增加最長 12 小時續航</div></Step></Steps></At>
  <Fine>電池續航依設定、使用方式與環境而異，數值依 Apple 測試條件。</Fine>
</Frame>;
const Ultra: Page = () => <Frame>
  <Photo src={ultraHero} alt="Apple Watch Ultra 4 鈦金屬錶殼與數位錶冠" x={220} y={40} w={1480} h={700} />
  <At y={770}><h1 className="wear-title" style={{ fontSize: 140, fontWeight: 650, lineHeight: 1.1 }}>Apple Watch Ultra 4</h1><p className="wear-sub" style={{ fontSize: 34, color: '#86868b', marginTop: 26 }}>49 mm 鈦金屬，為長時間運動與戶外探索設計</p></At>
</Frame>;
const UltraBattery: Page = () => <Frame>
  <div className="wear-glow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 35% 40%, #263e16, transparent 65%)' }} />
  <At><div style={{ fontSize: 38 }}>Apple Watch Ultra 4</div><div className="wear-title" style={{ fontSize: 310, lineHeight: 1.1, fontWeight: 650, marginTop: 65 }}><Count value={50} /><span style={{ fontSize: 52 }}>小時</span></div><h2 style={{ fontSize: 60, lineHeight: 1.2, marginTop: 12 }}>一般使用，最長超過兩天</h2></At>
  <At y={730} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}><Steps><Step><Metric value={84} unit="小時" label="低耗電模式，最長" size={106} /></Step><Step><Metric value={18} unit="小時" label="充電 15 分鐘增加的續航，最長" size={106} /></Step></Steps></At>
  <Fine>不同模式採不同測試條件，不代表同一負載下的直接比較。</Fine>
</Frame>;
const UltraWorkout: Page = () => <Frame>
  <Photo src={ultraRun} alt="佩戴 Ultra 4 的戶外跑者" x={990} y={0} w={930} h={1080} fit="cover" />
  <At w={790}><div style={{ fontSize: 38, marginBottom: 35 }}>Apple Watch Ultra 4</div><h2 className="wear-title" style={{ fontSize: 74, lineHeight: 1.18 }}>長距離訓練，<br />兩種續航模式</h2></At>
  <At y={405} w={760}><Steps><Step><Metric value={25} unit="小時" label="Extended Workout" detail="完整 GPS 與心率讀值，最長" size={120} /></Step><Step><div style={{ marginTop: 48 }}><Metric value={45} unit="小時" label="Max Extended Workout" detail="適用戶外跑步、步行與健行，最長" size={120} /></div></Step></Steps></At>
  <At y={1000} w={760}><p style={{ fontSize: 23, color: '#86868b' }}>Max 模式仍每秒記錄 GPS，其他量測依模式調整。</p></At>
</Frame>;
const UltraHardware: Page = () => <Frame>
  <Heading product="Apple Watch Ultra 4" title="大螢幕，與全新感測系統" />
  <Photo src={ultraSensor} alt="Ultra 4 背面的心率感測器" x={960} y={275} w={760} h={650} />
  <At y={340} w={740}><Steps>
    <Step><Feature title="最高 3,000 尼特" text="廣視角常亮 Retina 顯示器。" /></Step>
    <Step><Feature title="S11 + Health Sensing System" text="背景心率每 5 秒量測，支援 Readiness 與 Recovery HRV。" /></Step>
    <Step><Feature title="原色與黑色鈦金屬" text="搭配 Trail Loop、Alpine Loop 或全新半透明 Ocean Band。" /></Step>
  </Steps></At>
</Frame>;
const AudioIntelligence: Page = () => <Frame>
  <Heading product="Apple Watch Series 12 / Ultra 4" title="Audio Intelligence" subtitle="S11 的 Secure Exclave 以隔離硬體處理聲音，處理後刪除原始音訊。" />
  <Photo src={sound} alt="Apple Watch 的聲音辨識提醒" x={250} y={360} w={530} h={415} />
  <Photo src={recap} alt="Siri Recap 在 Apple Watch 與 iPhone 的顯示" x={1000} y={360} w={670} h={415} />
  <At y={825} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}><Steps>
    <Step><Feature title="Sound Recognition" text="偵測門鈴、警報等重要聲音。" /></Step>
    <Step><Feature title="Live Rewind / Siri Recap" text="回看前 15 秒文字，或保留談話重點摘要。" /></Step>
  </Steps></At>
  <Fine>Live Rewind、Siri Recap 預計 2026 年稍晚以 beta 推出，需使用者啟用，支援範圍依語言與地區。</Fine>
</Frame>;
const AirPods: Page = () => <Frame light>
  <Photo src={airpodsHero} alt="AirPods 5 與充電盒" x={625} y={45} w={1040} h={735} />
  <At y={775}><h1 className="wear-title" style={{ fontSize: 150, fontWeight: 650, lineHeight: 1 }}>AirPods 5</h1><p className="wear-sub" style={{ fontSize: 34, color: '#86868b', marginTop: 30 }}>開放式配戴，兩款皆支援主動降噪</p></At>
</Frame>;
const Noise: Page = () => <Frame>
  <Photo src={airpodsLife} alt="在餐廳使用 AirPods 5" x={1020} y={0} w={900} h={1080} fit="cover" />
  <At w={790}><div style={{ fontSize: 38 }}>AirPods 5</div><div className="wear-title" style={{ fontSize: 245, fontWeight: 650, marginTop: 85, lineHeight: 1.1 }}><Count value={50} /><span style={{ fontSize: 100 }}>%</span></div><h2 style={{ fontSize: 65, marginTop: 28 }}>更多外部噪音消除</h2><p style={{ fontSize: 30, color: '#a1a1a6', lineHeight: 1.5, marginTop: 30 }}>相較 AirPods 4 主動降噪款，最高提升幅度。</p></At>
  <At y={745} w={750}><Steps><Step><Feature title="多氣孔聲學架構" text="搭配更新的運算音訊演算法。" /></Step></Steps></At>
  <At y={1000} w={790}><p style={{ fontSize: 23, color: '#86868b' }}>依 Apple IEC 60268-24 測試，效果依配戴與環境而異。</p></At>
</Frame>;
const Listening: Page = () => <Frame light>
  <Heading product="AirPods 5" title="聆聽、對話與跨語言溝通" />
  <At y={340} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120 }}><Steps>
    <Step><Feature title="Adaptive Audio" text="依環境混合通透模式與主動降噪。" /></Step>
    <Step><Feature title="Conversation Awareness" text="開口說話時，自動降低播放音量。" /></Step>
    <Step><Feature title="新一代 Adaptive EQ" text="適應不同耳型，支援個人化空間音訊。" /></Step>
    <Step><Feature title="Live Translation" text="搭配相容 iPhone、Apple Intelligence 與下載的語言。" /></Step>
  </Steps></At>
  <At y={790}><div className="wear-sub" style={{ fontSize: 46, borderTop: '1px solid #d2d2d7', paddingTop: 45 }}>點頭或搖頭，回應 Siri</div></At>
  <Fine>翻譯並非所有語言／地區皆支援。Siri AI 隨 iOS 27 以 beta 推出，初期為英文。</Fine>
</Frame>;
const AirPodsBattery: Page = () => <Frame light>
  <Heading product="AirPods 5" title="兩種充電盒，功能有別" />
  <Photo src={airpodsCase} alt="AirPods 5 無線充電盒與充電器" x={1080} y={300} w={690} h={570} />
  <At y={340} w={870} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50 }}><Steps>
    <Step><Metric value={4} unit="小時" label="標準版，ANC 開啟" detail="單次充電最長續航" size={170} /></Step>
    <Step><Metric value={5} unit="小時" label="無線盒版，ANC 開啟" detail="含充電盒合計最長 22 小時" size={170} /></Step>
  </Steps></At>
  <At y={770} w={900}><Feature title="無線盒版新增滑動音量控制" text="支援 Apple Watch、Qi 無線充電與 USB-C。兩款皆具 IP57 防塵、防汗與防水等級。" /></At>
  <Fine>5／22 小時僅適用無線充電盒版本，以上續航皆為 ANC 開啟條件。</Fine>
</Frame>;
const PriceRow = ({ name, price, detail }: { name: string; price: string; detail: string }) => <tr><td style={{ padding: '30px 0', fontSize: 36, fontWeight: 550 }}>{name}</td><td style={{ fontSize: 48, fontWeight: 600, textAlign: 'right' }}>{price}</td><td style={{ fontSize: 29, color: '#86868b', paddingLeft: 95 }}>{detail}</td></tr>;
const Pricing: Page = () => <Frame>
  <Heading product="Watch / AirPods · U.S. Pricing" title="穿戴與音訊，美國售價" subtitle="2026 年 9 月 9 日開放預購，9 月 18 日正式開賣。" />
  <At y={350}><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr style={{ color: '#86868b', fontSize: 24, textAlign: 'left', borderBottom: '1px solid #424245' }}><th style={{ paddingBottom: 22 }}>產品</th><th style={{ textAlign: 'right' }}>US$ 起</th><th style={{ paddingLeft: 95 }}>重點差異</th></tr></thead><tbody>
    <PriceRow name="Apple Watch Series 12" price="$399" detail="42 / 46 mm，日常健康與運動" />
    <PriceRow name="Apple Watch Ultra 4" price="$799" detail="49 mm，較長續航與戶外能力" />
    <PriceRow name="AirPods 5" price="$129" detail="ANC，USB-C 充電盒" />
    <PriceRow name="AirPods 5 無線充電盒版" price="$149" detail="無線充電，滑動調音量" />
  </tbody></table></At>
  <Fine>Apple 官方美國起售價，未含銷售稅。Apple Watch 材質、尺寸與錶帶配置會影響價格。</Fine>
</Frame>;
const Timing: Page = () => <Frame>
  <Heading product="Availability" title="硬體與軟體，分批到位" />
  <At y={350} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 90 }}><Steps>
    <Step><div><div style={{ fontSize: 105, fontWeight: 650 }}>09.14</div><h3 style={{ fontSize: 36, marginTop: 32 }}>watchOS 27 / iOS 27</h3><p style={{ fontSize: 30, lineHeight: 1.6, color: '#86868b' }}>Siri AI 以 beta 推出，初期英文，需相容裝置。</p></div></Step>
    <Step><div><div style={{ fontSize: 105, fontWeight: 650 }}>09.18</div><h3 style={{ fontSize: 36, marginTop: 32 }}>新款 Watch / AirPods</h3><p style={{ fontSize: 30, lineHeight: 1.6, color: '#86868b' }}>Series 12、Ultra 4 與 AirPods 5 正式開賣。</p></div></Step>
    <Step><div><div style={{ fontSize: 100, fontWeight: 650 }}>稍晚</div><h3 style={{ fontSize: 36, marginTop: 32 }}>Health / Audio Intelligence</h3><p style={{ fontSize: 30, lineHeight: 1.6, color: '#86868b' }}>新版健康 App、Health Age，以及 Live Rewind、Siri Recap beta。</p></div></Step>
  </Steps></At>
  <At y={825}><p style={{ fontSize: 30, color: '#a1a1a6' }}>iPhone 18 Pro 同於 9/18 開賣。iPhone Duo 10/16 預購，10/23 開賣。</p><p style={{ fontSize: 26, color: '#86868b', marginTop: 24 }}>健康 App 新功能先從美式英文開始，AI 與健康功能依地區、語言與裝置而異。</p></At>
  <Fine>資料來源：Apple Newsroom 2026/09/09 與 Apple 美國產品頁。核對日期：2026/09/12。</Fine>
</Frame>;

Series.transition = chapter;
Ultra.transition = chapter;
AirPods.transition = chapter;
EventCover.transition = chapter;
DuoIntro.transition = chapter;
ProIntro.transition = chapter;
const duoSource = 'https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/';
const proSource = 'https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/';
const seriesSource = 'https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/';
const ultraSource = 'https://www.apple.com/newsroom/2026/09/apple-unveils-apple-watch-ultra-4/';
const airpodsSource = 'https://www.apple.com/newsroom/2026/09/apple-introduces-airpods-5-with-best-in-class-open-ear-active-noise-cancellation/';
const originalNotes = [
  `依使用者指定的 https://iphone-duo-slide.vercel.app/s/apple-event-2026-09 排版風格重新製作。產品資料來源：Apple Newsroom 2026/09/09。非 Apple 官方簡報。`,
  `iPhone Duo 產品與圖片來源：${duoSource}`,
  `結構、防護與圖片：${duoSource}。100+ 代表鉸鏈零件數。`,
  `螢幕與圖片：${duoSource} 及 https://www.apple.com/iphone-duo/。`,
  `多工與圖片：${duoSource} 及 https://www.apple.com/iphone-duo/。`,
  `相機規格與圖片：${duoSource}。4K120 Dolby Vision 適用 Fusion 主相機。`,
  `晶片數據：${duoSource} 及 ${proSource}。CPU/GPU 改善相較 A19 Pro，皆為最高值。`,
  `Duo 電池與充電：${duoSource}。內、外螢幕及均等使用是不同測試情境。`,
  `美國售價與日期：${duoSource}。US$1,999 為 256GB 起售價，不含稅。`,
  `Pro 產品與圖片：${proSource}`,
  `顏色與圖片：${proSource}`,
  `光圈規格與三張圖片：${proSource}。本頁展示三個例子，不代表只有三段光圈。`,
  `Pro controls、Apple Reference Image 與圖片：${proSource}`,
  `續航、充電與持續效能：${proSource}。採美國 eSIM-only 機型的 36/45 小時，與台灣實體 SIM 版不同。`,
  `美國價格、容量與開賣日期：${proSource}`,
  `產品與圖片來源：${seriesSource}`,
  `資料：${seriesSource} 與 https://www.apple.com/apple-watch-series-12/。量測頻率不是準確度提升倍數。`,
  `產品與圖片來源：${seriesSource}。Readiness 是日常健康／運動指標。`,
  `產品與圖片來源：${seriesSource}。防護規格：https://www.apple.com/apple-watch-series-12/。`,
  `資料：${seriesSource}。續航為最長值，依 Apple 的特定測試條件。`,
  `產品與圖片來源：${ultraSource}。尺寸：https://www.apple.com/apple-watch-ultra-4/。`,
  `資料：${ultraSource}。50 小時為一般使用，84 小時為低耗電模式，不能互換。`,
  `產品與圖片來源：${ultraSource}。25 小時為 Extended Workout，45 小時為 Max Extended Workout。`,
  `圖片與感測資料：${ultraSource}。螢幕規格：https://www.apple.com/apple-watch-ultra-4/。`,
  `圖片與功能來源：${seriesSource} 及 ${ultraSource}。Live Rewind 和 Siri Recap 於 2026 年稍晚推出 beta。`,
  `產品與圖片來源：${airpodsSource}`,
  `產品與圖片來源：${airpodsSource}。50% 是相較 AirPods 4 with ANC 的最高噪音消除改善，非絕對安靜程度。`,
  `資料：${airpodsSource}。Live Translation 與 Siri AI 需相容裝置，依語言及地區支援。`,
  `圖片：${airpodsSource}。版本規格：https://www.apple.com/airpods-5/。所有續航標示均使用 ANC 開啟條件。`,
  `官方美國價格及日期：${seriesSource}\n${ultraSource}\n${airpodsSource}。起售價未含銷售稅。`,
  `推出時程：${seriesSource}\n${ultraSource}\n${airpodsSource}。原始 iPhone 章節參考：https://iphone-duo-slide.vercel.app/s/apple-event-2026-09。`,
];
export const notes = [
  originalNotes[0],
  `三大產品定位與亮點摘要，整理自原整合版。${duoSource}\n${proSource}\n${seriesSource}\n${ultraSource}\n${airpodsSource}`,
  ...originalNotes.slice(1, 8), originalNotes[9],
  originalNotes[11], originalNotes[13],
  `Series 12 健康、尺寸、材質與續航摘要：${seriesSource}。續航為最長值。Readiness 為日常健康與運動指標。`,
  originalNotes[16],
  `Ultra 4 螢幕、材質與不同模式續航摘要：${ultraSource}。25 / 45 小時分別指 Extended / Max Extended Workout。`,
  `AirPods 5 降噪與智慧音訊摘要：${airpodsSource}。50% 為相較 AirPods 4 with ANC 的最高改善值，翻譯有裝置、地區與語言限制。`,
  originalNotes[28],
];
SeriesCompact.transition = chapter;
UltraCompact.transition = chapter;
AirPodsCompact.transition = chapter;
export const meta: SlideMeta = { title: 'Apple 秋季發表會 2026 · 17 頁精華版', createdAt: '2026-09-12T02:34:36.707Z' };
export default [EventCover, ProductOverview, DuoIntro, DuoDesign, DuoDisplay, DuoApps, DuoPhoto, Chip, DuoPower, ProIntro, Aperture, ProPower, SeriesCompact, Sensing, UltraCompact, AirPodsCompact, AirPodsBattery] satisfies Page[];
