// All service content is taken from the official Rocket pages
// (dutchbanglabank.com/rocket/*.html) and the Google Play listing.
// Nothing here states a fee, limit, rate or offer: those are
// deliberately left to official channels. `confirm` marks text the
// bank must re-verify before launch.

export type L = { en: string; bn: string }
export type Category = 'transfer' | 'cash' | 'payments' | 'banking'

export type Service = {
  slug: string
  category: Category
  icon: IconName
  name: L
  short: L
  intro: L
  steps: L[]
  channels: L[]
  notes?: L[]
  confirm?: L
  screen: AppScreen
  related: string[]
  featured?: boolean
}

export type IconName =
  | 'cashin' | 'cashout' | 'atm' | 'send' | 'bank' | 'globe'
  | 'salary' | 'balance' | 'bill' | 'shop' | 'topup' | 'qr'

export type AppScreen = 'home' | 'cash-out' | 'add-money' | 'my-qr' | 'store-locator' | 'login'

export const appScreens: Record<AppScreen, { src: string; alt: L }> = {
  home: { src: '/app/home.png', alt: { en: 'Rocket app home screen showing services: Send Money, Mobile Recharge, Cash Out, Merchant Pay, Add Money, Bill Pay, Bank Transfer and more', bn: 'রকেট অ্যাপের হোম স্ক্রিন: সেন্ড মানি, মোবাইল রিচার্জ, ক্যাশ আউট, মার্চেন্ট পে, অ্যাড মানি, বিল পে, ব্যাংক ট্রান্সফার ইত্যাদি' } },
  'cash-out': { src: '/app/cash-out.png', alt: { en: 'Rocket app Cash Out screen: scan the agent QR or enter agent mobile or account number', bn: 'রকেট অ্যাপের ক্যাশ আউট স্ক্রিন: এজেন্টের QR স্ক্যান করুন অথবা এজেন্টের মোবাইল/অ্যাকাউন্ট নম্বর দিন' } },
  'add-money': { src: '/app/add-money.png', alt: { en: 'Rocket app Add Money screen: from DBBL linked account or cards, or from other bank cards and accounts', bn: 'রকেট অ্যাপের অ্যাড মানি স্ক্রিন: ডিবিবিএল লিংকড অ্যাকাউন্ট/কার্ড অথবা অন্য ব্যাংকের কার্ড ও অ্যাকাউন্ট থেকে' } },
  'my-qr': { src: '/app/my-qr.png', alt: { en: 'Rocket app My Rocket QR screen showing a personal QR code', bn: 'রকেট অ্যাপের মাই রকেট QR স্ক্রিন' } },
  'store-locator': { src: '/app/store-locator.png', alt: { en: 'Rocket app Store Locator showing nearby DBBL branches on a map with Merchant, ATM, Fast Track and Branch tabs', bn: 'রকেট অ্যাপের স্টোর লোকেটর: ম্যাপে কাছের ডিবিবিএল শাখা, মার্চেন্ট, এটিএম ও ফাস্ট ট্র্যাক' } },
  login: { src: '/app/login.png', alt: { en: 'Rocket app login screen with PIN entry, Bangla language switch, Store Locator and Help & Support', bn: 'রকেট অ্যাপের লগইন স্ক্রিন: পিন, বাংলা ভাষা, স্টোর লোকেটর ও হেল্প অ্যান্ড সাপোর্ট' } },
}

export const categories: Record<Category, { name: L; blurb: L }> = {
  transfer: { name: { en: 'Money Transfer', bn: 'টাকা পাঠানো' }, blurb: { en: 'Between Rocket accounts, banks and from abroad', bn: 'রকেট অ্যাকাউন্ট, ব্যাংক ও বিদেশ থেকে' } },
  cash: { name: { en: 'Cash Services', bn: 'ক্যাশ সেবা' }, blurb: { en: 'Put cash in, take cash out', bn: 'টাকা জমা ও উত্তোলন' } },
  payments: { name: { en: 'Payments', bn: 'পেমেন্ট' }, blurb: { en: 'Shops, bills, top-up and QR', bn: 'দোকান, বিল, টপ-আপ ও QR' } },
  banking: { name: { en: 'Banking Services', bn: 'ব্যাংকিং সেবা' }, blurb: { en: 'Balance, statements and disbursement', bn: 'ব্যালেন্স, স্টেটমেন্ট ও বেতন বিতরণ' } },
}

const USSD: L = { en: 'Dial *322# from your mobile', bn: 'মোবাইল থেকে *322# ডায়াল করুন' }
const APP: L = { en: 'Rocket app (Android)', bn: 'রকেট অ্যাপ (অ্যান্ড্রয়েড)' }

export const services: Service[] = [
  {
    slug: 'cash-in', category: 'cash', icon: 'cashin', featured: true, screen: 'add-money',
    name: { en: 'Cash In', bn: 'ক্যাশ ইন' },
    short: { en: 'Deposit cash into your Rocket account at a branch or authorised agent.', bn: 'শাখা বা অনুমোদিত এজেন্টের কাছে আপনার রকেট অ্যাকাউন্টে টাকা জমা দিন।' },
    intro: { en: 'Put cash into your Rocket account at any Dutch-Bangla Bank branch or a DBBL-nominated agent. In the app you can also Add Money from a linked DBBL account or supported cards.', bn: 'যেকোনো ডাচ্-বাংলা ব্যাংক শাখা বা ডিবিবিএল মনোনীত এজেন্টের কাছে রকেট অ্যাকাউন্টে টাকা জমা দিন। অ্যাপে লিংকড ডিবিবিএল অ্যাকাউন্ট বা সমর্থিত কার্ড থেকেও অ্যাড মানি করা যায়।' },
    steps: [
      { en: 'Hand the cash to the agent.', bn: 'এজেন্টের হাতে টাকা দিন।' },
      { en: 'The agent starts the deposit from their mobile.', bn: 'এজেন্ট তার মোবাইল থেকে লেনদেন শুরু করবেন।' },
      { en: 'The agent gives you a receipt.', bn: 'এজেন্ট আপনাকে একটি রসিদ দেবেন।' },
      { en: 'You receive an SMS. Check the sender number and the amount.', bn: 'আপনি একটি SMS পাবেন। প্রেরকের নম্বর ও টাকার পরিমাণ মিলিয়ে নিন।' },
    ],
    channels: [{ en: 'DBBL branch', bn: 'ডিবিবিএল শাখা' }, { en: 'Authorised Rocket agent', bn: 'অনুমোদিত রকেট এজেন্ট' }, { en: 'Add Money in the app (linked DBBL account, VISA, Mastercard, Amex, other bank account)', bn: 'অ্যাপে অ্যাড মানি (লিংকড ডিবিবিএল অ্যাকাউন্ট, ভিসা, মাস্টারকার্ড, অ্যামেক্স, অন্য ব্যাংক অ্যাকাউন্ট)' }],
    notes: [{ en: 'Official SMS and IVR calls come only from 16216, 01190016216 or 096667.', bn: 'অফিসিয়াল SMS ও IVR কল আসে শুধুমাত্র 16216, 01190016216 বা 096667 থেকে।' }],
    confirm: { en: 'The current official page also lists Banglalink, Citycell and Airtel retail points and Grameenphone Mobicash outlets. Citycell closed in 2016; the list of third-party cash points needs confirmation from DBBL.', bn: 'বর্তমান অফিসিয়াল পেজে বাংলালিংক, সিটিসেল ও এয়ারটেল রিটেইল পয়েন্ট এবং গ্রামীণফোন মোবিক্যাশ আউটলেটের উল্লেখ আছে। সিটিসেল ২০১৬ সালে বন্ধ হয়েছে; তৃতীয় পক্ষের ক্যাশ পয়েন্টের তালিকা ডিবিবিএল থেকে নিশ্চিত করা প্রয়োজন।' },
    related: ['cash-out', 'bank-transfer', 'atm-withdrawal'],
  },
  {
    slug: 'cash-out', category: 'cash', icon: 'cashout', featured: true, screen: 'cash-out',
    name: { en: 'Cash Out', bn: 'ক্যাশ আউট' },
    short: { en: 'Withdraw cash from an agent, a DBBL branch or a DBBL ATM.', bn: 'এজেন্ট, ডিবিবিএল শাখা বা ডিবিবিএল এটিএম থেকে টাকা তুলুন।' },
    intro: { en: 'Withdraw from your Rocket account at any Dutch-Bangla Bank branch or ATM, or at a DBBL-authorised agent. In the app, scan the agent’s QR or enter the agent’s mobile or account number.', bn: 'যেকোনো ডাচ্-বাংলা ব্যাংক শাখা, এটিএম বা ডিবিবিএল অনুমোদিত এজেন্টের কাছ থেকে রকেট অ্যাকাউন্টের টাকা তুলুন। অ্যাপে এজেন্টের QR স্ক্যান করুন অথবা এজেন্টের মোবাইল বা অ্যাকাউন্ট নম্বর দিন।' },
    steps: [
      { en: 'Tell the agent how much you want to withdraw.', bn: 'কত টাকা তুলতে চান এজেন্টকে বলুন।' },
      { en: 'The agent starts the transaction from their mobile.', bn: 'এজেন্ট তার মোবাইল থেকে লেনদেন শুরু করবেন।' },
      { en: 'You get a USSD flash menu or IVR call confirming the amount. Enter your 4-digit PIN yourself.', bn: 'টাকার পরিমাণ নিশ্চিত করে আপনার মোবাইলে USSD ফ্ল্যাশ মেনু বা IVR কল আসবে। নিজের ৪ সংখ্যার পিন নিজেই দিন।' },
      { en: 'You receive an SMS, then the agent hands you the cash.', bn: 'SMS আসার পর এজেন্ট আপনাকে টাকা দেবেন।' },
    ],
    channels: [{ en: 'Authorised Rocket agent', bn: 'অনুমোদিত রকেট এজেন্ট' }, { en: 'DBBL branch', bn: 'ডিবিবিএল শাখা' }, { en: 'Any DBBL ATM', bn: 'যেকোনো ডিবিবিএল এটিএম' }, APP],
    notes: [{ en: 'Never tell your PIN to the agent. You enter it on your own phone.', bn: 'এজেন্টকে কখনো পিন বলবেন না। পিন আপনি নিজের ফোনে দেবেন।' }],
    confirm: { en: 'Cash-out charges are not published on this site. Show the official charge from DBBL before launch.', bn: 'ক্যাশ আউট চার্জ এই সাইটে প্রকাশিত নয়। লঞ্চের আগে ডিবিবিএল থেকে অফিসিয়াল চার্জ যুক্ত করতে হবে।' },
    related: ['atm-withdrawal', 'cash-in', 'send-money'],
  },
  {
    slug: 'atm-withdrawal', category: 'cash', icon: 'atm', featured: true, screen: 'store-locator',
    name: { en: 'ATM Withdrawal', bn: 'এটিএম থেকে উত্তোলন' },
    short: { en: 'Take cash from any Dutch-Bangla Bank ATM, no card needed.', bn: 'কার্ড ছাড়াই যেকোনো ডাচ্-বাংলা ব্যাংক এটিএম থেকে টাকা তুলুন।' },
    intro: { en: 'Rocket is backed by Dutch-Bangla Bank’s ATM network. Withdraw at any DBBL ATM using your 12-digit Rocket account number and PIN, with no card required.', bn: 'রকেটের পেছনে আছে ডাচ্-বাংলা ব্যাংকের এটিএম নেটওয়ার্ক। ১২ সংখ্যার রকেট অ্যাকাউন্ট নম্বর ও পিন দিয়ে কার্ড ছাড়াই যেকোনো ডিবিবিএল এটিএম থেকে টাকা তুলুন।' },
    steps: [
      { en: 'At a DBBL ATM, press the Mobile Banking button.', bn: 'ডিবিবিএল এটিএমে মোবাইল ব্যাংকিং বাটন চাপুন।' },
      { en: 'Type your 12-digit Rocket account number and confirm it.', bn: '১২ সংখ্যার রকেট অ্যাকাউন্ট নম্বর লিখে নিশ্চিত করুন।' },
      { en: 'Enter your 4-digit PIN, then the amount.', bn: '৪ সংখ্যার পিন দিন, তারপর টাকার পরিমাণ।' },
      { en: 'Confirm the USSD push or IVR call on your phone with your PIN, then collect the cash.', bn: 'ফোনে আসা USSD পুশ বা IVR কলে পিন দিয়ে নিশ্চিত করুন, তারপর টাকা নিন।' },
    ],
    channels: [{ en: 'Any Dutch-Bangla Bank ATM', bn: 'যেকোনো ডাচ্-বাংলা ব্যাংক এটিএম' }],
    related: ['cash-out', 'balance-statement', 'salary-disbursement'],
  },
  {
    slug: 'send-money', category: 'transfer', icon: 'send', featured: true, screen: 'home',
    name: { en: 'Send Money', bn: 'সেন্ড মানি' },
    short: { en: 'Transfer money from your Rocket account to any other Rocket account.', bn: 'আপনার রকেট অ্যাকাউন্ট থেকে অন্য যেকোনো রকেট অ্যাকাউন্টে টাকা পাঠান।' },
    intro: { en: 'Person-to-person (P2P) transfer moves money from one Rocket account to another, from the app or by dialling *322#.', bn: 'পারসন-টু-পারসন (P2P) ট্রান্সফারে অ্যাপ থেকে অথবা *322# ডায়াল করে এক রকেট অ্যাকাউন্ট থেকে অন্য রকেট অ্যাকাউন্টে টাকা পাঠানো যায়।' },
    steps: [
      { en: 'Open the Rocket app and choose Send Money, or dial *322# and choose option 2.', bn: 'রকেট অ্যাপে সেন্ড মানি বেছে নিন, অথবা *322# ডায়াল করে অপশন ২ বেছে নিন।' },
      { en: 'Enter the receiver’s Rocket account number.', bn: 'প্রাপকের রকেট অ্যাকাউন্ট নম্বর দিন।' },
      { en: 'Enter the amount and confirm with your PIN.', bn: 'টাকার পরিমাণ দিন এবং পিন দিয়ে নিশ্চিত করুন।' },
      { en: 'You and the receiver both get a confirmation SMS.', bn: 'আপনি ও প্রাপক দুজনেই নিশ্চিতকরণ SMS পাবেন।' },
    ],
    channels: [APP, USSD],
    confirm: { en: 'Menu option numbers come from the official USSD guide and may have changed.', bn: 'মেনু অপশন নম্বরগুলো অফিসিয়াল USSD নির্দেশিকা থেকে নেওয়া; পরিবর্তিত হয়ে থাকতে পারে।' },
    related: ['bank-transfer', 'cash-out', 'mobile-top-up'],
  },
  {
    slug: 'mobile-top-up', category: 'payments', icon: 'topup', featured: true, screen: 'home',
    name: { en: 'Mobile Top-up', bn: 'মোবাইল রিচার্জ' },
    short: { en: 'Recharge your own number or anyone else’s.', bn: 'নিজের বা অন্য যেকোনো নম্বরে রিচার্জ করুন।' },
    intro: { en: 'Recharge your own mobile number or someone else’s straight from your Rocket account, using Mobile Recharge in the app or *322#.', bn: 'অ্যাপের মোবাইল রিচার্জ অথবা *322# ব্যবহার করে সরাসরি রকেট অ্যাকাউন্ট থেকে নিজের বা অন্যের নম্বরে রিচার্জ করুন।' },
    steps: [
      { en: 'Open Mobile Recharge in the app, or dial *322# and choose option 3.', bn: 'অ্যাপে মোবাইল রিচার্জ খুলুন, অথবা *322# ডায়াল করে অপশন ৩ বেছে নিন।' },
      { en: 'Enter the mobile number and amount.', bn: 'মোবাইল নম্বর ও টাকার পরিমাণ দিন।' },
      { en: 'Confirm with your PIN.', bn: 'পিন দিয়ে নিশ্চিত করুন।' },
    ],
    channels: [APP, USSD],
    confirm: { en: 'Supported operators must be confirmed. The official page still names Banglalink, Citycell and Robi only.', bn: 'সমর্থিত অপারেটর নিশ্চিত করা প্রয়োজন। অফিসিয়াল পেজে এখনো শুধু বাংলালিংক, সিটিসেল ও রবির নাম আছে।' },
    related: ['bill-payment', 'send-money', 'merchant-payment'],
  },
  {
    slug: 'bill-payment', category: 'payments', icon: 'bill', featured: true, screen: 'home',
    name: { en: 'Bill Payment', bn: 'বিল পেমেন্ট' },
    short: { en: 'Pay electricity, gas, water, internet, education and more.', bn: 'বিদ্যুৎ, গ্যাস, পানি, ইন্টারনেট, শিক্ষা ও আরও অনেক বিল দিন।' },
    intro: { en: 'Pay bills of participating organisations from your Rocket account. The app groups them by Education, Electricity, Gas, Water, Govt. Fee, Internet, Insurance and Bank & FI.', bn: 'অংশগ্রহণকারী প্রতিষ্ঠানের বিল রকেট অ্যাকাউন্ট থেকে দিন। অ্যাপে বিলগুলো শিক্ষা, বিদ্যুৎ, গ্যাস, পানি, সরকারি ফি, ইন্টারনেট, বীমা এবং ব্যাংক ও আর্থিক প্রতিষ্ঠান অনুযায়ী সাজানো।' },
    steps: [
      { en: 'Open Bill Pay in the app, or dial *322# and choose option 1.', bn: 'অ্যাপে বিল পে খুলুন, অথবা *322# ডায়াল করে অপশন ১ বেছে নিন।' },
      { en: 'Choose the bill type and organisation.', bn: 'বিলের ধরন ও প্রতিষ্ঠান বেছে নিন।' },
      { en: 'Enter the bill or account number and confirm with your PIN.', bn: 'বিল বা অ্যাকাউন্ট নম্বর দিন এবং পিন দিয়ে নিশ্চিত করুন।' },
    ],
    channels: [APP, USSD],
    related: ['mobile-top-up', 'merchant-payment', 'qr-payment'],
  },
  {
    slug: 'merchant-payment', category: 'payments', icon: 'shop', featured: true, screen: 'home',
    name: { en: 'Merchant Payment', bn: 'মার্চেন্ট পেমেন্ট' },
    short: { en: 'Pay at Dutch-Bangla Bank authorised shops from your Rocket account.', bn: 'ডাচ্-বাংলা ব্যাংক অনুমোদিত দোকানে রকেট অ্যাকাউন্ট থেকে পেমেন্ট করুন।' },
    intro: { en: 'When you shop at a Dutch-Bangla Bank authorised merchant, pay from your Rocket account. Use Merchant Pay in the app or let the merchant start the payment.', bn: 'ডাচ্-বাংলা ব্যাংক অনুমোদিত মার্চেন্টের কাছে কেনাকাটায় রকেট অ্যাকাউন্ট থেকে পেমেন্ট করুন: অ্যাপে মার্চেন্ট পে অথবা মার্চেন্টের মাধ্যমে।' },
    steps: [
      { en: 'The merchant starts the transaction, or you use Merchant Pay or Scan QR in the app.', bn: 'মার্চেন্ট লেনদেন শুরু করবেন, অথবা আপনি অ্যাপে মার্চেন্ট পে বা স্ক্যান QR ব্যবহার করবেন।' },
      { en: 'Confirm the payment with your PIN.', bn: 'পিন দিয়ে পেমেন্ট নিশ্চিত করুন।' },
      { en: 'You receive an SMS. Check the sender and the amount. The merchant gives you a receipt.', bn: 'SMS আসবে: প্রেরক ও টাকার পরিমাণ মিলিয়ে নিন। মার্চেন্ট রসিদ দেবেন।' },
    ],
    channels: [APP, { en: 'At the merchant’s counter', bn: 'মার্চেন্টের কাউন্টারে' }],
    related: ['qr-payment', 'bill-payment', 'cash-in'],
  },
  {
    slug: 'bank-transfer', category: 'transfer', icon: 'bank', featured: true, screen: 'add-money',
    name: { en: 'Bank Transfer', bn: 'ব্যাংক ট্রান্সফার' },
    short: { en: 'Move money between Rocket and your DBBL account or debit card.', bn: 'রকেট ও আপনার ডিবিবিএল অ্যাকাউন্ট বা ডেবিট কার্ডের মধ্যে টাকা আনা-নেওয়া করুন।' },
    intro: { en: 'Transfer from a bank account to Rocket, from Rocket to a bank account, or to any DBBL debit card. The app also supports transfers to and from your own linked DBBL account and to any DBBL core banking account.', bn: 'ব্যাংক অ্যাকাউন্ট থেকে রকেটে, রকেট থেকে ব্যাংক অ্যাকাউন্টে অথবা যেকোনো ডিবিবিএল ডেবিট কার্ডে টাকা পাঠান। অ্যাপে নিজের লিংকড ডিবিবিএল অ্যাকাউন্ট ও যেকোনো ডিবিবিএল কোর ব্যাংকিং অ্যাকাউন্টে ট্রান্সফারও করা যায়।' },
    steps: [
      { en: 'Set up your linked account once with Link A/C Setup in the app.', bn: 'অ্যাপের লিংক এ/সি সেটআপ দিয়ে একবার আপনার অ্যাকাউন্ট লিংক করুন।' },
      { en: 'Choose Bank Transfer or Add Money, or dial *322# and choose option 4.', bn: 'ব্যাংক ট্রান্সফার বা অ্যাড মানি বেছে নিন, অথবা *322# ডায়াল করে অপশন ৪ বেছে নিন।' },
      { en: 'Pick the direction and account, enter the amount, and confirm with your PIN.', bn: 'দিক ও অ্যাকাউন্ট বেছে নিন, টাকার পরিমাণ দিন, পিন দিয়ে নিশ্চিত করুন।' },
    ],
    channels: [APP, USSD],
    related: ['send-money', 'cash-in', 'balance-statement'],
  },
  {
    slug: 'foreign-remittance', category: 'transfer', icon: 'globe', screen: 'home',
    name: { en: 'Foreign Remittance', bn: 'বৈদেশিক রেমিট্যান্স' },
    short: { en: 'Receive money from abroad through nominated exchange houses.', bn: 'মনোনীত এক্সচেঞ্জ হাউসের মাধ্যমে বিদেশ থেকে টাকা গ্রহণ করুন।' },
    intro: { en: 'Family abroad can send remittance through exchange houses nominated by Dutch-Bangla Bank and other Bangladeshi banks worldwide. It arrives in your Rocket account and you get an SMS when it is credited.', bn: 'বিদেশে থাকা পরিবার ডাচ্-বাংলা ব্যাংক ও অন্যান্য বাংলাদেশি ব্যাংকের মনোনীত এক্সচেঞ্জ হাউসের মাধ্যমে রেমিট্যান্স পাঠাতে পারেন। টাকা আপনার রকেট অ্যাকাউন্টে জমা হলে SMS পাবেন।' },
    steps: [
      { en: 'The sender visits a nominated exchange house abroad.', bn: 'প্রেরক বিদেশে একটি মনোনীত এক্সচেঞ্জ হাউসে যাবেন।' },
      { en: 'They give the amount, your name, bank name (Dutch-Bangla Bank) and your Rocket account number.', bn: 'তিনি টাকার পরিমাণ, আপনার নাম, ব্যাংকের নাম (ডাচ্-বাংলা ব্যাংক) ও আপনার রকেট অ্যাকাউন্ট নম্বর দেবেন।' },
      { en: 'The money reaches your Rocket account within 24–72 hours (24 hours through a DBBL Exchange House).', bn: 'টাকা ২৪–৭২ ঘণ্টার মধ্যে রকেট অ্যাকাউন্টে পৌঁছাবে (ডিবিবিএল এক্সচেঞ্জ হাউসের মাধ্যমে ২৪ ঘণ্টা)।' },
      { en: 'You get an SMS and can cash out at an agent, branch or ATM.', bn: 'আপনি SMS পাবেন এবং এজেন্ট, শাখা বা এটিএম থেকে টাকা তুলতে পারবেন।' },
    ],
    channels: [{ en: 'Nominated exchange houses abroad', bn: 'বিদেশে মনোনীত এক্সচেঞ্জ হাউস' }],
    confirm: { en: 'Delivery times are quoted from the official page and should be reconfirmed.', bn: 'সময়সীমা অফিসিয়াল পেজ থেকে নেওয়া; পুনরায় নিশ্চিত করা প্রয়োজন।' },
    related: ['cash-out', 'atm-withdrawal', 'send-money'],
  },
  {
    slug: 'salary-disbursement', category: 'banking', icon: 'salary', screen: 'home',
    name: { en: 'Salary & Allowance Disbursement', bn: 'বেতন ও ভাতা বিতরণ' },
    short: { en: 'Employers and government pay salaries and allowances straight into Rocket.', bn: 'নিয়োগকর্তা ও সরকার সরাসরি রকেটে বেতন ও ভাতা দেয়।' },
    intro: { en: 'Corporate offices pay employee salaries, and government pays allowances such as elderly and freedom-fighter allowances, directly into beneficiaries’ Rocket accounts in one batch.', bn: 'কর্পোরেট অফিস কর্মীদের বেতন এবং সরকার বয়স্ক ভাতা ও মুক্তিযোদ্ধা ভাতার মতো ভাতা এক ব্যাচে সরাসরি উপকারভোগীর রকেট অ্যাকাউন্টে পাঠায়।' },
    steps: [
      { en: 'The organisation sends DBBL the list of Rocket account numbers (with check digit) and amounts.', bn: 'প্রতিষ্ঠান ডিবিবিএলকে রকেট অ্যাকাউন্ট নম্বর (চেক ডিজিটসহ) ও টাকার তালিকা পাঠায়।' },
      { en: 'DBBL credits every account centrally in one batch.', bn: 'ডিবিবিএল এক ব্যাচে কেন্দ্রীয়ভাবে সব অ্যাকাউন্টে টাকা জমা করে।' },
      { en: 'Each person gets an SMS confirmation.', bn: 'প্রত্যেকে SMS নিশ্চিতকরণ পান।' },
      { en: 'Withdraw at any agent, DBBL ATM or DBBL branch.', bn: 'যেকোনো এজেন্ট, ডিবিবিএল এটিএম বা শাখা থেকে টাকা তুলুন।' },
    ],
    channels: [{ en: 'For organisations: contact Dutch-Bangla Bank', bn: 'প্রতিষ্ঠানের জন্য: ডাচ্-বাংলা ব্যাংকে যোগাযোগ করুন' }],
    related: ['atm-withdrawal', 'cash-out', 'balance-statement'],
  },
  {
    slug: 'balance-statement', category: 'banking', icon: 'balance', screen: 'home',
    name: { en: 'Balance & Statement Inquiry', bn: 'ব্যালেন্স ও স্টেটমেন্ট' },
    short: { en: 'Check your balance, recent transactions and account details.', bn: 'ব্যালেন্স, সাম্প্রতিক লেনদেন ও অ্যাকাউন্টের তথ্য দেখুন।' },
    intro: { en: 'See your Rocket balance any time with Tap for Balance in the app. The app also offers Statement Inquiry and Account Inquiry. Without a smartphone, use *322#.', bn: 'অ্যাপে ট্যাপ ফর ব্যালেন্স দিয়ে যেকোনো সময় রকেট ব্যালেন্স দেখুন। অ্যাপে স্টেটমেন্ট ও অ্যাকাউন্ট ইনকোয়ারিও আছে। স্মার্টফোন না থাকলে *322# ব্যবহার করুন।' },
    steps: [
      { en: 'In the app, tap Tap for Balance on the home screen.', bn: 'অ্যাপের হোম স্ক্রিনে ট্যাপ ফর ব্যালেন্সে চাপুন।' },
      { en: 'Or dial *322#, choose option 5, then option 1.', bn: 'অথবা *322# ডায়াল করে অপশন ৫, তারপর অপশন ১ বেছে নিন।' },
      { en: 'Enter your PIN to view the result.', bn: 'ফলাফল দেখতে পিন দিন।' },
    ],
    channels: [APP, USSD],
    confirm: { en: 'Any statement inquiry charge must be confirmed by DBBL.', bn: 'স্টেটমেন্ট ইনকোয়ারির কোনো চার্জ থাকলে ডিবিবিএল থেকে নিশ্চিত করতে হবে।' },
    related: ['bank-transfer', 'send-money', 'cash-in'],
  },
  {
    slug: 'qr-payment', category: 'payments', icon: 'qr', screen: 'my-qr',
    name: { en: 'QR Payment', bn: 'QR পেমেন্ট' },
    short: { en: 'Scan to pay or cash out, and share your own Rocket QR.', bn: 'স্ক্যান করে পেমেন্ট বা ক্যাশ আউট করুন, নিজের রকেট QR শেয়ার করুন।' },
    intro: { en: 'The Rocket app has Scan QR at the centre of its home screen and a personal My Rocket QR, so you can pay or cash out without typing numbers.', bn: 'রকেট অ্যাপের হোম স্ক্রিনের মাঝখানে স্ক্যান QR এবং নিজস্ব মাই রকেট QR আছে, তাই নম্বর না লিখেই পেমেন্ট বা ক্যাশ আউট করা যায়।' },
    steps: [
      { en: 'Tap Scan QR at the bottom of the app’s home screen.', bn: 'অ্যাপের হোম স্ক্রিনের নিচে স্ক্যান QR চাপুন।' },
      { en: 'Point the camera at the merchant’s or agent’s QR code.', bn: 'মার্চেন্ট বা এজেন্টের QR কোডের দিকে ক্যামেরা ধরুন।' },
      { en: 'Check the name and amount, then confirm with your PIN.', bn: 'নাম ও টাকার পরিমাণ মিলিয়ে পিন দিয়ে নিশ্চিত করুন।' },
    ],
    channels: [APP],
    confirm: { en: 'Interoperable Bangla QR acceptance is not confirmed on official Rocket pages yet.', bn: 'ইন্টারঅপারেবল বাংলা QR গ্রহণযোগ্যতা এখনো অফিসিয়াল রকেট পেজে নিশ্চিত নয়।' },
    related: ['merchant-payment', 'cash-out', 'bill-payment'],
  },
]

export const bySlug = (slug: string) => services.find((s) => s.slug === slug)
