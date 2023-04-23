const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Amazon product page
  await page.goto('https://www.amazon.com/Razer-Huntsman-Optical-Gaming-Keyboard/dp/B09C12L49Z/ref=sr_1_1_sspa?keywords=gaming%2Bkeyboard&pd_rd_r=e71e0472-987a-40bd-8efb-63d5daa3976d&pd_rd_w=sfxgt&pd_rd_wg=Cue6t&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=K4R7GSM7DRR87BQ6314Z&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyVThBRTZIN0tYNUJUJmVuY3J5cHRlZElkPUEwODM2MjU2QktQUFQzVVEyUTdCJmVuY3J5cHRlZEFkSWQ9QTA3OTUwNjMyVkNYQUxWWEJSUkw1JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1');

  // Get the page title
  const pageTitle = await page.title();

  // Wait for the image to load
  await page.waitForSelector('#imgTagWrapperId img', { timeout: 60000 });

  // Get the URL of the image
  const imageUrl = await page.$eval('#imgTagWrapperId img', (img) => img.src);

  // Download the image
  const viewSource = await page.goto(imageUrl);
  const buffer = await viewSource.buffer();
  require('fs').writeFileSync('image.jpg', buffer);

  console.log(`Title: ${pageTitle}`);

  await browser.close();
})();
