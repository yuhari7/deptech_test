import fs from "fs";

export const readData = (filename) => {
  return JSON.parse(fs.readFileSync(filename, "utf8"));
};

export const writeData = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};
