import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    // Launch headless Chromium browser
    const browser = await puppeteer.launch({
      headless: true, // Run headlessly
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these flags for running in serverless environments
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to a URL
    await page.goto('https://example.com');

    // Capture a screenshot
    const screenshot = await page.screenshot();

    // Close the browser
    await browser.close();

    // Send the screenshot as the response
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(screenshot);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to run Chromium' });
  }
}
