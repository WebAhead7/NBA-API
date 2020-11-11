const fs=require("fs");
const path=require("path");

const TYPES={
    ".html":"text/html",
    ".css":"text/css",
    ".js":"application/javascript",
    ".png":"image/png",
    ".jpg":"image/jpg"
}
function resourcesHandler(request,response){
    const url=request.url;
    const filePath=path.join(__dirname,"..",url);
    const contentType=TYPES[path.extname(filePath)];
fs.readFile(filePath,"utf-8",(error,data)=>{
    if(error){
        response.writeHead(404,{"content-type":"text/html"});
        response.end("<h1>Not Found</h1>");
    }
    else{
        response.writeHead(200,{"content-type":contentType});
        response.end(data);
    }
})
}

module.exports=resourcesHandler;