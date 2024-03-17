import http from "http";
import { generateRandom } from "./features.js";
console.log(generateRandom());
import fs from "fs";
import path from "path";

console.log(path.dirname("/home/random/index.js"));
const home = fs.readFileSync("./index.html", (err, data) => {
  console.log(data);
});

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log(req.method);
    res.end(home);
  } else if (req.url === "/about") {
    res.end(`<h1>Random Count is ${generateRandom()}</h1>`);
  } else if (req.url === "/contact") {
    res.end("<h1>Contact Page</h1>");
  } else {
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
