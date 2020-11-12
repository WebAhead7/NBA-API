const http = require("http");
const url = require("url");
const querystring = require("querystring");
const missingHandler = require("./missinghandler");
const fetchHandler = require("./fetchhandler");

//this function will resturn a response with the data about specific player
function getDataHandler(request, response) {
  const urlObject = url.parse(request.url);
  const query = urlObject.query;
  const queryObject = querystring.parse(query);
  const { name } = queryObject;
  const lastName = name.split(" ")[1];
  const firstName = name.split(" ")[0];
  let finalURL = `http://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`;
  fetchHandler(finalURL)
    .then((res) => {
      if (res.statusCode !== 200) throw new Error("Something Went Wrong!");
      return res;
    })
    .then((data) => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(data.finalData));
    })
    .catch((error) => {
      missingHandler(request, response);
    });
}

module.exports = getDataHandler;
