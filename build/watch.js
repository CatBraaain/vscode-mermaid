const fs = require("fs");
const path = require("path-extra");
const watch = require("node-watch");
const yaml2json = require("./lib/yaml2json.js");

const srcBase = path.join(__dirname, "../src");
const dstBase = path.join(__dirname, "../out");

watch(srcBase, { recursive: true, filter: /(\.yml|\.yaml)$/ }, (eventType, filePath) => {
  const srcPath = filePath;
  const relPath = path.relative(srcBase, srcPath);
  const dstPath = path.join(dstBase, `${path.removeExt(relPath)}.json`);

  switch (eventType) {
    case "update":
      yaml2json(srcPath, dstPath);
      break;
    case "remove":
      fs.unlinkSync(dstPath);
      break;
  }

  console.log(`${eventType} ${dstPath}`);
  console.log("waiting for change");
});

console.log("waiting for change");
