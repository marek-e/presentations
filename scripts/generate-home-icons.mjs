#!/usr/bin/env node
/**
 * Raster home-screen icons from apps/home/public/favicon.svg.
 * Requires ImageMagick (`magick` or `convert`). Run after changing the SVG.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'apps/home/public')
const SVG = path.join(PUBLIC, 'favicon.svg')
const BG = '#fdfaf6'
const LOGO_SCALE = 0.55

function magickBin() {
  for (const bin of ['magick', 'convert']) {
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore' })
      return bin
    } catch {
      // try next
    }
  }
  throw new Error('ImageMagick not found — install magick or convert')
}

function runMagick(bin, args) {
  if (bin === 'magick') {
    execFileSync('magick', args, { stdio: 'inherit' })
  } else {
    execFileSync('convert', args, { stdio: 'inherit' })
  }
}

function generateIcon(bin, size, outPath) {
  const logo = Math.round(size * LOGO_SCALE)
  const tmpLogo = path.join(PUBLIC, `.icon-logo-${size}.png`)
  runMagick(bin, ['-background', BG, SVG, '-resize', `${logo}x${logo}`, tmpLogo])
  runMagick(bin, [
    '-size',
    `${size}x${size}`,
    'xc:' + BG,
    tmpLogo,
    '-gravity',
    'center',
    '-composite',
    outPath,
  ])
  fs.unlinkSync(tmpLogo)
}

const bin = magickBin()
console.log(`Using ${bin}`)

for (const size of [180, 192, 512]) {
  const out =
    size === 180
      ? path.join(PUBLIC, 'apple-touch-icon.png')
      : path.join(PUBLIC, `icon-${size}.png`)
  generateIcon(bin, size, out)
  console.log(`✓ ${path.relative(ROOT, out)}`)
}
