const puppeteer = require("puppeteer");
const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Tests for booking tickets", () => {
    test("Should book available ticket", async () => {
      await clickElement(page, "body nav a:nth-child(2)");
      await clickElement(page, "body main section:nth-child(2) div:nth-child(3) ul li a");
      await clickElement(page, ".buying-scheme__wrapper div:nth-child(7) span:nth-child(2)");
      await clickElement(page, "button.acceptin-button");
      await page.waitForSelector("h2.ticket__check-title");
      await clickElement(page, "button.acceptin-button");
      const actual = await getText(page, "h2.ticket__check-title");
      expect(actual).toContain("Электронный билет");
    });
  
    test("Should book some available tickets", async () => {
      await clickElement(page, "body nav a:nth-child(2)");
      await clickElement(page, "body main section:nth-child(2) div:nth-child(3) ul li a");
      await clickElement(page, ".buying-scheme__wrapper div:nth-child(9) span:nth-child(2)");
      await clickElement(page, ".buying-scheme__wrapper div:nth-child(9) span:nth-child(6)");
      await clickElement(page, "button.acceptin-button");
      await page.waitForSelector("h2.ticket__check-title");
      await clickElement(page, "button.acceptin-button");
      const actual = await getText(page, "h2.ticket__check-title");
      expect(actual).toContain("Электронный билет");
    });
  
    test("Should try to book unavailable ticket, but unsuccessfully", async () => {
      await clickElement(page, "body nav a:nth-child(2)");
      await clickElement(page, "body main section:nth-child(2) div:nth-child(3) ul li a");
      await clickElement(page, ".buying-scheme__wrapper div:nth-child(9) span:nth-child(2)");
      expect(
        String(
          await page.$eval("button", (button) => {
            return button.disabled;
          })
        )
      ).toContain("true");
    });
  });