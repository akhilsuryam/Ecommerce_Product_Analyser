const express = require('express');
const puppeteer = require('puppeteer');
const public = require('./public');

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Render the homepage with a form to submit a URL
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission and render the result page
app.get('/result', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.render('error', { message: 'Please enter a valid URL' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the Amazon product page
    await page.goto(url);

    // Get the page title
    const pageTitle = await page.title();

    // Wait for the image to load
    await page.waitForSelector('#imgTagWrapperId img', { timeout: 60000 });

    // Get the URL of the image
    const imageUrl = await page.$eval('#imgTagWrapperId img', (img) => img.src);

    // Download the image
    const viewSource = await page.goto(imageUrl);
    const buffer = await viewSource.buffer();

    res.render('result', {
      title: pageTitle,
      image: `data:image/jpeg;base64,${buffer.toString('base64')}`
    });

    await browser.close();
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Failed to scrape the page' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
