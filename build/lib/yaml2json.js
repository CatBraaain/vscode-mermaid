const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const yamlImport = require("yaml-import");

module.exports = function yaml2json(srcPath, dstPath) {
  const dstDir = path.dirname(dstPath);
  fs.ensureDirSync(dstDir);

  const content = yamlImport.read(srcPath, null);
  fs.writeFileSync(dstPath, JSON.stringify(content, null, 4) + os.EOL, {
    encoding: "utf8",
  });
};
