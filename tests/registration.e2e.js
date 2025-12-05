require("chromedriver"); // ensures chromedriver is available on PATH
const { Builder, By, until } = require("selenium-webdriver");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

async function runTest() {
  const driver = await new Builder().forBrowser("chrome").build();
  const unique = Date.now();
  const username = `user${unique}`;
  const email = `user${unique}@example.com`;
  const password = "Passw0rd!";

  try {
    await driver.get(FRONTEND_URL);

    await driver.wait(until.elementLocated(By.id("username")), 10000);

    await driver.findElement(By.id("username")).sendKeys(username);
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(password);

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/welcome"), 10000);

    await driver.wait(
      until.elementLocated(
        By.xpath(`//div[contains(@class,'info-item')]//span[contains(@class,'value') and text()='${username}']`)
      ),
      10000
    );

    const emailEl = await driver.findElement(
      By.xpath(`//div[contains(@class,'info-item')]//span[contains(@class,'value') and text()='${email}']`)
    );
    const hashedEl = await driver.findElement(
      By.xpath("//div[contains(@class,'info-item')]//span[contains(@class,'mono')]")
    );

    const hashedText = await hashedEl.getText();
    if (!hashedText || hashedText.length < 10) {
      throw new Error("Hashed password not displayed correctly");
    }

    console.log("E2E registration test passed");
  } catch (err) {
    console.error("E2E registration test failed:", err);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

runTest();


