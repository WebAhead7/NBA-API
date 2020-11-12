const fs = require("fs");
const path = require("path");
const missingHandler = require("./missinghandler");
function homeHandler(request, response) {
  const homePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(homePath, "utf-8", (error, data) => {
    if (error) {
      missingHandler(request, response);
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(data);
    }
  });
}

module.exports = homeHandler;
