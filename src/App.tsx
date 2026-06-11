import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import { AdSlotBottom, AdSlotInline } from './components/AdSlot'
import Home from './pages/Home'
import JsonFormatter from './tools/JsonFormatter'
import RegexTester from './tools/RegexTester'
import DiffChecker from './tools/DiffChecker'
import Base64Tool from './tools/Base64'
import UrlTool from './tools/UrlTool'
import JwtDecoder from './tools/JwtDecoder'
import HashGenerator from './tools/HashGenerator'
import MarkdownPreview from './tools/MarkdownPreview'
import UuidGenerator from './tools/UuidGenerator'
import ColorConverter from './tools/ColorConverter'
import WorldClock from './tools/WorldClock'
import TimezoneDiff from './tools/TimezoneDiff'
import CronExplainer from './tools/CronExplainer'
import IpLookup from './tools/IpLookup'
import CurrencyConverter from './tools/CurrencyConverter'
import Privacy from './pages/Privacy'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">

      {/* Gradient orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <Sidebar />

      <main className="flex-1 lg:ml-56 p-4 md:p-6 pb-20 lg:pb-28 relative z-10 flex flex-col min-h-screen">
        <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json" element={<JsonFormatter />} />
          <Route path="/regex" element={<RegexTester />} />
          <Route path="/diff" element={<DiffChecker />} />
          <Route path="/base64" element={<Base64Tool />} />
          <Route path="/url" element={<UrlTool />} />
          <Route path="/jwt" element={<JwtDecoder />} />
          <Route path="/hash" element={<HashGenerator />} />
          <Route path="/markdown" element={<MarkdownPreview />} />
          <Route path="/uuid" element={<UuidGenerator />} />
          <Route path="/color" element={<ColorConverter />} />
          <Route path="/worldclock" element={<WorldClock />} />
          <Route path="/timezone" element={<TimezoneDiff />} />
          <Route path="/cron" element={<CronExplainer />} />
          <Route path="/ip" element={<IpLookup />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        </div>
        {/* Ad at the bottom of every page — pushed down by flex-1 above */}
        {!isHome && <AdSlotInline className="h-14 mt-8" />}
      </main>

      <BottomNav />
      <AdSlotBottom />
    </div>
  )
}
