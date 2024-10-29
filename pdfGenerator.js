const fs = require('fs');
const puppeteer = require('puppeteer');
const {html} = require("./html.js")

async function run(data , identifier) {

    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();
    if (!fs.existsSync(`./${identifier}`)) {
        fs.mkdirSync(`./${identifier}`)
    }

    let counter = 1
    for ( i of data){
        let htmlData = html(i)
       
    
        const pdfOptions = {
            path: `./${identifier}/${counter}.pdf`,
            format: 'A4',
            printBackground: true,
            width: '210mm',
            height: '297mm',
    
        };
    
        // let page = await browser.newPage();
        await page.setContent(htmlData);
        await page.pdf(pdfOptions);
        // await browser.close();

        counter = counter + 1
    }
    await browser.close();

    return 
}

module.exports = {run}