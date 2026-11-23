// Full-page captures for review: node scripts/capture.mjs [path] [name] [lang]
// Tiles are cut from the full-page image in a canvas, so they never fail on page-height drift.
import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'node:fs'

const path = process.argv[2] || '/'
const name = process.argv[3] || 'home'
const lang = process.argv[4] || 'en'
const out = '.impeccable/review'
mkdirSync(`${out}/tiles`, { recursive: true })

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
for (const [label, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.goto(`http://localhost:5180${path}?lang=${lang}`, { waitUntil: 'networkidle' })
  const H = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < H; y += Math.round(h * 0.7)) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(120) }
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((e) => e.classList.remove('pre'))
    document.querySelectorAll('.w').forEach((e) => e.style.setProperty('opacity', '1', 'important'))
  })
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(900)
  const suffix = name === 'home' && lang === 'en' ? '' : `-${name}${lang === 'bn' ? '-bn' : ''}`
  const buf = await page.screenshot({ fullPage: true })
  writeFileSync(`${out}/${label}${suffix}.png`, buf)
  const tile = label === 'desktop' ? 1700 : 2200
  const tiles = await page.evaluate(async ({ b64, tile }) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode()
    const res = []
    for (let y = 0; y < img.height; y += tile) {
      const hh = Math.min(tile, img.height - y)
      const c = document.createElement('canvas'); c.width = img.width; c.height = hh
      c.getContext('2d').drawImage(img, 0, y, img.width, hh, 0, 0, img.width, hh)
      res.push(c.toDataURL('image/png').split(',')[1])
    }
    return res
  }, { b64: buf.toString('base64'), tile })
  tiles.forEach((t, i) => writeFileSync(`${out}/tiles/${label}${suffix}-${i}.png`, Buffer.from(t, 'base64')))
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  console.log(label, suffix || 'home', 'height', H, 'tiles', tiles.length, 'h-overflow', overflow)
  await page.close()
}
await browser.close()
