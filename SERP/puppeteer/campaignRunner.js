
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const fs = require('fs');

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const keywordsRaw = process.argv[2];
const targetDomain = process.argv[3].toLowerCase();
const searchEngine = process.argv[4]?.toLowerCase() || 'google';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const keywords = keywordsRaw.split(' ').map(k => k.trim()).filter(Boolean);
const report = [];

const getSearchUrl = (keyword, page) => {
    const encoded = encodeURIComponent(keyword);
    switch (searchEngine) {
        case 'google': return `https://www.google.com/search?q=${encoded}&start=${page * 10}`;
        case 'bing': return `https://www.bing.com/search?q=${encoded}&first=${page * 10 + 1}`;
        case 'duckduckgo': return `https://duckduckgo.com/?q=${encoded}&s=${page * 30}`;
        case 'yahoo': return `https://search.yahoo.com/search?p=${encoded}&b=${page * 10 + 1}`;
        default: return `https://www.google.com/search?q=${encoded}&start=${page * 10}`;
    }
};

const getSelector = () => {
    switch (searchEngine) {
        case 'google': return 'div#search a[href^="http"]:not([href*="google"])';
        case 'bing': return 'li.b_algo h2 a[href^="http"]:not([href*="bing"])';
        case 'duckduckgo': return 'a[data-testid="result-title-a"]';
        case 'yahoo': return 'div.algo h3.title a[href^="http"]';
        default: return 'a[href^="http"]';
    }
};

const extractDomain = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    } catch {
        return null;
    }
};

const cleanBingRedirect = (url) => {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('bing.com') && parsed.searchParams.has('r')) {
            return parsed.searchParams.get('r');
        }
        return url;
    } catch {
        return url;
    }
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const randomDelay = () => delay(Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000);

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= document.body.scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: chromePath,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const [page] = await browser.pages();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    for (const keyword of keywords) {
      for (let i = 1; i <= 2; i++) {
        let found = false;
        let foundPage = null;
        let foundPosition = null;

        for (let i = 0; i < 5 && !found; i++) {
            try {
                const url = getSearchUrl(keyword, i);
                console.log(`🔍 Searching '${keyword}' on ${searchEngine} (page ${i + 1})`);
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

                await autoScroll(page);
                await delay(3000);

                const selector = getSelector();
                await page.waitForSelector(selector, { timeout: 10000 });

                const links = await page.evaluate((sel, se) => {
                    const isValidResult = (href) => {
                        try {
                            const url = new URL(href);
                            return href.startsWith("http") && !url.hostname.includes(se) && !href.includes('/maps');
                        } catch (e) {
                            return false;
                        }
                    };
                    return [...document.querySelectorAll(sel)]
                        .map(el => el.href)
                        .filter(href => isValidResult(href));
                }, selector, searchEngine);

                const parsed = links.map((href, idx) => {
                    const cleanedUrl = searchEngine === 'bing' ? cleanBingRedirect(href) : href;
                    return {
                        href: cleanedUrl,
                        host: extractDomain(cleanedUrl),
                        domIndex: idx
                    };
                }).filter(link => link.host);

                const targetIndex = parsed.findIndex(link => link.host === targetDomain);

                if (targetIndex !== -1) {
                    found = true;
                    foundPage = i + 1;
                    foundPosition = targetIndex + 1;

                    const previous = targetIndex > 0 ? parsed[targetIndex - 1] : null;
                    const target = parsed[targetIndex];

                    let refreshedElements = await page.$$(selector);

                    if (previous && previous.host !== target.host) {
                        console.log(`👉 Clicking previous domain: ${previous.href}`);
                        const prevElement = refreshedElements[previous.domIndex];
                        if (prevElement) {
                            await prevElement.evaluate(el => el.removeAttribute('target'));
                            await Promise.all([
                                page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
                                prevElement.click()
                            ]);
                            await delay(4000); // Wait on previous domain
                            await page.goBack({ waitUntil: 'domcontentloaded' });
                            await delay(3000);
                        }
                    }

                    refreshedElements = await page.$$(selector);
                    const targetElement = refreshedElements[target.domIndex];
                    if (targetElement) {
                        console.log(`🎯 Clicking target domain: ${target.href}`);
                        await targetElement.evaluate(el => el.removeAttribute('target'));
                        await Promise.all([
                            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
                            targetElement.click()
                        ]);
                        await delay(10000);
                        console.log(`✅ '${targetDomain}' opened for '${keyword}'`);
                    }

                    break;
                }

            } catch (err) {
                console.log(`⚠️ Error: ${err.message}`);
                continue;
            }
        }

        report.push({
            keyword,
            status: found ? 'Found' : 'Not Found',
            page: found ? `Page ${foundPage}, Position ${foundPosition}` : '-'
        });

        console.log('⏱ Waiting randomly before next keyword...');
        await randomDelay();
    }

    const csvLines = ['Keyword,Found/Not Found,Page and Position'];
    report.forEach(row => {
        csvLines.push(`${row.keyword},"${row.status}","${row.page}"`);
    });
    fs.writeFileSync('search_report.csv', csvLines.join('\n'), 'utf-8');
    console.log('📝 Report saved as search_report.csv');

    await browser.close();
}})();


























