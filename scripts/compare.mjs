// Renders the home at 1440 wide, scaled to the reference's 924 wide, for side-by-side study.
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
const out = '.impeccable/review/compare'
mkdirSync(out, { recursive: true })
const lang = process.argv[2] || 'en'
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 924 / 1440 })
await p.goto(`http://localhost:5180/?lang=${lang}`, { waitUntil: 'networkidle' })
await p.addStyleTag({ content: '*{scroll-behavior:auto!important}' })
const H = await p.evaluate(() => document.documentElement.scrollHeight)
for (let y = 0; y < H; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(140) }
await p.evaluate(() => { document.querySelectorAll('.reveal').forEach((e) => e.classList.remove('pre')); scrollTo(0, 0) })
await p.waitForTimeout(900)
await p.screenshot({ path: `${out}/ours-${lang}.png`, fullPage: true })
const info = await p.evaluate(() => {
  const r = (sel) => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top + scrollY), Math.round(b.width), Math.round(b.height)] }
  return { height: document.documentElement.scrollHeight, hero: r('section[aria-labelledby=hero-h]'), about: r('section[aria-labelledby=about-h]'), why: r('section[aria-labelledby=why-h]'), prod: r('section[aria-labelledby=prod-h]'), award: r('section[aria-labelledby=award-h]'), footer: r('footer'), overflowX: document.documentElement.scrollWidth - innerWidth }
})
console.log(JSON.stringify(info))
await b.close()
