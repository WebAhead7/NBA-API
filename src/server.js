const http=require("http");
const port=process.env.PORT || 3000 ;
const router=require("./router");
http.createServer(router).listen(port,()=>console.log(`Listening to server(port ${port})`));
