let fs = require("fs");
let puppeteer = require('puppeteer');

let cfile = process.argv[2];

(async function () {
    try{
        let contents = await fs.promises.readFile(cfile);
        let obj = JSON.parse(contents);
        let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 20,
        args: ['--start-maximized', '--disable-notifications', '--incognito']
    });
    let url = obj.url;
    let user = obj.user;
    let pwd = obj.pwd;
    let acc = obj.acc;
    let numPosts = obj.numPosts;
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(url, {waitUntil: 'networkidle2'});
    await page.waitForSelector('input[type=text]');
    await page.type('input[type=text]', user,{delay:100})
    await page.type('input[type=password]', pwd),{delay:100};
    await Promise.all([page.click('button[type=submit]'),page.waitForNavigation({waitUntil: 'networkidle2'
})]);
    await page.waitForSelector('input[type=text]',{visible:true});
    await page.type('input[type=text]',acc,{delay:100});
    await page.waitForSelector(".yCE8d");
    let pageclick = await page.$$(".yCE8d");
    await pageclick[0].click();
    await page.waitForSelector("._2z6nI");
    let elements = await page.$$(".Nnq7C.weEfm");
    await elements[0].click();
    await page.waitFor(3000);
    let idx=0;
    do{
        await page.waitForSelector('.fr66n .wpO6b ');
        let like = await page.$('.fr66n .wpO6b ');
        await like.click({delay:100});
        await page.waitFor(1500);
        let nextpage = await page.$('._65Bje.coreSpriteRightPaginationArrow');
        await nextpage.click({delay:100});
        idx++;
        await page.waitFor(1500);
    }
    while(idx < numPosts)
    await browser.close();
}
catch (err){
    console.log(error);
}
})()


