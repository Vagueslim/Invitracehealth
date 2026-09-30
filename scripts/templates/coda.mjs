import { renderCodaConversation } from './coda-conversation.mjs';
import { escapeHtml as esc, relativeHref } from '../lib/html.js';
import { codaRoutePath, alternateCodaRoute } from '../../src/data/coda-routes.js';
import { codaProjects } from '../../src/data/coda-projects.js';
import { site } from '../../src/data/site-content.js';
import { renderCodaCase } from './coda-case.mjs';
import { renderCodaAbout } from './coda-about.mjs';

const text = (route, en, th) => route.locale === 'th' ? th : en;
const link = (route, page, slug = '') => relativeHref(route.path, codaRoutePath(route.locale, page, slug));
const asset = (route, path) => relativeHref(route.path, `/${path.replace(/^\//, '')}`);
const arrow = '<span aria-hidden="true">↗</span>';
const wcfSlides = [
  { src: 'src/assets/images/work/wcf-digital/coda/claim-flow.png', alt: { en: 'WCF medical expense claim flow illustration, from case search to e-Receipt submission', th: 'ภาพประกอบโฟลว์เคลมค่ารักษา WCF ตั้งแต่ค้นหาเคสจนส่ง e-Receipt' } },
  { src: 'src/assets/images/work/wcf-digital/coda/billing-wireflow.jpg', alt: { en: 'WCF billing wireflow connecting invoice entry, treatment categories and medical item selection', th: 'ผังหน้าจอ WCF เชื่อมการสร้างใบแจ้งหนี้ หมวดค่ารักษา และการเลือกเวชภัณฑ์' } },
  { src: 'src/assets/images/work/wcf-digital/coda/payment-wireflow.jpg', alt: { en: 'WCF payment wireflow with hospital, beneficiary and physician compensation screens', th: 'ผังหน้าจอการจ่ายเงิน WCF สำหรับโรงพยาบาล ทายาท และค่าตอบแทนแพทย์' } }
];

function signalArt(route, compact = false) {
  return `<div class="co-signal${compact ? ' co-signal--compact' : ''}" role="group" aria-label="${text(route, 'Research dataset: 3,999 rescheduling records, split into 3,545 staff-assisted and 454 self-service records.', 'ข้อมูลที่ศึกษา: เปลี่ยนวัน 3,999 รายการ แบ่งเป็นผ่านเจ้าหน้าที่ 3,545 รายการ และลูกค้าทำเอง 454 รายการ')}">
    <div class="co-signal__top"><span>Q–CHANG / CHANGE DATE</span><span>${text(route, 'A SERVICE, RECONSIDERED', 'มองการเปลี่ยนวันใหม่อีกครั้ง')}</span></div>
    <div class="co-signal__drawing">
      <div class="co-signal__total"><span class="co-signal__eyebrow">${text(route, 'RECORDS STUDIED', 'รายการที่ศึกษา')}</span><strong>3,999<span class="co-signal__dot">.</span></strong><span>${text(route, 'One request. A whole system behind it.', 'หนึ่งคำขอ กับระบบที่อยู่เบื้องหลัง')}</span></div>
      <div class="co-signal__bridge" aria-hidden="true"><span></span><img src="${asset(route, '/src/assets/images/work/rescheduling-pain/stations/station-01.webp')}" alt="" width="246" height="246"></div>
      <div class="co-signal__branches">
        <div class="co-signal__branch"><span class="co-signal__node" aria-hidden="true"></span><strong>3,545</strong><span>${text(route, 'Staff-assisted', 'ผ่านเจ้าหน้าที่')}</span></div>
        <div class="co-signal__branch"><span class="co-signal__node" aria-hidden="true"></span><strong>454</strong><span>${text(route, 'Self-service', 'ลูกค้าทำเอง')}</span></div>
      </div>
    </div>
    <div class="co-signal__bottom"><span>${text(route, 'BOOKING → PEOPLE → COORDINATION', 'วันจอง → คน → การประสานงาน')}</span><span>${text(route, 'Research data · not an impact metric', 'ข้อมูลที่ศึกษา · ไม่ใช่ตัวเลขผลลัพธ์')}</span></div>
  </div>`;
}

function wcfHero(route) {
  const caseHref = link(route, 'work-detail', 'wcf-digital');
  return `<a class="co-wcf-feature" href="${caseHref}" aria-label="${text(route, 'Read WCF Digital hospital billing case', 'อ่านเคส WCF Digital งานใบแจ้งหนี้สถานพยาบาล')}">
    <div class="co-wcf-feature__story"><span class="co-kicker">WCF DIGITAL / HOSPITAL BILLING</span><h2>${text(route, 'Bring the billing work back into the system.', 'พางานค่ารักษาพยาบาลกลับเข้ามาในระบบ')}</h2><p>${text(route, 'Requirements → workflow → interface → UAT support', 'เก็บข้อกำหนด → วาง workflow → ออกแบบหน้าจอ → สนับสนุน UAT')}</p><span class="co-wcf-feature__evidence">${text(route, 'Flow illustration / medical expense claim', 'ภาพประกอบขั้นตอนเบิกค่ารักษาพยาบาล')}</span></div>
    <div class="co-wcf-feature__screen"><img src="${asset(route, 'src/assets/images/work/wcf-digital/coda/medical-expense-claim-flow-composite.png')}" alt="${text(route, 'Composite illustration of WCF hospital claim screens and a three-step medical expense flow', 'ภาพจัดวางหน้าจอ WCF และขั้นตอนเบิกค่ารักษาพยาบาลสามช่วง')}" width="1492" height="1054" loading="lazy"></div>
  </a>`;
}

function wcfSlider(route) {
  const first = wcfSlides[0];
  const thumbs = wcfSlides.map((slide, index) => `<button class="co-wcf-slider__thumb" type="button" data-wcf-slide="${index}" data-slide-alt="${esc(slide.alt[route.locale])}" aria-label="${esc(text(route, `Show image ${index + 1}: ${slide.alt.en}`, `แสดงภาพ ${index + 1}: ${slide.alt.th}`))}" aria-pressed="${index === 0}"><img src="${asset(route, slide.src)}" alt="" loading="lazy"></button>`).join('');
  return `<div class="co-wcf-slider" data-wcf-slider role="group" aria-label="${text(route, 'WCF Digital project images', 'ภาพผลงาน WCF Digital')}">
    <div class="co-wcf-slider__thumbs" role="group" aria-label="${text(route, 'Choose an image', 'เลือกภาพ')}">${thumbs}</div>
    <div class="co-wcf-slider__stage"><a class="co-wcf-slider__image-link" href="${link(route, 'work-detail', 'wcf-digital')}" aria-label="${text(route, 'Read the WCF Digital case', 'อ่านเคส WCF Digital')}"><img src="${asset(route, first.src)}" alt="${esc(first.alt[route.locale])}" data-wcf-image width="1101" height="842" loading="lazy"></a>
      <button class="co-wcf-slider__arrow co-wcf-slider__arrow--prev" type="button" data-wcf-prev aria-label="${text(route, 'Previous image', 'ภาพก่อนหน้า')}">‹</button>
      <button class="co-wcf-slider__arrow co-wcf-slider__arrow--next" type="button" data-wcf-next aria-label="${text(route, 'Next image', 'ภาพถัดไป')}">›</button>
      <span class="co-wcf-slider__count" aria-live="polite" data-wcf-count>1/${wcfSlides.length}</span>
    </div>
  </div>`;
}

function projectRows(route, home = false) {
  return codaProjects.map((project, i) => {
    const copy = project[route.locale];
    const visual = project.slug === 'rescheduling-pain' ? signalArt(route, true) : `<div class="co-project__image co-project__image--${i}" style="--project-color:${esc(project.color)}"><img src="${asset(route, project.cover.src)}" alt="${esc(project.cover.alt[route.locale])}" loading="lazy"></div>`;
    const media = project.slug === 'wcf-digital' ? `<div class="co-project__visual">${wcfSlider(route)}</div>` : `<a class="co-project__visual" href="${link(route, 'work-detail', project.slug)}" aria-label="${esc(text(route, 'Read ', 'อ่าน ')+copy.title)}">${visual}</a>`;
    const focus = { 'wcf-digital': 'INTERACTION', 'rescheduling-pain': 'DISCOVERY', 'smart-asset-sa-ai': 'SYSTEMS' }[project.slug];
    return `<article class="co-project" data-coda-project="${project.slug}">
      <div class="co-project__meta"><span>${String(i + 1).padStart(2, '0')} / ${esc(copy.title)}</span><span>${esc(project.year)}</span></div>
      <div class="co-project__grid">${media}
        <div class="co-project__copy"><span class="co-kicker">${String(i + 1).padStart(2, '0')} — ${focus}</span><h${home ? '3' : '2'}>${esc(copy.problem)}</h${home ? '3' : '2'}><p>${esc(copy.role)}</p><a class="co-link" href="${link(route, 'work-detail', project.slug)}">${text(route, 'Explore the case', 'อ่านเรื่องนี้')} ${arrow}</a></div>
      </div></article>`;
  }).join('');
}

function home(route) {
  return `<section class="co-collab-hero" aria-labelledby="co-collab-title">
        <figure class="co-collab-hero__art" aria-hidden="true">
      <img src="${asset(route, 'src/assets/images/home/invitracehealth-medical-hero.png')}" alt="" width="1536" height="1024" fetchpriority="high" decoding="async">
    </figure>
    <h1 class="co-collab-hero__title" id="co-collab-title" aria-label="Dhittawat × Invitracehealth"><span class="co-collab-hero__name">Dhittawat</span><span class="co-collab-hero__times" aria-hidden="true">×</span><span class="co-collab-hero__partner">Invitracehealth</span></h1>
</section>
    <section class="co-home-feature co-wrap"><div class="co-hero-project"><div class="co-section-line"><span>${text(route, 'FEATURED CASE / 01', 'เคสเปิดเรื่อง / 01')}</span><a href="${link(route, 'work-detail', 'wcf-digital')}">WCF Digital ${arrow}</a></div>
    ${wcfHero(route)}
    <div class="co-hero-caption"><p>${text(route, 'A billing form existed, but officers still had to finish the work outside the system.', 'มีหน้าจอใบแจ้งหนี้แล้ว แต่เจ้าหน้าที่ยังต้องออกไปทำงานให้จบข้างนอกระบบ')}</p><a class="co-link" href="${link(route, 'work-detail', 'wcf-digital')}">${text(route, 'Read the story', 'อ่านเรื่องนี้')} ${arrow}</a></div></div></section>
    <section class="co-introduction co-wrap" aria-labelledby="co-intro-title"><span class="co-kicker">${text(route, 'THE THREAD THROUGH MY WORK', 'สิ่งที่เชื่อมงานของฉัน')}</span><div><h2 id="co-intro-title">${text(route, 'Helping work move forward.', 'ช่วยให้งานเดินต่อได้')}</h2><p>${text(route, 'I study the work behind a request, map its rules and handoffs, then shape practical interfaces with developers and learn from testing.', 'ฉันศึกษางานจริงที่อยู่หลังคำขอ วางกติกาและจุดส่งต่อ แล้วออกแบบหน้าจอที่ทำงานร่วมกับนักพัฒนาได้ พร้อมนำสิ่งที่พบจากการทดสอบมาปรับต่อ')}</p></div></section>
    <section class="co-selected co-wrap" aria-labelledby="co-selected-title"><div class="co-section-heading"><h2 id="co-selected-title">${text(route, 'Selected work', 'ผลงานที่เลือกมา')}<sup>03</sup></h2><a class="co-link" href="${link(route, 'work-index')}">${text(route, 'View work', 'ดูผลงาน')} ${arrow}</a></div>${projectRows(route, true)}</section>
    ${renderCodaConversation(route, true)}`;
}

function work(route) {
  return `<section class="co-work-intro co-wrap"><span class="co-kicker">${text(route, 'SELECTED WORK / 03 CASES', 'ผลงานที่เลือกมา / 03 เคส')}</span><div class="co-title-row"><h1>${text(route, 'Work', 'ผลงาน')}<span class="co-title-dot">.</span></h1><p>${text(route, 'Research the task. Map the flow and exceptions. Design with the team. Review the result.', 'ศึกษางานจริง วาง flow และข้อยกเว้น ออกแบบร่วมกับทีม แล้วทบทวนผล')}</p></div></section><section class="co-work-list co-wrap" aria-label="${text(route, 'Three selected projects', 'สามผลงานที่เลือกมา')}">${projectRows(route)}</section>`;
}

export function renderCodaPage(route) {
  const titles = {home:'Invitracehealth × Dhittawat', about:text(route,'About Dhittawat','รู้จัก Dhittawat'), 'work-index':text(route,'Selected work','ผลงานที่เลือกมา')};
  const project = codaProjects.find(item => item.slug === route.slug);
  return { active: route.page === 'home' ? 'home' : route.page === 'about' ? 'about' : 'work',
    meta:{title:`${titles[route.page] || project[route.locale].title} — Invitracehealth`, description: project ? project[route.locale].summary : text(route, 'Three product-design case studies by Dhittawat: WCF Digital, Q-CHANG, and PEC Smart Asset.', 'สามเรื่องราวการออกแบบของ Dhittawat: WCF Digital, Q-CHANG และ PEC Smart Asset')},
    body: route.page === 'home' ? home(route) : route.page === 'work-index' ? work(route) : route.page === 'about' ? renderCodaAbout(route) : renderCodaCase(route)
  };
}

export function renderCodaShell({route, meta, body, active}) {
  const alt = alternateCodaRoute(route);
  const alternateHref = relativeHref(route.path, alt.path);
  const nav = [['home','Home'],['about','About'],['work-index','Work']];
  const navLinks = nav.map(([page,label])=>`<a href="${link(route,page)}"${active === (page === 'work-index' ? 'work' : page) ? ' aria-current="page"' : ''}>${label}${label === 'Work' ? '<sup>03</sup>' : ''}</a>`).join('');
  const langLink = `<a class="co-language" data-coda-language href="${alternateHref}" hreflang="${alt.locale}" aria-label="${text(route,'Read this page in Thai','อ่านหน้านี้เป็นภาษาอังกฤษ')}"><span lang="${alt.locale}">${alt.locale.toUpperCase()}</span> ↗</a>`;
  return `<!doctype html><html lang="${route.locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><link rel="icon" href="${asset(route,'/favicon.png')}"><link rel="alternate" hreflang="${alt.locale}" href="${alternateHref}" vite-ignore><link rel="stylesheet" href="${asset(route,'/src/styles/coda.css')}"></head>
  <body class="co-site co-locale-${route.locale}" data-site-menu><a class="co-skip" href="#main-content">${text(route,'Skip to content','ข้ามไปเนื้อหา')}</a>
    <header class="co-header"><a class="co-brand" href="${link(route,'home')}" aria-label="Dhittawat — Home">D<span aria-hidden="true">.</span></a><nav class="co-nav" data-coda-nav aria-label="${text(route,'Primary navigation','เมนูหลัก')}">${navLinks}</nav><div class="co-header-actions">${langLink}<button type="button" class="co-menu-toggle" data-site-menu-toggle aria-controls="co-menu" aria-expanded="false">${text(route,'Menu','เมนู')} +</button></div></header>
    <aside class="co-menu" id="co-menu" role="dialog" aria-modal="true" aria-label="${text(route,'Navigation','เมนูนำทาง')}" aria-hidden="true" inert data-site-menu-panel><div class="co-menu-top"><span>Invitracehealth × Dhittawat</span><button type="button" data-site-menu-close>${text(route,'Close','ปิด')} ×</button></div><nav aria-label="${text(route,'Mobile navigation','เมนูมือถือ')}">${navLinks}</nav></aside>
    <main id="main-content" tabindex="-1">${body}</main>
    <footer class="co-footer co-wrap"><div class="co-footer-top"><a class="co-footer-name" href="${link(route,'home')}">Dhittawat<span>.</span></a><a class="co-link" href="${esc(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ${arrow}</a></div><div class="co-footer-bottom"><span>© 2026 Dhittawat Thongkhum</span><span>${text(route,'Selected work for Invitracehealth','ผลงานที่เลือกมาสำหรับ Invitracehealth')}</span><a href="#main-content">${text(route,'Back to top','กลับด้านบน')} ↑</a></div></footer>
    <script type="module" src="${asset(route,'/src/scripts/coda.js')}"></script></body></html>`;
}
