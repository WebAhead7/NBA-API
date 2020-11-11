const http=require("http");
const port=3000;
const router=require("./router");
http.createServer(router).listen(port,()=>console.log(`Listening to server(port ${port})`));
