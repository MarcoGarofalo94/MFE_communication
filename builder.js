const dotenv = require("dotenv");
const { spawn } = require("child_process");
const chokidar = require("chokidar");
const webdriver = require("selenium-webdriver");

(async () => {
  let build;
  const os = process.platform;
  console.log(`[Current OS] ${os}`);
  dotenv.config();
  const url = `${process.env.BASEURL}:${process.env.PORT}/apps/${process.env.APP}`;
  const dir = process.env.DIR;
  console.log(`[Base Url] ${url}`);
  switch (os) {
    case "win32":
      build = spawn("yarn.cmd", ["build"]);
      break;
    case "darwin":
      build = spawn("yarn", ["build"]);
      break;
    case "linux":
      build = spawn("yarn", ["build"]);
      break;
    default:
      console.log("Operating Systems not supported");
      break;
  }

  build.stdout.on("data", (data) => console.log(data.toString()));
  build.stderr.on("data", (data) => console.log(data.toString()));
  const driver = new webdriver.Builder()
    .forBrowser(process.env.BROWSER)
    .build();
  (await driver).get(url);

  chokidar.watch(dir).on("change", async (event, path) => {
    console.log(`File under ${dir} changed...`);
    console.log(`Refreshing Browser`);
    await driver.get(url);
  });
})();
