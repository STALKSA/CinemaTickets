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

Given("user is on {string} page", {timeout:60000}, async function (string) {
  return await this.page.goto(`https://netology.ru${string}`, {setTimeout: 60000});
});

When("user search by {string}", async function (string) {
  return await putText(this.page, "input", string);
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getText(this.page, "a[data-name]");
  const expected = await string;
  expect(actual).contains(expected);
});
