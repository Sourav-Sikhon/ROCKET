// Captures each carousel slide by pressing its dot: node scripts/slides.mjs
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
const out = '.impeccable/review/slides'
mkdirSync(out, { recursive: true })
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
for (const [label, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  for (const lang of ['en', 'bn']) {
    const p = await b.newPage({ viewport: { width: w, height: h } })
    await p.goto(`http://localhost:5180/?lang=${lang}`, { waitUntil: 'networkidle' })
    await p.waitForTimeout(600)
    // stop rotation so the capture is stable
    await p.locator('button[aria-label*="ause"], button[aria-label*="থামান"]').first().click()
    for (let n = 0; n < 3; n++) {
      await p.locator('button[aria-pressed]').nth(n).click()
      await p.waitForTimeout(1000)
      await p.screenshot({ path: `${out}/${label}-${lang}-${n + 1}.png`, clip: { x: 0, y: 0, width: w, height: label === 'desktop' ? 840 : 820 } })
    }
    await p.close()
  }
}
await b.close()
console.log('done')
