const url = require("url");
const http = require("http");
const querystring = require("querystring");
const url_to_fetch = "http://nba-players.herokuapp.com/players-stats";
const allData=require("../data/alldata.json");
const playersNames=[];

//This function will fill the array just with players names
(function grapNames(){
  allData.forEach(player=>playersNames.push(player.name));
})();



/*This function will get a promise back from another function that fetch from
3rd party api, and it will return response to the front end*/
function getPlayerHandler(request,response){
  const urlObj=url.parse(request.url);
  const query=urlObj.query;
  const queryObject=querystring.parse(query);
  const {player}=queryObject;
  const dataToSend=getPlayerByName(player);
  response.writeHead(200,{"content-type":"application.json"});
  response.end(JSON.stringify(dataToSend));
}


//This function is responsible to filter the data according to the typed name/letters.
function getPlayerByName(name) {
  return playersNames.filter(player=>player.toLowerCase().startsWith(name.toLowerCase()));
}

module.exports = getPlayerHandler;
