import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Go to Fitting Room (bypassed auth)
    await page.goto('http://localhost:5173/fitting-room');
    await page.waitForTimeout(2000); // let animations settle
    await page.screenshot({ path: 'fitting_room_sketchbook.png' });

    // Go to Wardrobe
    await page.goto('http://localhost:5173/wardrobe');
    await page.waitForTimeout(1000);

    // Click '添置新衣物' (Add clothes)
    await page.click('button:has-text("添置新衣物")');
    await page.waitForTimeout(1000);

    // Click '电商一键导入'
    await page.click('button:has-text("电商一键导入")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'wardrobe_import.png' });

    await browser.close();
})();
