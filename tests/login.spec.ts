import { Page, expect, test } from "@playwright/test";

async function openSiteAndLogin(page: Page) {
  await page.goto("https://app.proposify.net/login");
  await page.locator("#pyLoginEmail").fill("fe.testing+1700946230641@proposify.com");
  await page.locator("#pyLoginPassword").fill("VBJ!qhj@tzk3edg4zum");
  await page.locator("#pyLoginFormSubmitButton").click();
}

async function createDocument(page: Page) {
  //block to create a new document and add canvas to it
  await page.locator('button[data-testid="create-document-button"]').click();
  await page.locator("*[data-testid='create-document-button-v3']").click();
  await page.getByTestId("start-from-scratch-button").click();

  const canvasLocator = page.locator(".editor__page");
  await page.waitForTimeout(15000);
  await page.waitForLoadState('networkidle');
  canvasLocator.waitFor({ state: "visible" });

  const docVisible = await page.locator(".editor__page").isVisible();
  //click content icon if canvas is not visible
  if (!docVisible) {
    await page.locator("li[title='Content Library']").first().click();
    //wait for document to become visible
    canvasLocator.waitFor({ state: "visible" });
    //await page.pause();
    page.locator(".ant-drawer-body .MuiButtonBase-root").waitFor({ state: "visible" });
    await page.locator(".ant-drawer-body .MuiButtonBase-root").click();
    await page.waitForTimeout(4000);
  }
  

  await page.locator("#content_tab .py-react-icon").click();
  await page.getByRole("button", { name: "Table" }).click();
  await page.getByTestId("text-table-block-button").dragTo(await page.locator(".file-drop-background"));
  //await page.getByTestId("text-table-block-button").dragTo(await page.locator(".editor__page"));
}

test("Table row re-order", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  test.setTimeout(60000);

  await openSiteAndLogin(page);
  await createDocument(page);

  // dbl click table to make editable
  await page.locator('[data-testid="table-block"] .MuiBox-root').dblclick();
  // dbl click the cell
  await page.locator(".MuiDataGrid-cell > span").nth(4).dblclick();

  // click the cell to edit and enter random text
  //page.pause();
  //const inputCell = page.getByTestId("input-with-tooltips");
  const inputCell = page.getByTestId("body-text-input-field");
  await inputCell.click();
  const randomText = new Date().getTime().toString();
  await inputCell.fill(randomText);
  await page.waitForTimeout(3000);

  // read text in first row
  const firstRowText = await page.locator(".MuiDataGrid-cell > span").nth(2).textContent();

  // drag drop rows
  await page.locator(".MuiDataGrid-rowReorderCell").first().click();
  const draggable = page.locator(".MuiDataGrid-rowReorderCell--draggable").nth(1);
  const destination = page.locator(".MuiDataGrid-rowReorderCellContainer").nth(2);
  await draggable.dragTo(destination);

  // assert text to check if it is correct
  await page.waitForTimeout(3000);

  expect(await page.locator(".MuiDataGrid-cell > span").nth(4).textContent()).toBe(firstRowText);
  expect(await page.locator(".MuiDataGrid-cell > span").nth(2).textContent()).toBe(randomText);
});

