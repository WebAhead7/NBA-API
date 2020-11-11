const homeHandler=require("../handlers/homehandler");
const resourcesHandler=require("../handlers/resourceshandler");
const missingHandler=require("../handlers/missinghandler");
const getPlayerHandler=require("../handlers/getplayerhandler");
const getDataHandler=require("../handlers/getdatahandler");
function router(request,response){
    const url=request.url;
    if(url==="/")
    homeHandler(request,response);
    else if(url.startsWith("/public"))
    resourcesHandler(request,response);
    else if(url.startsWith("/getnames"))
    getPlayerHandler(request,response);
    else if(url.startsWith("/getdata"))
    getDataHandler(request,response);
    else{
        missingHandler(request,response);
    }
}

module.exports=router;