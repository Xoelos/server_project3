//Reuireing puppeteer and FS
const puppeteer = require("puppeteer");
const fs = require("fs");
//These grab the path and have a variable that set the name, these will be changed
// const templatePath = "./../../../templates/";
// let template = `${templatePath}html.html`;

console.log("before function");
async function puppeteerRender(id) {
  console.log("Outside of try");
  try {
    console.log("start of try");
    //creates a new "browser" instance (Like opening up chrome)
    const browser = await puppeteer.launch();
    //creates a new tab to use for browsing
    const page = await browser.newPage();

    //Adds file to variable for puppeteer to read
    // const html = fs.readFileSync(template, "utf8");
    console.log("About to go to page!");

    //This will allow puppeteer to go to a webpage that is not in our repository
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!THIS NEEDS TO BE UPDATED TO WORK ON
    await page.goto("http://localhost:3006");

    //Loads the html file into our browser tab
    // await page.setContent(html);

    console.log("Page Loaded");
    //Emulates browser view (I think)
    await page.emulateMedia("screen");
    //Prints the PDF, options give it the name, place to create it as well as size and page range
    await page.pdf({
      path: `./../../pdf/${id}Resume.pdf`,
      format: "Letter",
      printBackground: true,
      pageRanges: "1"
    });
    console.log("done");
    //Closes the browser
    await browser.close();
    process.exit();
  } catch (err) {
    if (err) throw err;
  }
}

module.exports = puppeteerRender;
