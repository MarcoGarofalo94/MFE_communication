const fs = require("fs");
const { NodeType, parse, HTMLElement } = require("node-html-parser");

const confFile = JSON.parse(
  fs.readFileSync("./conf.json", { encoding: "utf-8" })
);

console.log("[CONF FILE]", confFile);
const templateFile = fs.readFileSync("./templates/index.html", {
  encoding: "utf-8",
});

const root = parse(templateFile);
if (confFile.regions) {
  const body = root.querySelector("body");

  for (let i = 0; i < confFile.regions.length; i++) {
    let region = confFile.regions[i];
    let newElement = new HTMLElement("div", { id: region.id });
    for (let j = 0; j < region.mfs.length; j++) {
      let mf = new HTMLElement("div", { id: region.mfs[j] });
      newElement.appendChild(mf);
    }
    body.appendChild(newElement);
  }
}

fs.writeFileSync('./composedTemplate.html',root.innerHTML)
