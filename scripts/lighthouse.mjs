// Audit Lighthouse (profil mobile par défaut, ou --desktop) des pages principales.
// Usage : npm run build && npm run lighthouse [-- --desktop | --cpu=2]
// Note : le score SEO est volontairement pénalisé sur la bêta (noindex).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from 'playwright';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { demarrerPreview } from './preview.mjs';

const desktop = process.argv.includes('--desktop');
// --cpu=2 : calibre le ralentissement CPU simulé sur une machine lente (voir
// https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md). Défaut Lighthouse : 4.
const cpu = Number(process.argv.find((a) => a.startsWith('--cpu='))?.split('=')[1] ?? 4);
const pages = ['/', '/v1/', '/v2/', '/v3/', '/v4/', '/v5/'];
const { url, arreter } = await demarrerPreview();
const chrome = await chromeLauncher.launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless=new'] });
let ok = true;
try {
  console.log(`Profil : ${desktop ? 'desktop' : 'mobile'}\n`);
  console.log('page'.padEnd(8), 'perf', 'a11y', 'bonnes', 'seo*');
  for (const p of pages) {
    const res = await lighthouse(url + p, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      ...(desktop ? {} : { throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: cpu } }),
    }, desktop ? desktopConfig : undefined);
    const c = res.lhr.categories;
    if (p === '/') console.log(`(indice de performance de la machine : ${Math.round(res.lhr.environment.benchmarkIndex)})`);
    const s = (k) => Math.round((c[k]?.score ?? 0) * 100);
    const notes = [s('performance'), s('accessibility'), s('best-practices'), s('seo')];
    if (notes.slice(0, 3).some((n) => n < 90)) ok = false;
    console.log(p.padEnd(8), ...notes.map((n) => String(n).padStart(4)));
    if (s('performance') < 90) {
      const a = res.lhr.audits;
      console.log('   LCP', a['largest-contentful-paint'].displayValue, '| CLS', a['cumulative-layout-shift'].displayValue, '| TBT', a['total-blocking-time'].displayValue);
    }
  }
  console.log('\n* SEO pénalisé volontairement par le noindex de la bêta.');
} finally {
  await chrome.kill();
  arreter();
}
process.exit(ok ? 0 : 1);
