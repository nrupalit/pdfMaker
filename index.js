const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
    let html = fs.readFileSync('./test.html', 'utf8');
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const pdfOptions = {
        path: './index.pdf',
        format: 'A4',
        printBackground: true,
        // Optionally set dimensions if needed
        width: '210mm',
        height: '297mm',

    };

    let page = await browser.newPage();
    await page.setContent(html);
    await page.pdf(pdfOptions);
    await browser.close();
}

run();