const express = require('express');
const puppeteer = require('puppeteer');
const { summarize } = require('../reviewmainA')
const ReviewScraper = require('../ReviewScrapperA');
const { summarize2 } = require('../reviewmainA2')

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use('public', express.static('./public'));

async function getSummarizedReviews(url) {
  const summarized = await summarize(url);
  console.log('summarized',summarized)
  return summarized[0].summary_text;
}

async function getSummarizedReviews2(url) {
  const summarized = await summarize2(url);
  console.log('summarized',summarized)
  return summarized[0].summary_text;
}


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

    // Get the summarized reviews
    const summarizedReviews = await getSummarizedReviews(url);
    const summarizedReviews2 = await getSummarizedReviews2(url);
    console.log("both crawled")
    

const words =["awesome", "magnificent", "excellent", "outstanding", "splendid", "terrific", "fantastic", "stellar", "superb", "wonderful", "phenomenal", "amazing", "incredible", "spectacular", "remarkable", "extraordinary", "impressive", "marvelous", "fabulous", "dazzling", "brilliant", "striking", "gorgeous", "beautiful", "charming", "alluring", "delightful", "enchanting", "captivating", "mesmerizing", "glamorous", "fascinating", "elegant", "graceful", "majestic", "stunning", "breathtaking", "awe-inspiring", "jaw-dropping", "mind-blowing", "mind-boggling", "mind-bending", "mind-altering", "mind-expanding", "mind-opening", "inspiring", "uplifting", "motivating", "empowering", "transformative", "life-changing", "meaningful", "fulfilling", "satisfying", "rewarding", "enjoyable", "fun", "entertaining", "amusing", "lively", "vibrant", "energetic", "dynamic", "exciting", "thrilling", "exhilarating", "adventurous", "daring", "bold", "courageous", "heroic", "powerful", "strong", "resilient", "determined", "persistent", "tenacious", "hardworking", "dedicated", "committed", "reliable", "trustworthy", "honest", "sincere", "kind", "compassionate", "caring", "thoughtful", "considerate", "generous", "gracious", "humble", "authentic", "genuine", "real", "original", "unique", "creative", "abhorrent", "abominable", "aggravating", "aggressive", "agonizing", "aimless", "anarchic", "angry", "annoying", "anxious", "appalling", "arbitrary", "argumentative", "arrogant", "ashamed", "atrocious", "awful", "bad", "banal", "barbaric", "barren", "belligerent", "bemoaning", "beneath", "bizarre", "bland", "bleak", "blunt", "boastful", "boring", "brash", "brutal", "bullying", "callous", "catastrophic", "chaotic", "cheap", "childish", "clumsy", "coarse", "cold", "common", "complicated", "conceited", "condescending", "confused", "confrontational", "contradictory", "controlling", "convoluted", "cowardly", "crass", "crazy", "cruel", "crushing", "cryptic", "cynical", "dangerous", "dark", "deadly", "deceitful", "defeatist", "defensive", "defiant", "delusional", "demanding", "dense", "deplorable", "depressing", "derogatory", "desolate", "despairing", , "destructive", "devious", "difficult", "dirty", "disagreeable", "disappointing", "disastrous", "disconcerting", "discontented", "discordant", "discouraging", "disgusting", "disheartening", "dishonest", "disliked", "disliked", "disloyal", "dismal", "disobedient", "disorganized", "displeasing", "disrespectful", "disruptive", "dissatisfied", "distasteful", "distraught", "distressing", "disturbed", "divisive", "dreadful", "dreary", "drunk", "dull", "dumped", "dysfunctional"];

const minWords = 7;
const maxWords = 12;

function selectRandomWords(wordsArray, minWords, maxWords) {
  const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const selectedWords = [];
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    selectedWords.push(wordsArray[randomIndex]);
  }
  return selectedWords;
}

function getRandomPercentage() {
  const p1 = Math.floor(Math.random() * 100);
  const p2 = Math.floor(Math.random() * (100 - p1));
  const p3 = 100 - p1 - p2;
  return [p1, p2, p3];
}





    res.render('result', {
      title: pageTitle,
      image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
      reviews: summarizedReviews + summarizedReviews2,
      adjectivewords:selectRandomWords(words,minWords,maxWords),
      percentage:getRandomPercentage()


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
