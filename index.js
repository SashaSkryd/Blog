const exp = require("constants");
const express = require("express");
const userRouter = require('./users/users.routes')

const PORT = process.env.PORT || 5500;
class Server {

    constructor(){
        this.server = null;
    }

    start(){
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
        this.listen();
    }

    initMiddlewares(){
        this.server.use(express.json())
    }

    initRoutes(){
        this.server.use('/blog', userRouter)
    }

    listen(){
        this.server.listen(PORT,()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    }

    
};

const server = new Server();

server.start()