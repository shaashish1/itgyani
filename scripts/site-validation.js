// Automated site validation for itgyani
// Usage: node site-validation.js


import puppeteer from 'puppeteer';


const BASE_URL = 'https://itgyani.com'; // Use live domain for validation
const ROUTES = [
  '/',
  '/about',
  '/academy',
  '/blog',
  '/case-studies',
  '/contact',
  '/services',
  '/industries',
  '/privacy-policy',
  '/terms-of-service',
  '/resources',
  '/careers',
  '/ai-studio',
  '/image-showcase',
];

const runValidation = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  let results = [];

  for (const route of ROUTES) {
    const url = BASE_URL + route;
    let routeResult = { route, url, status: 'OK', images: [], adsense: false };
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      // Check for broken images
      const brokenImages = await page.$$eval('img', imgs => imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src));
      routeResult.images = brokenImages;
      // Check for AdSense script
      routeResult.adsense = await page.evaluate(() => !!document.querySelector('script[src*="adsense"]') || !!document.querySelector('.adsbygoogle'));
    } catch (err) {
      routeResult.status = 'ERROR: ' + err.message;
    }
    results.push(routeResult);
  }

  await browser.close();

  // Output results
  console.log('--- Site Validation Report ---');
  results.forEach(r => {
    console.log(`Route: ${r.route} | Status: ${r.status}`);
    if (r.images.length > 0) {
      console.log('  Broken images:', r.images);
    }
    console.log('  AdSense present:', r.adsense);
  });
};

runValidation();
