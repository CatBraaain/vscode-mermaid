const path = require("path-extra");
const readdirRecursive = require("fs-readdir-recursive");
const yaml2json = require("./lib/yaml2json.js");

const srcBase = path.join(__dirname, "../src");
const dstBase = path.join(__dirname, "../out");

const relPaths = readdirRecursive(srcBase);
relPaths
  .filter(relPath => [".yml", ".yaml"].includes(path.extname(relPath)))
  .forEach(relPath => {
    const srcPath = path.join(srcBase, relPath);
    const dstPath = path.join(dstBase, `${path.removeExt(relPath)}.json`);
    yaml2json(srcPath, dstPath);
  });
