const searchField = document.querySelector("#search-field");
let grappedNames;
let grappedDataByName;
const dataList = document.querySelector("#players");
const form = document.querySelector("form");
const dataContainer = document.querySelector("#data-container");
//const HOME_URL = "http://localhost:3000/";
const HOME_URL = "https://nba-monsters.herokuapp.com/";


//keyup event listener
searchField.addEventListener("keyup", (e) => {
  if(!e.ctrlKey){
  fetch(`${HOME_URL}getnames?player=${e.target.value}`)
    .then((response) => {
      if (response.ok) return response.json();
      return response.status;
    })
    .then((data) => {
      updateDataList(data); //this function will update the datalist
      grappedNames = data;
      
    })
    .catch((error) => {
      console.error(error);
      alert("Something Went Wrong!");
    });
  }
});

addEvent(); //calling this function to add event listener (submit) to the form.

//this function will update the datalist.
function updateDataList(data) {
  dataList.innerHTML = "";
  data.forEach((player) => {
    let option = document.createElement("option");
    option.innerHTML = player;
    dataList.appendChild(option);
  });
}

//This function will add the submit event listener to the form
function addEvent() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(grappedNames.length===0){
    alert("Name Not Found!");
    searchField.value="";
    }
    else{
    dataContainer.innerHTML = "";
    fetch(`${HOME_URL}getdata?name=${grappedNames[0]}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.statusCode;
        }
      })
      .then((data) => {
        grappedDataByName = data;
        render(); //this function is responsible to show data in the DOM
      })
      .catch((error) => {
        console.error(error);
        alert("Something Went Wrong!");
      });
    searchField.value = "";
}});

}

//This function is responsible to show data in the DOM
function render() {
  let playerDiv = document.createElement("div");
  playerDiv.id = "player-card";
  playerDiv.innerHTML = `<h3>Player Name: <span>${grappedDataByName.name}</span></h3>
    <h3>Team: <span>${grappedDataByName.team_name}</span></h3>
    <h3>Minutes Per Game: <span>${grappedDataByName.minutes_per_game}</span></h3>
    <h3>Points Per Game: <span>${grappedDataByName.points_per_game}</span></h3>
    <h3>Assists Per Game: <span>${grappedDataByName.assists_per_game}</span></h3>
    <h3>Steals Per Game: <span>${grappedDataByName.steals_per_game}</span></h3>
    <h3>Block Per Game: <span>${grappedDataByName.blocks_per_game}</span></h3>
    <h3>Three Points Percentage Per Game: <span>${grappedDataByName.three_point_percentage}</span></h3>`;
  dataContainer.appendChild(playerDiv);
}
