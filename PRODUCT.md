# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 18 + Vite + TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger) for scroll storytelling, React Router for real routes. Chosen by the user. No backend; content lives in typed data modules so notices and services can be updated without touching layout.

## Users

- **Everyday Rocket customers across Bangladesh**, urban and rural, many on mid/low-end Android phones and slow connections, with mixed digital literacy. They come to the site to understand a service ("how do I cash out at an ATM?"), find an agent/ATM/branch, check a notice, or get the app.
- **People who are not yet customers**: often unbanked or underbanked. They need to know what Rocket is, that it is a real Dutch-Bangla Bank account, and exactly how to open one.
- **Remitters' families and salary/allowance beneficiaries**, who receive money into Rocket and need to know how to withdraw it.
- Secondary: agents and corporate/government disbursers looking for official guidance and notices.

Bangla is the first language for most users; English must be equally complete.

## Product Purpose

Rocket is the mobile financial service of Dutch-Bangla Bank PLC, launched 31 March 2011 (described on the official site as the country's first mobile financial service). The website must explain what Rocket does, how to open an account, how each service works, where to transact, and how to stay safe, and it must drive people to the Rocket app. Success means visitors find the service or answer they came for in one or two moves, trust what they read, and install the app.

## Positioning

Rocket is **a bank account, not a wallet**. The official "Rocket Model" states it is bank-led, treats customer deposits as balance in a Rocket account like a savings/current account, and exists to bring banking to the unbanked and build a savings habit. It is backed by Dutch-Bangla Bank's branches and ATMs: Rocket customers can withdraw cash at any DBBL ATM using their 12-digit Rocket account number. This bank-backed position is what a wallet-first competitor cannot truthfully claim.

## Operating Context

- Account opening (official): fill the KYC form and give it to an agent with a photograph and National ID; agent enters the mobile number in Customer Registration; the customer gets an IVR call or USSD flash menu and sets a 4-digit PIN; the account number is the mobile number plus one check digit; a confirmation SMS arrives. Registration is also listed in the Rocket app.
- USSD channel: dial `*322#`. Official SMS/IVR senders: 16216, 01190016216, 096667. Customers are told to check the sending number and amount on every SMS.
- App (Google Play, `com.dbbl.mbs.apps.main`, developer Dutch-Bangla Bank, 10M+ downloads): Bangla and English; registration, cash-in, cash-out, top-up, bill pay, merchant pay, P2P, transfers to/from own linked DBBL account, transfers to any DBBL account or debit card, balance/statement/account inquiry, nearest Branch/ATM/Agent/Merchant locator. App home also shows Add Money (from DBBL and other bank VISA/Master/Amex cards and bank accounts), Link A/C Setup, Binimoy, e-Toll, Donation, Pension, Scan QR and My Rocket QR, Bill Pay categories (Education, Electricity, Gas, Water, Govt. Fee, Internet, Insurance, Bank & FI).
- Store Locator categories in-app: Merchant, ATM, Fast Track, Branch.

## Capabilities and Constraints

- Verified services (official site + app): Customer Registration, Cash In, Cash Out, ATM Withdrawal, Mobile Top-up, Send Money (P2P), Bank A/C ↔ Rocket transfer (incl. to DBBL debit card), Add Money from cards, Foreign Remittance (via nominated exchange houses; credited in 24–72 h, 24 h via DBBL Exchange House), Salary & allowance disbursement (corporate and government), Balance / Statement / Account Inquiry, Bill Payment, Merchant Payment, QR (Scan QR, My Rocket QR) as shown in app screenshots.
- **Not verified, must not be published as fact:** transaction fees/charges, cash-out rates, limits (an app screenshot shows one account's limits; this is not published policy), interest, offers, current promotions, "Bangla QR" interoperability, customer care hotline number beyond the SMS/IVR senders, social handles other than those linked from the official page.
- **Outdated on the current site:** references to Citycell (operator shut down in 2016), Banglalink/Citycell/Airtel retail points and Grameenphone Mobicash outlets as registration/cash points, "send an empty SMS to 16216" balance inquiry for Citycell. These are flagged, not republished as current.
- Official documents to keep linked: Awareness PDF, Terminated Agents PDF, Suspicious Closed Agents PDF, English/Bangla brochures.
- No live location database: Find Us is an entry point to the in-app Store Locator / official channels, never fake results.

## Brand Commitments

- Name: **Rocket** (রকেট), "Dutch-Bangla Bank Mobile Banking" (ডাচ্-বাংলা ব্যাংক মোবাইল ব্যাংকিং). Keep the official bilingual wordmark with the paper-plane mark as-is; do not redraw it.
- Brand colour is the app's purple (sampled `#8A288F` from the icon, `#89298D` on app buttons, `#741478` status bar, app background tint `#F7F1F7`).
- The website is an extension of the app; it must never borrow bKash's pink or identity. bKash is a reference for information architecture and site quality only.
- Dutch-Bangla Bank PLC identity appears as the backing institution.

## Evidence on Hand

- `_research/play/icon.png`: official app icon (wordmark on purple).
- `_research/site/mlogo.png`: official purple wordmark from the Rocket site header; `_research/site/logo-footer.png`: DBBL footer logo.
- `_research/play/shot1..7.png`: real app screenshots (login, home/services, Add Money, Store Locator, My Rocket QR, Cash Out, Limits). Shot 7 (Limits) shows one user's account and must not be presented as official limits.
- `_research/site/pages.txt`: verbatim text of all 12 official service pages and the Rocket Model page.
- Awards listed on the official page (titles only, no dates/details confirmed): Digital World 2015 ICT Achievement Award, Best Digital Bank Award, Asian Bankers Award, National Digital Innovation Award, Mobile Money Award, eAsia Award, Computer World (USA) Award.
- Absent and not to be fabricated: testimonials, user counts beyond the Play listing's "10M+ downloads", fees, limits, offers, security certifications.

## Product Principles

1. **Truth over polish.** Every fee, limit, step and claim is official or visibly marked "to be confirmed". A trustworthy bank site never guesses.
2. **One move to the answer.** Every service, location type and notice is reachable from the global nav in one or two clicks, in both languages.
3. **The app is the product.** The site shows the real app and keeps pointing to it; USSD `*322#` stays visible for people without smartphones.
4. **Bank-backed, said plainly.** Lead with what makes Rocket different: a real DBBL account, with DBBL ATMs and branches behind it.
5. **Built for the slowest phone in the village.** Fast, light, readable, motion that never blocks content.

## Accessibility & Inclusion

WCAG 2.2 AA. Full Bangla parity with Bangla-appropriate type metrics. Plain language for low digital literacy. Keyboard-accessible menus and accordions, reduced-motion support, important warnings never conveyed by colour alone, touch targets ≥ 44px.
