const http = require("http");

//This function gets url, and its responsible to fetch data from 3rd party api
function fetchHandler(url_to_fetch) {
  return new Promise((resolve, reject) => {
    http.get(url_to_fetch, (response) => {
      const { statusCode } = response;
      if (statusCode !== 200) reject("Something Went Wrong!");
      let body = "";
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        try {
          let finalData = JSON.parse(body);
          resolve({ finalData, statusCode });
        } catch (error) {
          reject("Something Went Wrong!");
        }
      });
      response.on("error", (error) => {
        reject("Something Went Wrong!");
      });
    });
  });
}

module.exports = fetchHandler;
