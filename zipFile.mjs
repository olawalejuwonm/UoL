//This script will zip a file passed to it as argument when run, then it will copy the zip file to clipboard

import clipboardy from "clipboardy";
// const fs = require("fs");
// const path = require("path");
// const zip = require("zip-all");
import fs from "fs";
import path from "path";
import zip from "adm-zip";
import child_process from "child_process";

import util from "util";

const zipFileArg = process.argv[2];
const zipDirectory = path.basename(zipFileArg);
const zipFilePath = path.dirname(zipFileArg);
console.log(`Zipping ${zipFileArg}`, `to ${zipDirectory}`, `in ${zipFilePath}`);
function pbcopy(data) {
  // const proc = child_process.spawn("pbcopy");
  const proc = child_process.spawn("clip");
  proc.stdin.write(data);
  proc.stdin.end();

  // proc.stdin.write(data);
  // proc.stdin.end();
}
const processFileZip = async () => {
  try {
    console.log("Zipping...", `${zipFilePath}/${zipDirectory}`);
    const zipFile = new zip();
    await new Promise((resolve, reject) => {
      zipFile.addLocalFolderAsync(
        `${zipFilePath}/${zipDirectory}`,
        (succ, err) => {
          if (err && succ === false) {
            console.log("Error zipping", err);
            reject(err);
          } else {
            console.log("Zipped");
            resolve();
          }
        }
      );
    });
    //iterate zi
    const zipFileBuffer = await zipFile.toBuffer();
    console.log(zipFileBuffer);
    // const base64ZipFile = zipFileBuffer.toString("base64");
    // clipboardy.writeSync(base64ZipFile);
    //    pbcopy(zipFileBuffer);
    //save the file
    fs.writeFileSync(`${zipFilePath}/${zipDirectory}.zip`, zipFileBuffer);
    console.log(`Zip file ${zipDirectory} copied to clipboard`);
  } catch (err) {
    console.log("Error", err);
  }
};
processFileZip();
