import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import { I18nProvider } from './i18n'
import { startSmoothScroll } from './motion'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Premium from './pages/Premium'
import { ServicesIndex, ServiceDetail } from './pages/Services'
import { OpenAccountPage, BenefitsPage, FindUsPage, SecurityPage, NoticesPage, HelpPage, AboutPage } from './pages/Pages'
import NotFound from './pages/NotFound'

function ScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash.startsWith('#service=')) return
    if (hash) { document.getElementById(hash.slice(1))?.scrollIntoView(); return }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  useEffect(() => startSmoothScroll(), [])
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollReset />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/open-account" element={<OpenAccountPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/find-us" element={<FindUsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </I18nProvider>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
