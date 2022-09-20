const fs = require("fs");
const folder = "mf";
const axios = require("axios");

class Handler {
  static mfs = [];

  static run() {
    Handler.scan(Handler.write);
  }

  static scan(callback) {
    fs.readdir(folder, (err, files) => {
      files.forEach((file) =>
        Handler.mfs.push(
          JSON.parse(
            fs.readFileSync(folder + "/" + file + "/mf.conf.json", {
              encoding: "utf-8",
            })
          )
        )
      );
      console.log(Handler.mfs);
      callback(Handler.mfs);
    });
  }

  static write(associations) {
    Handler.serverStore();
  }

  static serverStore() {
    (async () => {
      const response = await axios.post(
        "http://localhost:4000/generateHash",
        Handler.mfs
      );
      let mfs = response.data;
      for (let i = 0; i < mfs.length; i++) {
        fs.writeFileSync(
          folder + "/" + mfs[i].id + "/hash.json",
          JSON.stringify({ hash: mfs[i].hash })
        );
      }

      fs.writeFileSync("./associations.json", JSON.stringify(mfs ));
    })();
  }
}

Handler.run();
