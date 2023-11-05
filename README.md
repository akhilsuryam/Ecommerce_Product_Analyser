# Pull Request: Puppeteer E-commerce Crawler with Chrome Automation

## Description

This pull request aims to enhance the Puppeteer e-commerce crawler by introducing a new feature that allows users to automate Google Chrome for data crawling. The automation feature opens up new possibilities for web scraping, making it more efficient and flexible.

## Changes

1. **Chrome Automation Integration:** I have integrated the Chrome automation feature using Puppeteer. Users can now initialize and control a Chrome instance to browse and interact with web pages programmatically.

2. **Improved Crawler Configuration:** Added configuration options to enable or disable Chrome automation, set user agents, and control other parameters for web crawling.

3. **Documentation Updates:** Updated the documentation to include instructions on how to use the new Chrome automation feature, including examples and best practices.

## Motivation

The integration of Chrome automation in the Puppeteer e-commerce crawler provides significant benefits:

- **JavaScript Execution:** Allows running JavaScript code on web pages to interact with dynamic content, such as clicking buttons and handling AJAX requests.

- **Headless and Non-headless Modes:** Users can choose to run Chrome in headless (invisible) or non-headless mode for crawling, depending on their requirements.

- **Human-like Interaction:** Provides the capability to emulate human interactions with the web page, making it suitable for scraping websites that rely on user interactions for data loading.

## Usage Example

```javascript
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
  headless: false, // Set to true for headless mode or false for non-headless mode
});

const page = await browser.newPage();

// Navigate to the e-commerce website and perform actions
await page.goto('https://example.com');
await page.click('.button-class');
// Add more interactions here...

// Capture data from the page
const data = await page.evaluate(() => {
  // Extract data using JavaScript
  return {
    // Your data extraction logic here
  };
});

// Continue with data processing and saving

await browser.close();






# counterfeit_ecomscrapper
 //final project of counterfeit in flipkart and amazon

 
 
![product analyser 1](https://github.com/akhilsuryam/Ecommerce_Product_Analyser/assets/99366510/474ad83f-1936-4e4b-8759-4f1c755cbc66)
![p2](https://github.com/akhilsuryam/Ecommerce_Product_Analyser/assets/99366510/6bfb5a0f-f0bf-4846-8a10-2bf857a002cc)

