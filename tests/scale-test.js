const { chromium } = require("playwright");

async function login(page) {
  await page.goto("https://app.proposify.net/login");
  await page.locator("#pyLoginEmail").fill("fe.testing+1700946230641@proposify.com");
  await page.locator("#pyLoginPassword").fill("VBJ!qhj@tzk3edg4zum");
  await page.locator("#pyLoginFormSubmitButton").click();
}

async function createDocument(page) {
  await page.locator('button[data-testid="create-document-button"]').click();
  await page.locator("*[data-testid='create-document-button-v3']").click();
  await page.getByTestId("start-from-scratch-button").click();
}

async function logout(page) {
  await page.locator(".ant-dropdown-trigger").click();
  await page.locator("[href*='logout']").click();
}

async function login() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.setDefaultTimeout(180000);
  //log in
  login(page);
  //create document
  createDocument(page);
  //wait for canvas to be displayed
  //const canvasLocator = page.locator(".editor__page");
  //await page.waitForLoadState("networkidle");
  //canvasLocator.waitFor({ state: "visible" });

  //click logoout
  logout(page);
  // Go to the login page
  /*await page.goto('https://practicetestautomation.com/practice-test-login/');
  // Perform login actions
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');

  await page.waitForSelector('.post-title');
  await browser.close();*/
}

module.exports = { login };