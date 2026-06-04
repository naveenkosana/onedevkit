import { useState, useMemo } from 'react'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  if (full.length !== 6) return null
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hexToTailwind(hex: string) {
  const tailwindColors: Record<string, string> = {
    '#ef4444': 'red-500', '#3b82f6': 'blue-500', '#22c55e': 'green-500',
    '#f59e0b': 'amber-500', '#8b5cf6': 'violet-500', '#ec4899': 'pink-500',
    '#06b6d4': 'cyan-500', '#f97316': 'orange-500', '#6366f1': 'indigo-500',
    '#14b8a6': 'teal-500', '#ffffff': 'white', '#000000': 'black',
    '#6b7280': 'gray-500', '#1f2937': 'gray-800', '#f9fafb': 'gray-50',
  }
  return tailwindColors[hex.toLowerCase()] ?? null
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [pickerHex, setPickerHex] = useState('#6366f1')

  function syncFromPicker(val: string) {
    setPickerHex(val)
    setHex(val)
  }

  function syncFromInput(val: string) {
    setHex(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setPickerHex(val)
  }

  const info = useMemo(() => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const tw = hexToTailwind(hex)
    return { rgb, hsl, tw }
  }, [hex])

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-2.5">
      <span className="text-xs font-semibold text-slate-500 w-20">{label}</span>
      <span className="flex-1 font-mono text-sm text-slate-200">{value}</span>
      <CopyButton text={value} />
    </div>
  )

  return (
    <ToolShell title="Color Converter" description="Convert between HEX, RGB, HSL and Tailwind color names">
      <div className="flex flex-col sm:flex-row gap-4 mb-5 items-start">
        <input
          type="color"
          value={pickerHex}
          onChange={(e) => syncFromPicker(e.target.value)}
          className="w-16 h-16 rounded-xl border-2 border-white/10 cursor-pointer bg-transparent"
        />
        <div className="flex-1">
          <label className="text-xs text-slate-500 mb-1 block">HEX</label>
          <input
            value={hex}
            onChange={(e) => syncFromInput(e.target.value)}
            placeholder="#6366f1"
            className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        {info && (
          <div
            className="w-16 h-16 rounded-xl border border-white/10 shrink-0"
            style={{ background: hex }}
          />
        )}
      </div>

      {info ? (
        <div className="flex flex-col gap-2">
          <Row label="HEX" value={hex.toLowerCase()} />
          <Row label="RGB" value={`rgb(${info.rgb.r}, ${info.rgb.g}, ${info.rgb.b})`} />
          <Row label="HSL" value={`hsl(${info.hsl.h}, ${info.hsl.s}%, ${info.hsl.l}%)`} />
          <Row label="CSS var" value={`--color: ${hex.toLowerCase()};`} />
          {info.tw && <Row label="Tailwind" value={`bg-${info.tw}`} />}
        </div>
      ) : (
        <p className="text-sm text-red-400">Invalid hex color</p>
      )}
    </ToolShell>
  )
}
