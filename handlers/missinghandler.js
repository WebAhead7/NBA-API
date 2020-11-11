

function missingHandler(request,response){
response.writeHead(404,"text/html");
response.end("<h1>Not Found</h1>");
}

module.exports=missingHandler;