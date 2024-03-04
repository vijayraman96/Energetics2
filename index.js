const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://macpaw.com/'; // Replace with the URL of the webpage you want to extract

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract HTML
    const htmlContent = await page.content();
    fs.writeFileSync('output.html', htmlContent); // Save HTML content to a file

    // Extract CSS
    const cssContent = await page.evaluate(() => {
        const styleElements = Array.from(document.querySelectorAll('style'));
        return styleElements.map(style => style.textContent).join('\n');
    });
    fs.writeFileSync('output.css', cssContent); // Save CSS content to a file

    console.log('HTML content saved to output.html');
    console.log('CSS content saved to output.css');

    await browser.close();
})();