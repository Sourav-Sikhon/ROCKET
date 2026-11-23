import type { L } from './services'

/** Flip to false for production once DBBL has confirmed every flagged item. */
export const SHOW_CONTENT_FLAGS = true

const R = 'https://www.dutchbanglabank.com/rocket/'
export const links = {
  play: 'https://play.google.com/store/apps/details?id=com.dbbl.mbs.apps.main',
  // TO CONFIRM with DBBL: official App Store listing (Play is the only store verified in project research).
  appStore: 'https://apps.apple.com/bd/search?term=Rocket%20Dutch-Bangla%20Bank',
  dbbl: 'https://www.dutchbanglabank.com',
  dbblContact: 'https://www.dutchbanglabank.com/contact_us/contact_us.html',
  oldRocket: R + 'rocket.html',
  rocketModel: R + 'about.html',
  facebookRocket: 'https://www.facebook.com/TakarRocket',
  facebookDbbl: 'https://www.facebook.com/DutchBanglaBankPLC',
  youtube: 'https://www.youtube.com/c/DutchBanglaBankLimited-DBBL',
  linkedin: 'https://www.linkedin.com/company/dutchbanglabank',
  email: 'ccs.cmc@dutchbanglabank.com',
  awareness: R + 'PDF/Awareness.pdf',
  terminated: R + 'PDF/Terminated_Agents.pdf',
  terminatedSuper: R + 'PDF/Terminated_Super_Agents.pdf',
  suspicious: R + 'PDF/Suspicious_Closed_Agents.pdf',
  brochureEn: R + 'PDF/MobileBankingBrochureEnglish.pdf',
  brochureBn: R + 'PDF/MobileBankingBrochureBangla.pdf',
}

export const officialSenders = ['16216', '01190016216', '096667']

export type Notice = {
  id: string
  tone: 'warning' | 'info' | 'resource'
  title: L
  body: L
  href: string
  kind: 'pdf' | 'page'
}

export const notices: Notice[] = [
  {
    id: 'terminated', tone: 'warning', kind: 'pdf', href: links.terminated,
    title: { en: 'Terminated Agents', bn: 'বাতিলকৃত এজেন্ট' },
    body: { en: 'Agents whose Rocket agreement has ended. Do not transact with them.', bn: 'যেসব এজেন্টের রকেট চুক্তি বাতিল হয়েছে। তাদের সাথে লেনদেন করবেন না।' },
  },
  {
    id: 'suspicious', tone: 'warning', kind: 'pdf', href: links.suspicious,
    title: { en: 'Suspicious Closed Agents', bn: 'সন্দেহজনক কারণে বন্ধ এজেন্ট' },
    body: { en: 'Agent points closed on suspicion of irregular activity.', bn: 'অনিয়মের সন্দেহে বন্ধ করা এজেন্ট পয়েন্ট।' },
  },
  {
    id: 'terminated-super', tone: 'warning', kind: 'pdf', href: links.terminatedSuper,
    title: { en: 'Terminated Super Agents', bn: 'বাতিলকৃত সুপার এজেন্ট' },
    body: { en: 'Super agents no longer authorised by Dutch-Bangla Bank.', bn: 'ডাচ্-বাংলা ব্যাংকের অনুমোদন বাতিল হওয়া সুপার এজেন্ট।' },
  },
  {
    id: 'awareness', tone: 'info', kind: 'pdf', href: links.awareness,
    title: { en: 'Customer Awareness', bn: 'গ্রাহক সচেতনতা' },
    body: { en: 'Official guidance on keeping your Rocket account safe.', bn: 'রকেট অ্যাকাউন্ট নিরাপদ রাখার অফিসিয়াল নির্দেশনা।' },
  },
  {
    id: 'brochure-bn', tone: 'resource', kind: 'pdf', href: links.brochureBn,
    title: { en: 'Rocket brochure (Bangla)', bn: 'রকেট ব্রোশিওর (বাংলা)' },
    body: { en: 'The official product brochure.', bn: 'অফিসিয়াল পণ্য ব্রোশিওর।' },
  },
  {
    id: 'brochure-en', tone: 'resource', kind: 'pdf', href: links.brochureEn,
    title: { en: 'Rocket brochure (English)', bn: 'রকেট ব্রোশিওর (ইংরেজি)' },
    body: { en: 'The official product brochure.', bn: 'অফিসিয়াল পণ্য ব্রোশিওর।' },
  },
]

export const securityRules: { title: L; body: L }[] = [
  {
    title: { en: 'Your PIN is yours alone', bn: 'পিন শুধু আপনার' },
    body: { en: 'Enter your 4-digit PIN only on your own phone. No agent, bank officer or caller ever needs it.', bn: '৪ সংখ্যার পিন শুধু নিজের ফোনে দিন। কোনো এজেন্ট, ব্যাংক কর্মকর্তা বা কলারের এটি কখনো প্রয়োজন হয় না।' },
  },
  {
    title: { en: 'Check who the SMS is from', bn: 'SMS কে পাঠিয়েছে দেখুন' },
    body: { en: 'Official Rocket SMS and IVR calls come only from 16216, 01190016216 or 096667. Check the amount too.', bn: 'রকেটের অফিসিয়াল SMS ও IVR কল আসে শুধু 16216, 01190016216 বা 096667 থেকে। টাকার পরিমাণও মিলিয়ে নিন।' },
  },
  {
    title: { en: 'Three keys, kept apart', bn: 'তিনটি চাবি আলাদা রাখুন' },
    body: { en: 'Money cannot be moved without your phone, your PIN and your check digit together. Keep them apart and never share them.', bn: 'আপনার মোবাইল, পিন ও চেক ডিজিট একসাথে ছাড়া টাকা লেনদেন করা যায় না। এগুলো আলাদা রাখুন, কাউকে দেবেন না।' },
  },
  {
    title: { en: 'Use authorised agents only', bn: 'শুধু অনুমোদিত এজেন্ট' },
    body: { en: 'Check the Terminated and Suspicious Closed agent lists before you transact at an unfamiliar point.', bn: 'অপরিচিত পয়েন্টে লেনদেনের আগে বাতিল ও সন্দেহজনক এজেন্টের তালিকা দেখে নিন।' },
  },
]

export type Faq = { cat: FaqCat; q: L; a: L; confirm?: boolean }
export type FaqCat = 'register' | 'cash' | 'transfer' | 'payments' | 'app' | 'security' | 'account'

export const faqCats: Record<FaqCat, L> = {
  register: { en: 'Account registration', bn: 'অ্যাকাউন্ট নিবন্ধন' },
  cash: { en: 'Cash in & cash out', bn: 'ক্যাশ ইন ও ক্যাশ আউট' },
  transfer: { en: 'Money transfer', bn: 'টাকা পাঠানো' },
  payments: { en: 'Payments', bn: 'পেমেন্ট' },
  app: { en: 'App usage', bn: 'অ্যাপ ব্যবহার' },
  security: { en: 'Security', bn: 'নিরাপত্তা' },
  account: { en: 'Account information', bn: 'অ্যাকাউন্টের তথ্য' },
}

export const faqs: Faq[] = [
  { cat: 'register', q: { en: 'How do I open a Rocket account?', bn: 'কীভাবে রকেট অ্যাকাউন্ট খুলব?' }, a: { en: 'Take a filled-in KYC form, a photograph and your National ID to a Rocket agent. The agent registers your mobile number, you set a 4-digit PIN on the call or menu that appears on your phone, and you receive an SMS with your account number. Registration is also available in the Rocket app.', bn: 'পূরণ করা কেওয়াইসি ফর্ম, ছবি ও জাতীয় পরিচয়পত্র নিয়ে রকেট এজেন্টের কাছে যান। এজেন্ট আপনার মোবাইল নম্বর নিবন্ধন করবেন, ফোনে আসা কল বা মেনুতে আপনি ৪ সংখ্যার পিন দেবেন, এবং অ্যাকাউন্ট নম্বরসহ SMS পাবেন। রকেট অ্যাপেও নিবন্ধন করা যায়।' } },
  { cat: 'register', q: { en: 'What documents do I need?', bn: 'কী কী কাগজ লাগবে?' }, a: { en: 'A completed KYC form, a photograph and your National ID (NID).', bn: 'পূরণ করা কেওয়াইসি ফর্ম, একটি ছবি ও জাতীয় পরিচয়পত্র (এনআইডি)।' } },
  { cat: 'register', q: { en: 'What is my Rocket account number?', bn: 'আমার রকেট অ্যাকাউন্ট নম্বর কী?' }, a: { en: 'Your mobile number plus one check digit, 12 digits in all. Remember your check digit: you need it for ATM withdrawals and transfers.', bn: 'আপনার মোবাইল নম্বরের সাথে একটি চেক ডিজিট, মোট ১২ সংখ্যা। চেক ডিজিট মনে রাখুন: এটিএম থেকে টাকা তোলা ও ট্রান্সফারে এটি লাগে।' } },
  { cat: 'cash', q: { en: 'Where can I cash in or cash out?', bn: 'কোথায় ক্যাশ ইন বা ক্যাশ আউট করা যায়?' }, a: { en: 'At any Dutch-Bangla Bank branch or authorised Rocket agent. You can also cash out at any DBBL ATM.', bn: 'যেকোনো ডাচ্-বাংলা ব্যাংক শাখা বা অনুমোদিত রকেট এজেন্টের কাছে। যেকোনো ডিবিবিএল এটিএম থেকেও ক্যাশ আউট করা যায়।' } },
  { cat: 'cash', q: { en: 'Can I withdraw from an ATM without a card?', bn: 'কার্ড ছাড়া কি এটিএম থেকে টাকা তোলা যায়?' }, a: { en: 'Yes. At any DBBL ATM press Mobile Banking, enter your 12-digit Rocket account number, PIN and amount, then confirm on your phone.', bn: 'হ্যাঁ। যেকোনো ডিবিবিএল এটিএমে মোবাইল ব্যাংকিং চাপুন, ১২ সংখ্যার রকেট অ্যাকাউন্ট নম্বর, পিন ও টাকার পরিমাণ দিন, তারপর ফোনে নিশ্চিত করুন।' } },
  { cat: 'cash', q: { en: 'What does cash out cost?', bn: 'ক্যাশ আউটে কত খরচ?' }, a: { en: 'Charges are set by Dutch-Bangla Bank and can change. Check the current charge in the Rocket app or with DBBL before you transact.', bn: 'চার্জ ডাচ্-বাংলা ব্যাংক নির্ধারণ করে এবং পরিবর্তন হতে পারে। লেনদেনের আগে রকেট অ্যাপে বা ডিবিবিএল থেকে বর্তমান চার্জ দেখে নিন।' }, confirm: true },
  { cat: 'transfer', q: { en: 'How do I send money to another Rocket account?', bn: 'অন্য রকেট অ্যাকাউন্টে কীভাবে টাকা পাঠাব?' }, a: { en: 'Choose Send Money in the app, or dial *322#. Enter the receiver’s Rocket account number and amount, then confirm with your PIN.', bn: 'অ্যাপে সেন্ড মানি বেছে নিন অথবা *322# ডায়াল করুন। প্রাপকের রকেট অ্যাকাউন্ট নম্বর ও টাকার পরিমাণ দিন, তারপর পিন দিয়ে নিশ্চিত করুন।' } },
  { cat: 'transfer', q: { en: 'Can my family abroad send money to my Rocket account?', bn: 'বিদেশে থাকা পরিবার কি আমার রকেটে টাকা পাঠাতে পারবে?' }, a: { en: 'Yes, through exchange houses nominated by Dutch-Bangla Bank and other Bangladeshi banks. They need your name, the bank name (Dutch-Bangla Bank) and your Rocket account number.', bn: 'হ্যাঁ, ডাচ্-বাংলা ব্যাংক ও অন্যান্য বাংলাদেশি ব্যাংকের মনোনীত এক্সচেঞ্জ হাউসের মাধ্যমে। তাদের লাগবে আপনার নাম, ব্যাংকের নাম (ডাচ্-বাংলা ব্যাংক) ও রকেট অ্যাকাউন্ট নম্বর।' } },
  { cat: 'transfer', q: { en: 'Can I move money between Rocket and my bank account?', bn: 'রকেট ও ব্যাংক অ্যাকাউন্টের মধ্যে কি টাকা আনা-নেওয়া করা যায়?' }, a: { en: 'Yes: from a bank account to Rocket, Rocket to a bank account, or to any DBBL debit card. Link your DBBL account once with Link A/C Setup in the app.', bn: 'হ্যাঁ: ব্যাংক থেকে রকেটে, রকেট থেকে ব্যাংকে, অথবা যেকোনো ডিবিবিএল ডেবিট কার্ডে। অ্যাপের লিংক এ/সি সেটআপ দিয়ে একবার ডিবিবিএল অ্যাকাউন্ট লিংক করুন।' } },
  { cat: 'payments', q: { en: 'Which bills can I pay?', bn: 'কোন কোন বিল দেওয়া যায়?' }, a: { en: 'The app lists Education, Electricity, Gas, Water, Govt. Fee, Internet, Insurance and Bank & FI. Available organisations are shown in the app.', bn: 'অ্যাপে শিক্ষা, বিদ্যুৎ, গ্যাস, পানি, সরকারি ফি, ইন্টারনেট, বীমা এবং ব্যাংক ও আর্থিক প্রতিষ্ঠানের বিল আছে। কোন প্রতিষ্ঠান যুক্ত তা অ্যাপে দেখা যায়।' } },
  { cat: 'payments', q: { en: 'How do I pay at a shop?', bn: 'দোকানে কীভাবে পেমেন্ট করব?' }, a: { en: 'At a Dutch-Bangla Bank authorised merchant, use Merchant Pay or Scan QR in the app, or let the merchant start the payment, then confirm with your PIN.', bn: 'ডাচ্-বাংলা ব্যাংক অনুমোদিত মার্চেন্টের কাছে অ্যাপে মার্চেন্ট পে বা স্ক্যান QR ব্যবহার করুন, অথবা মার্চেন্ট পেমেন্ট শুরু করবেন, তারপর পিন দিয়ে নিশ্চিত করুন।' } },
  { cat: 'app', q: { en: 'Is the app available in Bangla?', bn: 'অ্যাপ কি বাংলায় পাওয়া যায়?' }, a: { en: 'Yes. The Rocket app works in both Bangla and English. Switch language from the login screen.', bn: 'হ্যাঁ। রকেট অ্যাপ বাংলা ও ইংরেজি দুই ভাষাতেই চলে। লগইন স্ক্রিন থেকে ভাষা বদলান।' } },
  { cat: 'app', q: { en: 'I don’t have a smartphone. Can I still use Rocket?', bn: 'আমার স্মার্টফোন নেই। তবুও কি রকেট ব্যবহার করতে পারব?' }, a: { en: 'Yes. Dial *322# from any mobile to send money, top up, pay bills, transfer and check your balance.', bn: 'হ্যাঁ। যেকোনো মোবাইল থেকে *322# ডায়াল করে টাকা পাঠানো, রিচার্জ, বিল পরিশোধ, ট্রান্সফার ও ব্যালেন্স দেখা যায়।' } },
  { cat: 'app', q: { en: 'Where do I download the app?', bn: 'অ্যাপ কোথা থেকে ডাউনলোড করব?' }, a: { en: 'From Google Play. Search “Rocket” by Dutch-Bangla Bank, or use the Download App link on this site.', bn: 'গুগল প্লে থেকে। ডাচ্-বাংলা ব্যাংকের “Rocket” খুঁজুন, অথবা এই সাইটের অ্যাপ ডাউনলোড লিংক ব্যবহার করুন।' } },
  { cat: 'security', q: { en: 'Someone called asking for my PIN. What should I do?', bn: 'কেউ ফোন করে পিন চাইছে। কী করব?' }, a: { en: 'Never share it. Dutch-Bangla Bank, Rocket agents and officers never ask for your PIN. Official messages come only from 16216, 01190016216 or 096667.', bn: 'কখনো দেবেন না। ডাচ্-বাংলা ব্যাংক, রকেট এজেন্ট বা কর্মকর্তা কখনো পিন চান না। অফিসিয়াল বার্তা আসে শুধু 16216, 01190016216 বা 096667 থেকে।' } },
  { cat: 'security', q: { en: 'How do I know an agent is genuine?', bn: 'এজেন্ট আসল কিনা কীভাবে বুঝব?' }, a: { en: 'Check the official Terminated Agents and Suspicious Closed Agents lists, and use the Store Locator in the app to find authorised points.', bn: 'অফিসিয়াল বাতিল ও সন্দেহজনক এজেন্টের তালিকা দেখুন এবং অনুমোদিত পয়েন্ট খুঁজতে অ্যাপের স্টোর লোকেটর ব্যবহার করুন।' } },
  { cat: 'account', q: { en: 'How do I check my balance?', bn: 'কীভাবে ব্যালেন্স দেখব?' }, a: { en: 'Tap “Tap for Balance” in the app, or dial *322#, choose 5 and then 1.', bn: 'অ্যাপে “ট্যাপ ফর ব্যালেন্স” চাপুন, অথবা *322# ডায়াল করে ৫, তারপর ১ বেছে নিন।' } },
  { cat: 'account', q: { en: 'What are my transaction limits?', bn: 'আমার লেনদেনের সীমা কত?' }, a: { en: 'Limits are set by Dutch-Bangla Bank. The Rocket app shows the limits that apply to your own account.', bn: 'সীমা ডাচ্-বাংলা ব্যাংক নির্ধারণ করে। আপনার অ্যাকাউন্টের সীমা রকেট অ্যাপে দেখা যায়।' }, confirm: true },
]

export const awards: L[] = [
  { en: 'Digital World ICT Achievement Award 2015', bn: 'ডিজিটাল ওয়ার্ল্ড আইসিটি অ্যাচিভমেন্ট অ্যাওয়ার্ড ২০১৫' },
  { en: 'Best Digital Bank Award', bn: 'বেস্ট ডিজিটাল ব্যাংক অ্যাওয়ার্ড' },
  { en: 'Asian Banker Award', bn: 'এশিয়ান ব্যাংকার অ্যাওয়ার্ড' },
  { en: 'National Digital Innovation Award', bn: 'জাতীয় ডিজিটাল উদ্ভাবন পুরস্কার' },
  { en: 'Mobile Money Award', bn: 'মোবাইল মানি অ্যাওয়ার্ড' },
  { en: 'eAsia Award', bn: 'ই-এশিয়া অ্যাওয়ার্ড' },
  { en: 'Computerworld (USA) Award', bn: 'কম্পিউটারওয়ার্ল্ড (যুক্তরাষ্ট্র) অ্যাওয়ার্ড' },
]
