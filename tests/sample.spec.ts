import { Page, expect, test } from "@playwright/test";

test("Tet sign-in", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  page.setDefaultTimeout(120000);

  // Go to the login page
  //console.log('Begin');
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  // Perform login actions
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
 //console.log('Before submit');
  await page.click('#submit');
  //console.log('After submit');

  // Wait for login to complete
  await page.waitForSelector('.post-title');
  //console.log('Second page');

  // Perform the additional action
  //await page.click('#some-action-button');

  // Close the browser
  await browser.close();
  //console.log('Closed');
});

