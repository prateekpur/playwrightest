import { Page, expect, test } from "@playwright/test";
import { login } from "./helpers";

test("Tet sign-in", async ({ browser }) => {
  //const run = require('./scale-test');

  const context = await browser.newContext();
  const page = await context.newPage();

  // login(page);

  page.setDefaultTimeout(180000);
  //log in
  await page.goto("https://app.proposify.net/login");
  await page.locator("#pyLoginEmail").fill("fe.testing+1700946230641@proposify.com");
  await page.locator("#pyLoginPassword").fill("VBJ!qhj@tzk3edg4zum");
  await page.locator("#pyLoginFormSubmitButton").click();

  //create document
  await page.locator('button[data-testid="create-document-button"]').click();
  await page.locator("*[data-testid='create-document-button-v3']").click();
  await page.getByTestId("start-from-scratch-button").click();

  //wait for canvas to be displayed
  const canvasLocator = page.locator(".editor__page");
  await page.waitForLoadState("networkidle");
  canvasLocator.waitFor({ state: "visible" });

  //click logoout
  await page.locator(".ant-dropdown-trigger").click();
  await page.locator("[href*='logout']").click();

  /*page.setDefaultTimeout(120000);

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
  //console.log('Closed');*/
});

/*test("Table row re-order", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();


});*/
