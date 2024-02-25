"use strict";

const fs = require("fs-extra");
const read = require("yaml-import").read;
const path = require("path");
const os = require("os");

const srcDir = path.join(__dirname, "../src/syntaxes");
const dstDir = path.join(__dirname, "../out/syntaxes");

fs.ensureDirSync(dstDir);

const fileNames = fs.readdirSync(srcDir);
const yamlFileNames = fileNames.filter(fileName =>
  [".yml", ".yaml"].includes(path.extname(fileName))
);
yamlFileNames.forEach(fileName => {
  const srcPath = path.join(srcDir, fileName);
  const dstPath = path.join(dstDir, `${path.parse(fileName).name}.json`);
  const content = read(srcPath, null);

  fs.writeFileSync(dstPath, JSON.stringify(content, null, 4) + os.EOL, {
    encoding: "utf8",
  });
});
