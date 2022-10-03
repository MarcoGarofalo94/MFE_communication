var fs = require("fs");
const fse = require("fs-extra");
var path = require("path");

console.log(process.argv);
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk("./mf", (e, res) => {
  let subTrees = [];
  console.log();
  res.forEach((folder) => {
    let matches = folder.match(/mf[0-9]+/);
    subTrees.push({ ...matches });
  });
  const mfs = [];
  subTrees.forEach((subT) => {
    if (!mfs.find((mf) => mf == "./tmp/mf/" + subT["0"] + "/src")) {
      mfs.push("./tmp/mf/" + subT["0"] + "/src");
    }
  });
  console.log(mfs);
  console.log("subTrees", subTrees);
  if (fs.existsSync("./tmp")) {
    fs.rmSync("./tmp", { recursive: true, force: true });
  }
  subTrees.forEach((r) => {
    let regex = /(?:\.([^.]+))?$/;
    let f = r.input + "";
    let ext = regex.exec(f)[1];
    let file = fs.readFileSync(f, { encoding: "utf-8" });
    if (ext == "tsx") {
      console.log(f);
      let matches = file.match(/id=(?:"|{|')(.*?)(?:"|}|')/g);
      if (matches) {
        for (i in matches) {
          if (matches[i]) {
            let content = matches[i].split('"')[1];

            fse.outputFile(
              "./tmp/" + f.substring(f.indexOf("mf"), f.length),
              file.replace(
                matches[i],
                matches[i].replace(content, Date.now() + "_" + content)
              )
            );
          }
        }
      } else {
        fse.outputFile("./tmp/" + f.substring(f.indexOf("mf"), f.length), file);
      }
    } else {
      fse.outputFile("./tmp/" + f.substring(f.indexOf("mf"), f.length), file);
    }
  });

  fs.writeFileSync("./entries.json", JSON.stringify(mfs));
  console.log(
    JSON.parse(fs.readFileSync("./entries.json", { encoding: "utf-8" }))
  );
});
