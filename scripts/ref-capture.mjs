// Reference capture of the bKash home for layout study only (nothing is copied into the site).
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
const out = '_research/bkash'
mkdirSync(out, { recursive: true })
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('https://www.bkash.com/en', { waitUntil: 'domcontentloaded', timeout: 60000 })
await p.waitForTimeout(3000)
const H = await p.evaluate(() => document.documentElement.scrollHeight)
for (let y = 0; y < H; y += 600) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(250) }
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800)
const tile = 1500
for (let i = 0, y = 0; y < H; i++, y += tile) {
  await p.screenshot({ path: `${out}/t${i}.png`, fullPage: true, clip: { x: 0, y, width: 1440, height: Math.min(tile, H - y) } })
}
console.log('height', H)
await b.close()
