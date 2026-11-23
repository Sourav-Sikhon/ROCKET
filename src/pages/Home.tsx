import { Hero } from '../sections/Hero'
import { QuickLinks } from '../sections/QuickLinks'
import { About } from '../sections/About'
import { Why } from '../sections/Why'
import { Products } from '../sections/Products'
import { Business } from '../sections/Business'
import { Offers } from '../sections/Offers'
import { GetApp } from '../sections/GetApp'
import { AwardStrip } from '../sections/AwardStrip'
import { useTitle } from './useTitle'

/** Home, built to the approved reference: hero, quick links, about, why choose, products, business, offers, awards, app download, then the footer. */
export default function Home() {
  useTitle({ en: 'Rocket: Dutch-Bangla Bank Mobile Banking', bn: 'রকেট: ডাচ্-বাংলা ব্যাংক মোবাইল ব্যাংকিং' }, true)
  return (
    <>
      <Hero />
      <QuickLinks />
      <About />
      <Why />
      <Products />
      <Business />
      <Offers />
      <AwardStrip />
      <GetApp />
    </>
  )
}
