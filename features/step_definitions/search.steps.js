const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

When("user chooses a date", async function () {
  return await clickElement(this.page, "body nav a:nth-child(2)");
});
When("user chooses a date that has been choosen earlier", async function () {
    return await clickElement(this.page, "body nav a:nth-child(2)");
  });
When("user chooses the time for a movie", async function () {
  return await clickElement(this.page, "body main section:nth-child(2) div:nth-child(3) ul li a");
});
When("user chooses the time for a movie that has been choosen earlier", async function () {
    return await clickElement(this.page, "body main section:nth-child(2) div:nth-child(3) ul li a");
  });
When("user chooses the first seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(5) span:nth-child(9)"
  );
});
When("user chooses the second seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(2) span:nth-child(8)"
  );
});
When("user chooses a seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(1) span:nth-child(7)"
  );
});
When("user chooses a seat that has been choosen earlier", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__wrapper div:nth-child(1) span:nth-child(7)"
  );
});
When("user clicks on the booking button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});
When("user clicks on the button to retrieve a booking code", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});

Then("user receives the code and text {string}", async function (string) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("button for booking is inactive {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});
