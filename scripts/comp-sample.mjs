// Measures the reference comp: converts webp to png, samples colours, writes 2x crops for study.
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
const out = '_research/reference'
mkdirSync(out, { recursive: true })
const b64 = readFileSync(`${out}/comp.webp`).toString('base64')
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const p = await b.newPage()
await p.setContent('<canvas id=c></canvas>')
const res = await p.evaluate(async (b64) => {
  const img = new Image(); img.src = 'data:image/webp;base64,' + b64; await img.decode()
  const c = document.getElementById('c'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0)
  const hex = (d) => '#' + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')
  const at = (px, py) => hex(x.getImageData(px, py, 1, 1).data)
  // darkest pixel in a bbox, and most saturated dark pixel
  const dark = (x0, y0, x1, y1) => { const d = x.getImageData(x0, y0, x1 - x0, y1 - y0).data; let best = null, bl = 999; for (let i = 0; i < d.length; i += 4) { const l = d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11; if (l < bl) { bl = l; best = [d[i], d[i + 1], d[i + 2]] } } return hex(best) }
  const sat = (x0, y0, x1, y1) => { const d = x.getImageData(x0, y0, x1 - x0, y1 - y0).data; let best = null, bs = -1; for (let i = 0; i < d.length; i += 4) { const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]); const s = (mx - mn) * (1 - mx / 600); if (s > bs) { bs = s; best = [d[i], d[i + 1], d[i + 2]] } } return hex(best) }
  const pts = {
    size: [img.width, img.height],
    headerBg: at(10, 10), heroLeftBg: at(30, 250), heroRightBg: at(880, 60), heroMid: at(480, 300), heroBottomBand: at(30, 420),
    h1Rocket: dark(64, 160, 240, 205), h1Purple: sat(64, 212, 420, 250), body: dark(64, 268, 330, 305), eyebrow: dark(64, 120, 230, 144),
    navText: dark(293, 28, 320, 38), navActive: sat(248, 26, 275, 36), navUnderline: sat(248, 42, 273, 47), loginBtn: at(832, 33),
    btnPrimary: at(80, 346), btnPrimaryEdge: at(66, 346), btnOutlineBorder: sat(226, 345, 232, 349),
    aboutPillBg: at(72, 517), aboutPillText: sat(78, 513, 138, 521), aboutH2: dark(66, 540, 270, 565), aboutBody: dark(66, 615, 300, 628),
    featIconBg: at(656, 553), featIcon: sat(664, 535, 686, 560), featTitle: dark(722, 530, 800, 542), featSub: dark(722, 551, 840, 560),
    whyBg: at(30, 900), whyCard1: at(70, 860), whyCard1b: at(150, 985), whyCard2: at(280, 860), whyTitle: dark(93, 925, 215, 938), whyIcon: sat(137, 868, 175, 905), whyH2Dark: dark(316, 810, 480, 832), whyH2Purple: sat(498, 810, 608, 832),
    keyBenefits: sat(437, 785, 508, 795), prodH2Purple: sat(378, 1055, 598, 1078),
    prod1: at(72, 1110), prod2: at(232, 1110), prod3: at(394, 1110), prod4: at(554, 1110), prod5: at(716, 1110),
    prod1b: at(150, 1220), prodArrowBg: at(39, 1157), dotActive: sat(445, 1250, 452, 1256),
    awardsBg: at(400, 1295), awardsBg2: at(860, 1420), awardsTitle: dark(265, 1348, 430, 1362), awardTrophyGold: sat(125, 1300, 150, 1330),
    footerTop: at(400, 1460), footerMid: at(600, 1540), footerBottom: at(400, 1635), footerBar: at(400, 1670), footerText: at(300, 1497), footerLinkText: at(310, 1522),
  }
  return { pts, w: img.width, h: img.height }
}, b64)
console.log(JSON.stringify(res.pts, null, 1))
// png + 2x crops
const dataUrl = await p.evaluate(() => document.getElementById('c').toDataURL('image/png'))
writeFileSync(`${out}/comp.png`, Buffer.from(dataUrl.split(',')[1], 'base64'))
const crops = { hero: [0, 0, 924, 455], about: [0, 470, 924, 300], why: [0, 770, 924, 240], products: [0, 1020, 924, 245], awards: [0, 1270, 924, 175], footer: [0, 1450, 924, 251] }
for (const [name, [x, y, w, h]] of Object.entries(crops)) {
  const d = await p.evaluate(({ x, y, w, h }) => { const src = document.getElementById('c'); const c2 = document.createElement('canvas'); c2.width = w * 2; c2.height = h * 2; const g = c2.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(src, x, y, w, h, 0, 0, w * 2, h * 2); return c2.toDataURL('image/png') }, { x, y, w, h })
  writeFileSync(`${out}/crop-${name}.png`, Buffer.from(d.split(',')[1], 'base64'))
}
await b.close()
