const fs = require("fs");
const path = require("path");

function homeHandler(request, response) {
  const homePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(homePath, "utf-8", (error, data) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>Something Went Wrong!</h1>");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(data);
    }
  });
}

module.exports = homeHandler;
