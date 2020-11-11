const http=require("http");
const url=require("url");
const querystring=require("querystring");

//this function will resturn a response with the data about specific player
function getDataHandler(request,response){
fetchURL(request,response)
.then(response=>{
    if(response.statusCode===200){
        console.log("the response is ok");
        return response;
    }
    else{
        return response.statusCode;
    }
})
.then(data=>{
    console.log("we have the data: ",data);
    response.writeHead(200,{"content-type":"application/json"});
    response.end(JSON.stringify(data.finalData));
})
.catch(error=>{
    response.writeHead(404,{"content-type":"text/html"});
    response.end(JSON.stringify("<h1>Something Went Wrong!</h1>"));
})
}


//this function is responsible to fetch the data from 3rd party url
function fetchURL(request,response){
    const urlObject=url.parse(request.url);
    const query=urlObject.query;
    const queryObject=querystring.parse(query);
    const {name}=queryObject;
    const lastName=name.split(" ")[1];
    const firstName=name.split(" ")[0];
    console.log("FIRST NAME: ",firstName);
    console.log("LAST NAME: ",lastName);
    let finalURL=`http://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`;
    return new Promise((resolve,reject)=>{
        http.get(finalURL,response=>{
            const {statusCode}=response;
            if(statusCode!==200){
                reject("Something Went Wrong!");
            }
            let body="";
            response.on("data",chunk=>{
                body+=chunk;
            })
            response.on("end",()=>{
                try{
                    let finalData=JSON.parse(body);
                    resolve({finalData,statusCode});
                }catch(error){
                    reject("Something Went Wrong!");
                }
            });
            response.on("error",(error)=>{
                console.log("Something Went Wrong!");
            });
        })
    })
}

module.exports=getDataHandler;