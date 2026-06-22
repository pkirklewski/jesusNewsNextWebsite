#!/usr/bin/env node
/**
 * Generate sitemaps and robots.txt from article JSON files.
 * Creates:
 *   - sitemap.xml (index linking to sub-sitemaps)
 *   - sitemap-pages.xml (static/evergreen pages — high priority)
 *   - sitemap-articles.xml (news articles — medium priority)
 *   - robots.txt
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://kryptopuls.pl'
const ARTICLES_DIR = join(__dirname, '..', 'content', 'articles')
const OUT_DIR = join(__dirname, '..', 'out')

function buildUrlEntry(u) {
  return `  <url>
    <loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
}

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(buildUrlEntry).join('\n')}
</urlset>
`
}

function generateSitemaps() {
  const today = new Date().toISOString().split('T')[0]

  // === Evergreen / static pages ===
  const pageUrls = [
    { loc: '/', priority: '1.0', changefreq: 'hourly', lastmod: today },
    { loc: '/zacznij-tutaj/', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: '/slownik/', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { loc: '/kursy/', priority: '0.9', changefreq: 'hourly', lastmod: today },
    { loc: '/jak-kupic-bitcoin/', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: '/ranking-gield/', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: '/portfele-krypto/', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { loc: '/newsletter/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/o-nas/', priority: '0.5', changefreq: 'monthly' },
    { loc: '/polityka-prywatnosci/', priority: '0.2', changefreq: 'yearly' },
    { loc: '/regulamin/', priority: '0.2', changefreq: 'yearly' },
  ]

  // Category pages
  const categories = new Set()

  // === Article pages ===
  const articleUrls = []

  if (existsSync(ARTICLES_DIR)) {
    const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'))

    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(ARTICLES_DIR, file), 'utf8'))
        const slug = data.slug || file.replace('.json', '')
        const date = data.date ? new Date(data.date).toISOString().split('T')[0] : undefined

        articleUrls.push({
          loc: `/artykul/${slug}/`,
          lastmod: date,
          priority: '0.7',
          changefreq: 'weekly',
        })

        if (data.categories) {
          data.categories.forEach(cat => categories.add(cat))
        }
      } catch {
        console.warn(`Warning: Could not parse ${file}`)
      }
    }
  }

  // Add category pages to evergreen
  for (const cat of categories) {
    pageUrls.push({ loc: `/kategoria/${cat}/`, priority: '0.6', changefreq: 'daily', lastmod: today })
  }

  // Write sub-sitemaps
  writeFileSync(join(OUT_DIR, 'sitemap-pages.xml'), buildSitemap(pageUrls), 'utf8')
  console.log(`Generated sitemap-pages.xml with ${pageUrls.length} URLs`)

  writeFileSync(join(OUT_DIR, 'sitemap-articles.xml'), buildSitemap(articleUrls), 'utf8')
  console.log(`Generated sitemap-articles.xml with ${articleUrls.length} URLs`)

  // Write sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-articles.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`
  writeFileSync(join(OUT_DIR, 'sitemap.xml'), sitemapIndex, 'utf8')
  console.log('Generated sitemap.xml (index)')

  // Robots.txt
  const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`
  writeFileSync(join(OUT_DIR, 'robots.txt'), robots, 'utf8')
  console.log('Generated robots.txt')
}

generateSitemaps()
